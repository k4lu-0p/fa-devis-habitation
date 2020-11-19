import axios from 'axios';

/**
 * Méthode SOAP swp_retourneNbPiecesContenu
 *
 * @export
 * @param {string} keyId
 */
export default async function swp_retourneNbPiecesContenu(keyId: string) {
  const headers = {
    'User-Agent' : 'node-soap/0.34.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'none',
    'Accept-Charset': 'utf-8',
    'Connection': 'close',
    'Host': 'swebapcn.i2fc.fr:63500',
    'Content-Length': '4819',
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': 'urn:WebserviceCourtage/apc_retourneNbPiecesContenu',
  }

const xml = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Header/>
      <soapenv:Body>
        <sKeyId>${keyId}</sKeyId>
      </soapenv:Body>
  </soapenv:Envelope>`;

  try {
    const response = await axios.post(process.env.SOAP_URL, xml, { headers });
    return response;
  } catch (error) {
    if (error) throw error;
  }

}