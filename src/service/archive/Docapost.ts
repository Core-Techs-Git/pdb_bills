/**
 * @module service
 * @packageDocumentation
 */

import moment from 'moment';
import {parseString} from 'xml2js';
import {injectable, inject, named} from 'inversify';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {Archive} from '@/service/archive/Archive';
import {ARCHIVE, TYPES, VALIDATORS, VALID_DATE_FORMAT} from '@/const';
import {ValidatorInterface} from '@/service/validator';
import {ConfigurationInterface} from '@/service/Configuration';
import {DocumentDTO, SearchOptionsDTO, ServiceConfiguration} from '@/model';
import {AuthenticationError, ValidationError, BillError} from '@/error';

/**
 * Implement docapost service as an archive strategy
 */
@injectable()
export class Docapost extends Archive {
  protected config: ServiceConfiguration;
  protected validator: ValidatorInterface;
  protected requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>;

  constructor(
    @inject(TYPES.ConfigurationInterface) @named(ARCHIVE.DOCAPOSTE) config: ConfigurationInterface,
    @inject(TYPES.Requester) @named(ARCHIVE.DOCAPOSTE) requester: RequestAPI<Request, CoreOptions, RequiredUriUrl>,
    @inject(TYPES.ValidatorInterface) @named(VALIDATORS.SEARCH_OPTIONS_DTO) validator: ValidatorInterface,
  ) {
    super();

    this.config = config.getServiceConfiguration();
    this.requester = requester;
    this.validator = validator;
  }
  /**
   * Authentication to docaposte service.
   * @returns {Promise<string>} A token in case of successful authentication.
   */
  protected async authenticate(): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      this.requester.post(
        {
          uri: '',
          headers: {
            'Content-type': 'text/xml',
          },
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
                  <user>${this.config.user}</user>
                  <password>${this.config.password}</password>
                </mns1:serviceAUTH>
              </SOAP-ENV:Body>
            </SOAP-ENV:Envelope>`,
        },
        (err, response, data) => {
          if (err) reject(new AuthenticationError(err));
          try {
            const findToken: string = data.split('token')[1].substring(1);
            const token: string = findToken.substring(0, findToken.length - 2);
            resolve(token);
          } catch (error) {
            reject(new AuthenticationError(error));
          }
        },
      );
    });
  }

  public async searchOne(docID: number): Promise<string> {
    return new Promise<string>((resolve, reject): void => {
      if (isNaN(+docID)) return reject(new ValidationError(`Invalid docID — ${docID}`));

      this.authenticate()
        .then((token) => {
          this.requester.post(
            {
              uri: '',
              headers: {
                'Content-type': 'text/xml',
              },
              body: `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soa="http://archiv-e-service/soap/"><x:Header/>
                  <x:Body><soa:serviceDOC>
                  <soa:token>${token}</soa:token>
                  <soa:docset><soa:doc>
                  <soa:id>${docID}</soa:id>
                  <soa:duplicata>true</soa:duplicata></soa:doc></soa:docset></soa:serviceDOC>
                  </x:Body></x:Envelope>`,
            },
            (err, response, data) => {
              if (err) return reject(new BillError(err));

              parseString(data, (err, result) => {
                if (err) return reject(new BillError(err));

                try {
                  const message: string = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].message[0];
                  if (message === 'token invalid, authentication failed.') return reject(new AuthenticationError(message));

                  const doc: string = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].docset[0].doc[0].data[0];
                  resolve(doc);
                } catch (error) {
                  return reject(new BillError(error));
                }
              });
            },
          );
        })
        .catch((AuthError) => {
          reject(AuthError);
        });
    });
  }

  public async searchMany(query: SearchOptionsDTO): Promise<Array<DocumentDTO>> {
    return new Promise<Array<DocumentDTO>>((resolve, reject): void => {
      try {
        this.validator.validate(query);
      } catch (validationError) {
        return reject(validationError);
      }

      this.authenticate()
        .then(async (token) => {
          let start = 1;
          const bills: Array<DocumentDTO> = [];
          let res: {hits: number; bills: Array<DocumentDTO>};

          try {
            do {
              res = await this.getBillsList(query, token, start);
              bills.push(...res.bills);
              start += 100;
            } while (res.hits === 100);

            resolve(bills);
          } catch (error) {
            reject(error instanceof BillError ? error : new BillError(error));
          }
        })
        .catch((AuthError) => {
          reject(AuthError);
        });
    });
  }

  private async getBillsList(query: SearchOptionsDTO, token: string, start: number): Promise<{hits: number; bills: Array<DocumentDTO>}> {
    return new Promise<{hits: number; bills: Array<DocumentDTO>}>((resolve, reject): void => {
      this.requester.post(
        {
          uri: '',
          headers: {
            'Content-type': 'text/xml',
          },
          body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://archiv-e-service/soap/">
          <soapenv:Header/>
            <soapenv:Body>
              <soap:serviceSEARCH>
                <token>${token}</token>
                <start>${start}</start>
                <sort_cr>DateDocument</sort_cr>
                <sort_dir>desc</sort_dir>
                <metadata>
                  ${query.numDocument ? `<NumDocument>${query.numDocument}</NumDocument>` : ''}
                  ${query.company_id ? `<CodeClientCourt>${query.company_id}</CodeClientCourt>` : ''}
                  ${query.code_depot ? `<CodeDepot>${query.code_depot}</CodeDepot>` : ''}
                  ${query.priceFrom ? `<MontantRecherche_minimum>${query.priceFrom}</MontantRecherche_minimum>` : ''}
                  ${query.priceTo ? `<MontantRecherche_maximum>${query.priceTo}</MontantRecherche_maximum>` : ''}
                  ${
                    query.dateFrom
                      ? `<DateDebutRecherche_from>${moment(query.dateFrom, VALID_DATE_FORMAT, true).format('YYYY-MM-DD')}</DateDebutRecherche_from>`
                      : ''
                  }
                  ${
                    query.dateTo
                      ? `<DateFinRecherche_to>${moment(query.dateTo, VALID_DATE_FORMAT, true).format('YYYY-MM-DD')}</DateFinRecherche_to>`
                      : ''
                  }
                  ${query.typeLivraison === 'ENLEVEMENT' ? '<TypeLivraison>ENLEVEMENT</TypeLivraison>' : ''}
                </metadata>
              </soap:serviceSEARCH>
            </soapenv:Body>
          </soapenv:Envelope>`,
        },
        (err, response, data) => {
          if (err) return reject(new BillError(err));
          parseString(data, (err, result) => {
            if (err) return reject(new BillError(err));

            try {
              const message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].message[0];
              if (message === 'token invalid, authentication failed.') return reject(new AuthenticationError(message));

              const hits: number = +result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].hits_returned;
              let documents: Array<DocumentDTO> = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].dataset[0].data;
              if (!documents) return resolve({hits: 0, bills: []});

              documents.map((document) => {
                document.formatedDateDocument = moment(document.DateDocument[0], 'YYYY-MM-DD').format('DD/MM/YY');
                document.priceHt = document.MontantHT[0];
              });

              /**
               * * Filter according to provided date cause docapost doesn't work correctly.
               * * If livraison, then remove all ENLEVEMENT (pickup) documents.
               * TODO: Idealy we would do this in the soap request but 'livraison' documents are not identified.
               */
              documents = documents.filter((doc) => {
                const required = [];

                if (!query.typeLivraison) required.push(true);
                if ((query.typeLivraison || '').toUpperCase() === 'LIVRAISON') required.push(!doc.TypeLivraison.includes('ENLEVEMENT'));
                if ((query.typeLivraison || '').toUpperCase() === 'ENLEVEMENT') required.push(doc.TypeLivraison.includes('ENLEVEMENT'));
                if (query.dateFrom)
                  required.push(
                    moment(doc.formatedDateDocument, 'DD/MM/YY').isAfter(moment(query.dateFrom, VALID_DATE_FORMAT, true).subtract(1, 'day')),
                  );
                if (query.dateTo)
                  required.push(moment(doc.formatedDateDocument, 'DD/MM/YY').isBefore(moment(query.dateTo, VALID_DATE_FORMAT, true).add(1, 'day')));

                return required.reduce((accumulator, currentValue) => accumulator && currentValue);
              });

              resolve({hits, bills: documents});
            } catch (error) {
              reject(new BillError(error));
            }
          });
        },
      );
    });
  }
}
