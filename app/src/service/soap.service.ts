interface SoapHeaderInterface {
  'User-Agent': string,
  'Accept': string,
  'Accept-Encoding': string,
  'Accept-Charset': string,
  'Connection': string,
  'Host': string,
  'Content-Length': string,
  'Content-Type': string,
  'SOAPAction': string,
}

/**
 * @returns SoapHeaderInterface
 */
export function generateSoapHeader(soapServiceName) {
  return {
    'User-Agent' : 'node-soap/0.34.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'none',
    'Accept-Charset': 'utf-8',
    'Connection': 'close',
    'Host': 'swebapcn.i2fc.fr:63500',
    'Content-Length': '4819',
    'Content-Type': 'text/xml; charset=utf-8',
    'SOAPAction': `urn:WebserviceCourtage/${soapServiceName}`,
  }
}
