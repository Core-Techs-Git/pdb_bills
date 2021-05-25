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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Docapost = void 0;
const moment_1 = __importDefault(require("moment"));
const xml2js_1 = require("xml2js");
const inversify_1 = require("inversify");
const Archive_1 = require("./Archive");
const const_1 = require("../../const");
const error_1 = require("../../error");
let Docapost = class Docapost extends Archive_1.Archive {
    constructor(config, requester, validator) {
        super();
        this.config = config.getServiceConfiguration();
        this.requester = requester;
        this.validator = validator;
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.requester.post({
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
                }, (err, response, data) => {
                    if (err)
                        reject(new error_1.AuthenticationError(err));
                    try {
                        const findToken = data.split('token')[1].substring(1);
                        const token = findToken.substring(0, findToken.length - 2);
                        resolve(token);
                    }
                    catch (error) {
                        reject(new error_1.AuthenticationError(error));
                    }
                });
            });
        });
    }
    searchOne(docID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (isNaN(+docID))
                    return reject(new error_1.ValidationError(`Invalid docID — ${docID}`));
                this.authenticate()
                    .then((token) => {
                    this.requester.post({
                        uri: '',
                        headers: {
                            'Content-type': 'text/xml',
                        },
                        body: `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soa="http://archiv-e-service/soap/"><x:Header/>
                  <x:Body><soa:serviceDOC>
                  <soa:token>${token}</soa:token>
                  <soa:docset><soa:doc>
                  <soa:id>${docID}</soa:id>
                  <soa:duplicata>1</soa:duplicata></soa:doc></soa:docset></soa:serviceDOC>
                  </x:Body></x:Envelope>`,
                    }, (err, response, data) => {
                        if (err)
                            return reject(new error_1.BillError(err));
                        xml2js_1.parseString(data, (err, result) => {
                            if (err)
                                return reject(new error_1.BillError(err));
                            try {
                                const message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].message[0];
                                if (message === 'token invalid, authentication failed.')
                                    return reject(new error_1.AuthenticationError(message));
                                const doc = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceDOCRes'][0].docset[0].doc[0].data[0];
                                resolve(doc);
                            }
                            catch (error) {
                                return reject(new error_1.BillError(error));
                            }
                        });
                    });
                })
                    .catch((AuthError) => {
                    reject(AuthError);
                });
            });
        });
    }
    searchMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    this.validator.validate(query);
                }
                catch (validationError) {
                    return reject(validationError);
                }
                this.authenticate()
                    .then((token) => __awaiter(this, void 0, void 0, function* () {
                    let start = 1;
                    const bills = [];
                    let res;
                    try {
                        do {
                            res = yield this.getBillsList(query, token, start);
                            bills.push(...res.bills);
                            start += 100;
                        } while (res.hits === 100);
                        resolve(bills);
                    }
                    catch (error) {
                        reject(error instanceof error_1.BillError ? error : new error_1.BillError(error));
                    }
                }))
                    .catch((AuthError) => {
                    reject(AuthError);
                });
            });
        });
    }
    getBillsList(query, token, start) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.requester.post({
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
                  ${query.dateFrom
                        ? `<DateDebutRecherche_from>${moment_1.default(query.dateFrom, const_1.VALID_DATE_FORMAT, true).format('YYYY-MM-DD')}</DateDebutRecherche_from>`
                        : ''}
                  ${query.dateTo
                        ? `<DateFinRecherche_to>${moment_1.default(query.dateTo, const_1.VALID_DATE_FORMAT, true).format('YYYY-MM-DD')}</DateFinRecherche_to>`
                        : ''}
                  ${query.typeLivraison === 'ENLEVEMENT' ? '<TypeLivraison>ENLEVEMENT</TypeLivraison>' : ''}
                </metadata>
              </soap:serviceSEARCH>
            </soapenv:Body>
          </soapenv:Envelope>`,
                }, (err, response, data) => {
                    if (err)
                        return reject(new error_1.BillError(err));
                    xml2js_1.parseString(data, (err, result) => {
                        if (err)
                            return reject(new error_1.BillError(err));
                        try {
                            const message = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].message[0];
                            if (message === 'token invalid, authentication failed.')
                                return reject(new error_1.AuthenticationError(message));
                            const hits = +result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].hits_returned;
                            let documents = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['ns1:serviceSEARCHRes'][0].dataset[0].data;
                            if (!documents)
                                return resolve({ hits: 0, bills: [] });
                            documents.map((document) => {
                                document.formatedDateDocument = moment_1.default(document.DateDocument[0], 'YYYY-MM-DD').format('DD/MM/YY');
                                document.priceHt = document.MontantHT[0];
                            });
                            documents = documents.filter((doc) => {
                                const required = [];
                                if (!query.typeLivraison)
                                    required.push(true);
                                if ((query.typeLivraison || '').toUpperCase() === 'LIVRAISON')
                                    required.push(!doc.TypeLivraison.includes('ENLEVEMENT'));
                                if ((query.typeLivraison || '').toUpperCase() === 'ENLEVEMENT')
                                    required.push(doc.TypeLivraison.includes('ENLEVEMENT'));
                                if (query.dateFrom)
                                    required.push(moment_1.default(doc.formatedDateDocument, 'DD/MM/YY').isAfter(moment_1.default(query.dateFrom, const_1.VALID_DATE_FORMAT, true).subtract(1, 'day')));
                                if (query.dateTo)
                                    required.push(moment_1.default(doc.formatedDateDocument, 'DD/MM/YY').isBefore(moment_1.default(query.dateTo, const_1.VALID_DATE_FORMAT, true).add(1, 'day')));
                                return required.reduce((accumulator, currentValue) => accumulator && currentValue);
                            });
                            resolve({ hits, bills: documents });
                        }
                        catch (error) {
                            reject(new error_1.BillError(error));
                        }
                    });
                });
            });
        });
    }
};
Docapost = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(const_1.TYPES.ConfigurationInterface)), __param(0, inversify_1.named(const_1.ARCHIVE.DOCAPOSTE)),
    __param(1, inversify_1.inject(const_1.TYPES.Requester)), __param(1, inversify_1.named(const_1.ARCHIVE.DOCAPOSTE)),
    __param(2, inversify_1.inject(const_1.TYPES.ValidatorInterface)), __param(2, inversify_1.named(const_1.VALIDATORS.SEARCH_OPTIONS_DTO)),
    __metadata("design:paramtypes", [Object, Function, Object])
], Docapost);
exports.Docapost = Docapost;
//# sourceMappingURL=Docapost.js.map