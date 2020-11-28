import * as xml2js from 'xml2js'

const createObjectFromXml = (xml) => {
  const parser = new xml2js.Parser({
    explicitArray: false
  });

  return new Promise((resolve, reject) => {
    parser.parseString(xml, function (err, result) {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const convertObjectToXml = (obj) => {
  const builder = new xml2js.Builder();
  return builder.buildObject(obj);
}

export default {
  createObjectFromXml,
  convertObjectToXml,
}