"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const moment = require("moment");
const xml2js_1 = require("xml2js");
const requester = require("@core-techs-git/pdb_requester");
const inversify_1 = require("inversify");
const error_1 = require("../services/error");
/**
 * Implement docapost service as an archive strategy
 */
let Docapost = class Docapost {
    constructor() {
        /**
         * Request send to docaposte.
         * @typedef RequestOptionsDTO
         * @access protected
         */
        this.requestOptions = {
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
        this.requester = requester('docapost');
        try {
            const configPath = path_1.resolve(process.cwd(), 'config.js');
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            this.config = require(configPath).bills;
            this.requestOptions = Object.assign(this.requestOptions, {
                uri: this.config.docapost.uri,
            });
        }
        catch (err) {
            throw new error_1.BillError(err);
        }
    }
    /**
     * Authentication to docaposte service.
     * @returns {Promise<string>} A token in case of successful authentication.
     */
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
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
                    if (err)
                        reject(err);
                    try {
                        const findToken = data.split('token')[1].substring(1);
                        const token = findToken.substring(0, findToken.length - 2);
                        resolve(token);
                    }
                    catch (err) {
                        reject(new error_1.AuthenticationError(`Authentication failed\nerror object – ${err}`));
                    }
                });
            });
        });
    }
    searchOne(docID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = yield this.authenticate();
                    this.requester.post(Object.assign(this.requestOptions, {
                        body: `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soa="http://archiv-e-service/soap/"><x:Header/>
              <x:Body><soa:serviceDOC>
              <soa:token>${token}</soa:token>
              <soa:docset><soa:doc>
              <soa:id>${docID}</soa:id>
              <soa:duplicata>true</soa:duplicata></soa:doc></soa:docset></soa:serviceDOC>
              </x:Body></x:Envelope>`,
                    }), (err, response, data) => {
                        if (err)
                            return reject(new error_1.BillError(err));
                        xml2js_1.parseString(data, (err, result) => {
                            if (err)
                                return reject(new error_1.BillError(err));
                            let message = '';
                            try {
                                message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].message[0];
                            }
                            catch (e) {
                                return new error_1.BillError(e);
                            }
                            if (message === 'token invalid, authentication failed.')
                                return reject(new error_1.AuthenticationError(message));
                            try {
                                const doc = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].docset[0].doc[0].data[0];
                                resolve(doc);
                            }
                            catch (error) {
                                reject(new error_1.BillError(error));
                            }
                        });
                    });
                }
                catch (err) {
                    return reject(err);
                }
            }));
        });
    }
    searchMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const token = yield this.authenticate();
                    this.requester.post(Object.assign(this.requestOptions, {
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
                    }), (err, response, data) => {
                        if (err)
                            return reject(new error_1.BillError(err));
                        xml2js_1.parseString(data, (err, result) => {
                            if (err)
                                return reject(new error_1.BillError(err));
                            try {
                                // docapost don't send error response codes
                                const validationMessage = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].message[0];
                                if (validationMessage === 'token invalid, authentication failed.')
                                    return reject(new error_1.AuthenticationError(validationMessage));
                                let documents = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].dataset[0].data;
                                if (!documents)
                                    return resolve([]);
                                documents.map(document => {
                                    document.formatedDateDocument = moment(document.DateDocument[0], 'YYYY-MM-DD').format('DD/MM/YY');
                                    document.priceHt = document.MontantHT[0];
                                });
                                // Filter according to provided date cause docapost doesn't work correctly.
                                documents = documents.filter(doc => {
                                    if (!query.dateFrom && !query.dateTo)
                                        return true;
                                    if (query.dateFrom && query.dateTo)
                                        return moment(doc.formatedDateDocument, 'DD/MM/YY').isBetween(moment(query.dateFrom, 'DD/MM/YY'), moment(query.dateTo, 'DD/MM/YY'));
                                    if (query.dateFrom)
                                        return moment(doc.formatedDateDocument, 'DD/MM/YY').isAfter(moment(query.dateFrom, 'DD/MM/YY'));
                                    if (query.dateTo)
                                        return moment(doc.formatedDateDocument, 'DD/MM/YY').isBefore(moment(query.dateTo, 'DD/MM/YY'));
                                });
                                documents = documents.filter(doc => {
                                    if (query.typeLivraison && query.typeLivraison.toUpperCase() === 'LIVRAISON')
                                        return !doc.TypeLivraison.includes('ENLEVEMENT');
                                    return true;
                                });
                                resolve(documents);
                            }
                            catch (err) {
                                return reject(new error_1.BillError(err));
                            }
                        });
                    });
                }
                catch (err) {
                    return reject(err);
                }
            }));
        });
    }
};
Docapost = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Docapost);
exports.Docapost = Docapost;
//# sourceMappingURL=Docapost.js.map