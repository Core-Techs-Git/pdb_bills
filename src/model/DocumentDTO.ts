/**
 * @module model
 * @packageDocumentation
 */

import {Document} from '@/model/Document';

/**
 * Document to be transfer.
 * @typedef {Object} DocumentDTO
 */
export type DocumentDTO = {
  CodeCarteTitulaire: string[];
  CodeClientCourt: string[];
  CodeDepot: string[];
  CodeSociete: string[];
  DateDocument: string[];
  Doc: Document[];
  formatedDateDocument?: string;
  MontantHT: string[];
  MontantTTC: string[];
  NomDepot: string[];
  NomSocieteClient: string[];
  NomTitulaire: string[];
  NumDocument: string[];
  NumeroCommande: string[];
  OrigineCommande: string[];
  priceHt?: string;
  ReferenceChantier: string[];
  ReferenceWeb: string[];
  TypeDocument: string[];
  TypeLivraison: string[];
};
