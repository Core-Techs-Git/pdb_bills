import {resolve} from 'path';
import * as moment from 'moment';
import {parseString} from 'xml2js';
import * as requester from '@core-techs-git/pdb_requester';
import {RequestOptionsDTO} from '@core-techs-git/pdb_requester/dist/models';
import {RequesterInterface} from '@core-techs-git/pdb_requester/dist/services';

import {ArchiveStartegyInterface} from '.';
import {DocumentDTO, SearchOptionsDTO} from '../models';
import {injectable} from 'inversify';

/**
 * Implement docapost service as an archive strategy
 */
@injectable()
export class Docapost implements ArchiveStartegyInterface {
  /**
   * Request send to docaposte.
   * @typedef RequestOptionsDTO
   * @access protected
   */
  protected requestOptions: RequestOptionsDTO = {
    headers: {
      'Content-type': 'text/xml',
    },
    body: '',
    method: 'POST',
  };

  /**
   * Request send to docaposte.
   * @typedef RequestOptionsDTO
   * @access protected
   */
  protected requester: RequesterInterface = requester('docapost');

  /**
   * Request send to docaposte.
   * @access protected
   */
  protected config;

  constructor() {
    try {
      const configPath = resolve(process.cwd(), 'config.js');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const config = require(configPath);
      this.config = config.bills;
      this.requestOptions = {
        host: config.bills.docapost.host,
        path: config.bills.docapost.path,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  /**
   * Authentication to docaposte service.
   * @returns {Promise<string>} A token in case of successful authentication.
   */
  protected async authenticate(): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      this.requester.request(
        Object.assign(this.requestOptions, {
          body: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
          <SOAP-ENV:Envelope
          xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope"
          xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
          xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/"
          xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
          xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/"
          xmlns:tns="http://archiv-e-service/soap/"
          xmlns:xsd="http://www.w3.org/2001/XMLSchema"
          xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/"
          xmlns:http="http://schemas.xmlsoap.org/wsdl/http/"
          xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" >
            <SOAP-ENV:Body>
              <mns1:serviceAUTH xmlns:mns1="http://archiv-e-service/soap/">
                <user>${this.config.docapost.user}</user>
                <password>${this.config.docapost.password}</password>
              </mns1:serviceAUTH>
            </SOAP-ENV:Body>
          </SOAP-ENV:Envelope>`,
        }),
        (err, data) => {
          if (err) reject(err);
          try {
            const findToken: string = data.split('token')[1].substring(1);
            const token: string = findToken.substring(0, findToken.length - 2);
            resolve(token);
          } catch (err) {
            reject(new Error('Authentication failed.'));
          }
        },
      );
    });
  }

  public async searchOne(docID: number): Promise<DocumentDTO> {
    return new Promise<DocumentDTO>(
      async (resolve, reject): Promise<void> => {
        try {
          const token = await this.authenticate();
          this.requester.request(
            Object.assign(this.requestOptions, {
              body: `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soa="http://archiv-e-service/soap/"><x:Header/>
              <x:Body><soa:serviceDOC>
              <soa:token>${token}</soa:token>
              <soa:docset><soa:doc>
              <soa:id>${docID}</soa:id>
              <soa:duplicata>true</soa:duplicata></soa:doc></soa:docset></soa:serviceDOC>
              </x:Body></x:Envelope>`,
            }),
            (err, data) => {
              if (err) reject(err);
              parseString(data, (err, result) => {
                if (err) return reject(err);

                let message = '';
                try {
                  message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].message[0];
                } catch (e) {
                  // do nothing
                }

                if (message === 'token invalid, authentication failed.') {
                  const err = new Error(message);
                  return reject(err);
                }
                if (err) return reject(err);
                const doc: DocumentDTO = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].docset[0].doc[0].data[0];
                resolve(doc);
              });
            },
          );
        } catch (err) {
          return reject(new Error('Authentication to docaposte failed.'));
        }
      },
    );
  }

  public async searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>> {
    return new Promise<Array<DocumentDTO>>(
      async (resolve, reject): Promise<void> => {
        try {
          const token = await this.authenticate();
          this.requester.request(
            Object.assign(this.requestOptions, {
              body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://archiv-e-service/soap/">
              <soapenv:Header/>
                <soapenv:Body>
                  <soap:serviceSEARCH>
                    <token>${token}</token>
                    <start>${query.start || 1}</start>
                    <sort_cr>DateDocument</sort_cr>
                    <sort_dir>desc</sort_dir>
                    <metadata>
                      ${query.numDocument ? `<NumDocument>${query.numDocument}</NumDocument>` : ''}
                      ${query.company_id ? `<CodeClientCourt>${query.company_id}</CodeClientCourt>` : ''}
                      ${query.code_depot ? `<CodeDepot>${query.code_depot}</CodeDepot>` : ''}
                      ${query.priceFrom ? `<MontantRecherche_minimum>${query.priceFrom}</MontantRecherche_minimum>` : ''}
                      ${query.priceTo ? `<MontantRecherche_maximum>${query.priceTo}</MontantRecherche_maximum>` : ''}
                      ${query.dateFrom ? `<DateDebutRecherche_from>${query.dateFrom}</DateDebutRecherche_from>` : ''}
                      ${query.dateTo ? `<DateFinRecherche_to>${query.dateTo}</DateFinRecherche_to>` : ''}
                      ${query.typeLivraison === 'ENLEVEMENT' ? '<TypeLivraison>ENLEVEMENT</TypeLivraison>' : ''}
                    </metadata>
                  </soap:serviceSEARCH>
                </soapenv:Body>
              </soapenv:Envelope>`,
            }),
            (err, data) => {
              if (err) return reject(err);

              parseString(data, (err: Error, result) => {
                if (err) return reject(err);

                // docapost don't send error response codes
                const validationMessage = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].message[0];
                if (validationMessage === 'token invalid, authentication failed.') {
                  return reject(new Error(validationMessage));
                }

                let documents: Array<DocumentDTO> = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].dataset[0].data;

                documents.map(document => {
                  document.formatedDateDocument = moment(document.DateDocument[0], 'YYYY-MM-DD').format('DD/MM/YY');
                  document.priceHt = document.MontantHT[0];
                });

                // if livraison, then remove all ENLEVEMENT (pickup) documents
                // Idealy we would do this in the soap request but 'livraison' documents are not identified.
                if (query.typeLivraison === 'livraison') {
                  documents = documents.filter((doc: DocumentDTO) => doc.TypeLivraison[0] !== 'ENLEVEMENT');
                }
                if (!documents) return resolve([]);
                resolve(documents);
              });
            },
          );
        } catch (err) {
          return reject(new Error('/factures/json. serviceSearch error.\nUne erreur est survenue, veuillez réessayer.'));
        }
      },
    );
  }
}
