'use strict';

// Dependancies
import * as path from 'path';
import * as express from 'express';
import * as _ from 'lodash';
import * as cors from 'cors';

import routes from './routes/v1';

// Config
require('dotenv').config();
const app = express();

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV !== 'production') {
    // Bypass cross origin call
    app.use(cors())
    // Bypass problem certificat
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Frontend: declare static assets
app.use('/', express.static(__dirname + '/public'));

// Frontend: render app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// v1 api routes
app.use('/api/v1', routes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Devis habitation : http://localhost:3000`);
});

