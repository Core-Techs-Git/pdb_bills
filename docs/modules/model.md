[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [model](model.md)

# Module: model

## Index

### Type aliases

* [Document](model.md#document)
* [DocumentDTO](model.md#documentdto)
* [SearchOptionsDTO](model.md#searchoptionsdto)
* [ServiceConfiguration](model.md#serviceconfiguration)

## Type aliases

###  Document

Ƭ **Document**: *object*

*Defined in [src/model/Document.ts:10](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/model/Document.ts#L10)*

A document minimal properties

#### Type declaration:

* **id**: *string[]*

* **page**: *string[]*

* **type**: *string[]*

___

###  DocumentDTO

Ƭ **DocumentDTO**: *object*

*Defined in [src/model/DocumentDTO.ts:12](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/model/DocumentDTO.ts#L12)*

Document to be transfer.

#### Type declaration:

* **CodeCarteTitulaire**: *string[]*

* **CodeClientCourt**: *string[]*

* **CodeDepot**: *string[]*

* **CodeSociete**: *string[]*

* **DateDocument**: *string[]*

* **Doc**: *[Document](model.md#document)[]*

* **MontantHT**: *string[]*

* **MontantTTC**: *string[]*

* **NomDepot**: *string[]*

* **NomSocieteClient**: *string[]*

* **NomTitulaire**: *string[]*

* **NumDocument**: *string[]*

* **NumeroCommande**: *string[]*

* **OrigineCommande**: *string[]*

* **ReferenceChantier**: *string[]*

* **ReferenceWeb**: *string[]*

* **TypeDocument**: *string[]*

* **TypeLivraison**: *string[]*

* **formatedDateDocument**? : *string*

* **priceHt**? : *string*

___

###  SearchOptionsDTO

Ƭ **SearchOptionsDTO**: *object*

*Defined in [src/model/SearchOptionsDTO.ts:10](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/model/SearchOptionsDTO.ts#L10)*

Transfert data representing search options.

#### Type declaration:

* **code_depot**? : *string*

* **company_id**? : *string*

* **dateFrom**? : *string*

* **dateTo**? : *string*

* **numDocument**? : *string*

* **priceFrom**? : *string*

* **priceTo**? : *string*

* **start**? : *string*

* **typeLivraison**? : *string*

___

###  ServiceConfiguration

Ƭ **ServiceConfiguration**: *object*

*Defined in [src/model/ServiceConfiguration.ts:10](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/model/ServiceConfiguration.ts#L10)*

A service configuration properties

#### Type declaration:

* \[ **prop**: *string*\]: any

* **host**: *string*

* **password**: *string*

* **path**? : *string*

* **port**? : *number*

* **protocol**: *string*

* **proxy**: *boolean*

* **user**: *string*
