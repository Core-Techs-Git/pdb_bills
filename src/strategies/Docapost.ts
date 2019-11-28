import {resolve} from 'path';
import * as moment from 'moment';
import {parseString} from 'xml2js';
import * as requester from '@core-techs-git/pdb_requester';
import {RequestAPI, Request, UriOptions, CoreOptions, RequiredUriUrl} from 'request';

import {ArchiveStartegyInterface} from '.';
import {DocumentDTO, SearchOptionsDTO} from '../models';
import {injectable} from 'inversify';
import {BillError, AuthenticationError} from '../services/error';

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
  protected requestOptions: UriOptions & CoreOptions = {
    uri: '',
    headers: {
      'Content-type': 'text/xml',
    },
  };

  /**
   * Request send to docaposte.
   * @typedef RequestAPI<Request, CoreOptions, RequiredUriUrl>
   * @access protected
   */
  protected requester: RequestAPI<Request, CoreOptions, RequiredUriUrl> = requester('docapost');

  /**
   * Request send to docaposte.
   * @access protected
   */
  protected config;

  constructor() {
    try {
      const configPath = resolve(process.cwd(), 'config.js');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.config = require(configPath).bills;
      this.requestOptions = Object.assign(this.requestOptions, {
        uri: this.config.docapost.uri,
      });
    } catch (err) {
      throw new BillError(err);
    }
  }
  /**
   * Authentication to docaposte service.
   * @returns {Promise<string>} A token in case of successful authentication.
   */
  protected async authenticate(): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      this.requestOptions.body = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
      </SOAP-ENV:Envelope>`;
      this.requester.post(this.requestOptions, (err, response, data) => {
        if (err) reject(err);
        try {
          const findToken: string = data.split('token')[1].substring(1);
          const token: string = findToken.substring(0, findToken.length - 2);
          resolve(token);
        } catch (err) {
          reject(new AuthenticationError(`Authentication failed\nerror object – ${err}`));
        }
      });
    });
  }

  public async searchOne(docID: number): Promise<string> {
    return new Promise<string>(
      async (resolve, reject): Promise<void> => {
        try {
          const token = await this.authenticate();
          this.requester.post(
            Object.assign(this.requestOptions, {
              body: `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soa="http://archiv-e-service/soap/"><x:Header/>
              <x:Body><soa:serviceDOC>
              <soa:token>${token}</soa:token>
              <soa:docset><soa:doc>
              <soa:id>${docID}</soa:id>
              <soa:duplicata>true</soa:duplicata></soa:doc></soa:docset></soa:serviceDOC>
              </x:Body></x:Envelope>`,
            }),
            (err, response, data) => {
              if (err) return reject(new BillError(err));

              parseString(data, (err, result) => {
                if (err) return reject(new BillError(err));

                let message = '';
                try {
                  message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].message[0];
                } catch (e) {
                  return new BillError(e);
                }

                if (message === 'token invalid, authentication failed.') return reject(new AuthenticationError(message));

                try {
                  const doc: string = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].docset[0].doc[0].data[0];
                  resolve(doc);
                } catch (error) {
                  reject(new BillError(error));
                }
              });
            },
          );
        } catch (err) {
          return reject(err);
        }
      },
    );
  }

  public async searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>> {
    return new Promise<Array<DocumentDTO>>(
      async (resolve, reject): Promise<void> => {
        try {
          const token = await this.authenticate();
          this.requester.post(
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
            (err, response, data) => {
              if (err) return reject(new BillError(err));

              parseString(data, (err: Error, result) => {
                if (err) return reject(new BillError(err));

                try {
                  // docapost don't send error response codes
                  const validationMessage = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].message[0];
                  if (validationMessage === 'token invalid, authentication failed.') return reject(new AuthenticationError(validationMessage));

                  let documents: Array<DocumentDTO> = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].dataset[0].data;
                  if (!documents) return resolve([]);

                  documents.map(document => {
                    document.formatedDateDocument = moment(document.DateDocument[0], 'YYYY-MM-DD').format('DD/MM/YY');
                    document.priceHt = document.MontantHT[0];
                  });

                  // Filter according to provided date cause docapost doesn't work correctly.
                  documents = documents.filter(doc => {
                    if (!query.dateFrom && !query.dateTo) return true;
                    if (query.dateFrom && query.dateTo)
                      return moment(doc.formatedDateDocument, 'DD/MM/YY').isBetween(
                        moment(query.dateFrom, 'DD/MM/YY'),
                        moment(query.dateTo, 'DD/MM/YY'),
                      );
                    if (query.dateFrom) return moment(doc.formatedDateDocument, 'DD/MM/YY').isAfter(moment(query.dateFrom, 'DD/MM/YY'));
                    if (query.dateTo) return moment(doc.formatedDateDocument, 'DD/MM/YY').isBefore(moment(query.dateTo, 'DD/MM/YY'));
                  });
                  documents = documents.filter(doc => {
                    if (query.typeLivraison && query.typeLivraison.toUpperCase() === 'LIVRAISON') return !doc.TypeLivraison.includes('ENLEVEMENT');
                  });
                  resolve(documents);
                } catch (err) {
                  return reject(new BillError(err));
                }
              });
            },
          );
        } catch (err) {
          return reject(err);
        }
      },
    );
  }
}
