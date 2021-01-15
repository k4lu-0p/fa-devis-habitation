import catchAsync from '../utils/catchAsync';
import MedialogService from '../service/medialog.service';
import AdapterService from '../service/adapter.service';
import RecaptchaService from '../service/recaptcha.service';
import XmlService from '../service/xml.service';

//- TEMP
import * as xml2js from 'xml2js';

const swp_retourneNbPiecesContenu = catchAsync(async (req, res) => {
    const {
        data: result
    } = await MedialogService.swp_retourneNbPiecesContenu();
    let response;

    xml2js.parseString(result, function (err, result) {
        if (err) throw err;
        let body = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'];

        if (body.length === 0 || !body.length) {
            return res.status(500).send('Il semble y avoir un problème pour récupérer les champs dynamiques...');
        }

        response = body[0]['ns1:swp_retourneNbPiecesContenuResult'][0]['tabMesPieces'];
        response = response.map(r => {
            let items = r['sListeContenuAutoriseSepareeParDesPVirgule'][0].split(';');
            return {
                value: Number(r['sCodeARenvoyer'][0]),
                text: r['sLibelle'][0],
                movableCapitalToBeGuaranteed: items,
            }
        })
    });
    res.status(200).json(response);
});

const swp_retourneTarif = catchAsync(async (req, res) => {

    if (!req.body.bypassCaptcha) {
        const isGoogleCaptchaVerified = await RecaptchaService.verify(req.body.tokenCaptcha)        
        if (!isGoogleCaptchaVerified) {
            return res.status(400).send('Invalid captcha');
        }        
    }

    const formData = AdapterService.reorganizeFormData(req.body.formData);
    const formDataXML = XmlService.convertObjectToXml(formData);
    const formDataBase64 = Buffer.from(formDataXML).toString('base64');

    const body = {
        keyId: process.env.SOAP_KEY_ID,
        typeDevis: 'MRH',
        devisXMLbase64: formDataBase64,
        enregistrerDevis: 0,
        formulaNameSelectedBase64: null,
    }

    const { data: soapXMLResponse } = await MedialogService.swp_retourneTarif(body);
    const soapResponse = await XmlService.createObjectFromXml(soapXMLResponse);
    const soapBody = soapResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body'];

    // debug
    // res.set('Content-Type', 'application/xml');
    // return res.status(200).send(soapXMLResponse).end();
    
    const nTypeClientDetecte = soapBody['ns1:swp_retourneTarifResult']['nTypeClientDetecte'] ?
        soapBody['ns1:swp_retourneTarifResult']['nTypeClientDetecte'] :
        null;

    const sCoordonneesCourtier = soapBody['ns1:swp_retourneTarifResult']['sCoordonneesCourtier'] ?
        soapBody['ns1:swp_retourneTarifResult']['sCoordonneesCourtier'] :
        null;

    const tableauTarification = {
        ...soapBody['ns1:swp_retourneTarifResult']['tableauTarification'],
        nTypeClientDetecte: Number(nTypeClientDetecte),
        sCoordonneesCourtier,
        codeInfo: soapBody['ns1:swp_retourneTarifResult']['codeInfo'],
        sLibErreur: soapBody['ns1:swp_retourneTarifResult']['sLiberreur']
    }

    res
        .status(200)
        .json(tableauTarification)
        .end();
})

const swp_retourneTarifPdf = catchAsync(async (req, res) => {
    const formulaNameSelected = req.body.formulaNameSelected;
    const formulaNameSelectedBase64 = Buffer.from(formulaNameSelected).toString('base64');

    const formData = AdapterService.reorganizeFormData(req.body.formData);
    const formDataXML = XmlService.convertObjectToXml(formData);
    const formDataBase64 = Buffer.from(formDataXML).toString('base64');

    const body = {
        keyId: process.env.SOAP_KEY_ID,
        typeDevis: 'MRH',
        devisXMLbase64: formDataBase64,
        enregistrerDevis: 1,
        formulaNameSelectedBase64,
    }

    const { data: soapXMLResponse } = await MedialogService.swp_retourneTarif(body);
    const soapResponse = await XmlService.createObjectFromXml(soapXMLResponse);
    const soapBody = soapResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body'];

    const devisPDF = soapBody['ns1:swp_retourneTarifResult']['devisPDF'] ?
        soapBody['ns1:swp_retourneTarifResult']['devisPDF'] :
        null;

    res
        .status(200)
        .json({ devisPDF })
        .end();

})

const swp_retourneListebulleAide = catchAsync(async (req, res) => {
    const { data: soapXMLResponse } = await MedialogService.swp_retourneListebulleAide();
    const soapResponse = await XmlService.createObjectFromXml(soapXMLResponse);
    const soapBody = soapResponse['SOAP-ENV:Envelope']['SOAP-ENV:Body'];
    const tooltips = soapBody['ns1:swp_retourneListeBulleAideResult']['bulle'] ?
        soapBody['ns1:swp_retourneListeBulleAideResult']['bulle'] :
        null;

    res.status(200).json(tooltips);
})

export default {
    swp_retourneNbPiecesContenu,
    swp_retourneTarif,
    swp_retourneTarifPdf,
    swp_retourneListebulleAide,
}