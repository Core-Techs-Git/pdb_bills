[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [index](index.md)

# Module: index

## Index

### Functions

* [serviceDoc](index.md#servicedoc)
* [serviceSearch](index.md#servicesearch)

## Functions

###  serviceDoc

▸ **serviceDoc**(`docID`: number, `callback`: CallableFunction, `archiveName?`: string): *void*

*Defined in [src/index.ts:19](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/index.ts#L19)*

Search and return a document identify by his ID.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`docID` | number | The id of the document needed. |
`callback` | CallableFunction | Function to execute when the document is retreive.  |
`archiveName?` | string | - |

**Returns:** *void*

___

###  serviceSearch

▸ **serviceSearch**(`options`: [SearchOptionsDTO](model.md#searchoptionsdto), `callback`: CallableFunction, `archiveName?`: string): *void*

*Defined in [src/index.ts:43](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/index.ts#L43)*

Search and return multiple documents matching the parameters.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SearchOptionsDTO](model.md#searchoptionsdto) | Search parameters for multiple documents. |
`callback` | CallableFunction | Functions to execute when documents are retrieve.  |
`archiveName?` | string | - |

**Returns:** *void*
