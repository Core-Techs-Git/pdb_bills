[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [service](../modules/service.md) › [ArchiveInterface](service.archiveinterface.md)

# Interface: ArchiveInterface

Archives api interface.

## Hierarchy

* **ArchiveInterface**

## Implemented by

* [Archive](../classes/service.archive.md)
* [Docapost](../classes/service.docapost.md)

## Index

### Methods

* [searchMany](service.archiveinterface.md#searchmany)
* [searchOne](service.archiveinterface.md#searchone)

## Methods

###  searchMany

▸ **searchMany**(`options`: [SearchOptionsDTO](../modules/model.md#searchoptionsdto)): *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

*Defined in [src/service/archive/Archive.ts:59](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L59)*

Search and return multiple documents matching the parameters.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [SearchOptionsDTO](../modules/model.md#searchoptionsdto) | Search parameters for multiple documents. |

**Returns:** *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

Retrieved documents that matched the parameters or an error.

___

###  searchOne

▸ **searchOne**(`id`: number): *Promise‹string›*

*Defined in [src/service/archive/Archive.ts:52](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L52)*

Search and return a document identify by his ID.

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *Promise‹string›*

Retrieved document or an error.
