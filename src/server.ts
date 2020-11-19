'use strict';

// Dependancies
import * as path from 'path';
import * as express from 'express';
import * as _ from 'lodash';
import * as cors from 'cors';
import bodyParser from 'body-parser';
const xml2js = require('xml2js');

// Web Services SOAP
import swp_retourneTarif from './services/ws/swp_retourneTarif';
import swp_retourneNbPiecesContenu from './services/ws/swp_retourneNbPiecesContenu';

// Config
require('dotenv').config();
const app = express();

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
}

// Bypass problem certificat
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Frontend: declare static assets
app.use('/', express.static(__dirname + '/public'));

// Frontend: render app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Api: submit form
app.post('/api/devis/habitation/soumettre', async (req, res) => {
    const formData = req.body;
    const formDataStringify = JSON.stringify(formData);
    let response = Buffer.from(formDataStringify).toString('base64');
    return res.send(response);
});

// Api: save estimate and get .pdf
app.post('/api/devis/habitation/enregistrer', async (req, res) => {
    res.send('ok');
});

// Api: get fields value: Nombre de pièces principales, Capital mobilier à garantir
// swp_retourneNbPiecesContenu
app.get('/api/devis/habitation/champs-dynamiques', async (req, res) => {
    const { data: result } = await swp_retourneNbPiecesContenu(process.env.SOAP_KEY_ID);
    let response;

    xml2js.parseString(result, function(err, result) {
        if (err) throw err;
        let body = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'];

        if (body.length === 0 || !body.length) {
            res.status(500).send('Il semble y avoir un problème pour récupérer les champs dynamiques...');
        }

        response = body[0]['ns1:apc_retourneNbPiecesContenuResult'][0]['tabMesPieces'];
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

app.listen(process.env.APP_PORT, () => {
    console.log(`Devis habitation : http://localhost:${process.env.APP_PORT}`);
});

