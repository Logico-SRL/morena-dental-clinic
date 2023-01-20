import Busboy from 'busboy';
import { NextApiRequest, NextApiResponse } from 'next';
import { inspect } from 'util';

type FileObjType = {
  filename: string,
  encoding: string,
  mimeType: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.info(`API method: ${req.method}, query: ${JSON.stringify(req.query)}`)

  const val = await new Promise((resolve) => {
    const busboy = Busboy({ headers: req.headers });
    // console.log(JSON.stringify(req.headers, null, 2));
    busboy.on('file', (fieldname: string, file: any, { encoding, filename, mimeType }: FileObjType) => {
      console.log(
        'File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimeType,
      );
      file.on('data', function (data: any) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        const u8 = new Uint8Array(data);
        const b64 = Buffer.from(u8).toString('base64');
        resolve(b64)
      });
      file.on('end', function () {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function (fieldname, val) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function () {
      console.log('Done parsing form!');

      resolve(1);
    });
    req.pipe(busboy);
  });

  res.status(200).end(val)
}

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};