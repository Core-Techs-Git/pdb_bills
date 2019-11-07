import * as express from 'express';
import {json} from 'body-parser';
import {serviceDoc, serviceSearch} from '../src';

const app = express();
app.use(json());

app.post('/serviceDoc', (req: express.Request, res: express.Response) => {
  serviceDoc(req.body.docID, (error, data) => {
    if (error) res.json({data, error});
    else {
      res.type('pdf');
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=facture' + req.body.docID + '.pdf',
      });
      res.end(Buffer.from(data, 'base64'));
    }
  });
});

app.post('/serviceSearch', (req: express.Request, res: express.Response) => {
  serviceSearch(req.body, (error, data) => {
    res.json({data, error});
  });
});

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: 'Ressource not found for this request',
    request: {
      url: req.originalUrl,
      body: req.body,
      params: req.params,
      headers: req.headers,
    },
  });
});

app.listen(process.env.PORT || 3004, () => {
  console.log(`PDB_BILLS server is listening on port ${process.env.PORT || 3004}`);
});
