import axios from 'axios';
import { generateSoapHeader } from './soap.service'

export async function swp_retourneNbPiecesContenu() {
  const url = process.env.SOAP_URL;
  const headers = generateSoapHeader('apc_retourneNbPiecesContenu');
  const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
          <sKeyId>${process.env.SOAP_KEY_ID}</sKeyId>
        </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    if (error) throw error;
  }
}

export async function swp_retourneTarif(params) {
  const url = process.env.SOAP_URL;
  const headers = generateSoapHeader('swp_retourneTarif');
  const body = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
        <soapenv:Header/>
        <soapenv:Body>
            <sKeyId>${params.keyId}</sKeyId>
            <sTypeDevis>${params.typeDevis}</sTypeDevis>
            <sDevisXMLbase64>${params.devisXMLbase64}</sDevisXMLbase64>
            <nEnregistrerDevis>${params.enregistrerDevis}</nEnregistrerDevis>
            <sCategorieAEnregistrerBase64 xsi:nil="true">${params.formulaNameSelectedBase64}</sCategorieAEnregistrerBase64>
        </soapenv:Body>
    </soapenv:Envelope>`;

    try {
      const response = await axios.post(url, body, { headers });
      return response;
    } catch (error) {
      if (error) throw error;
    }
}

export default {
  swp_retourneNbPiecesContenu,
  swp_retourneTarif,
}