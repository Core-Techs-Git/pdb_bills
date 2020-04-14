[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [service](../modules/service.md) › [Archive](service.archive.md)

# Class: Archive

Provid an api to retrieve stored documents.

## Hierarchy

* **Archive**

  ↳ [Docapost](service.docapost.md)

## Implements

* [ArchiveInterface](../interfaces/service.archiveinterface.md)

## Index

### Properties

* [config](service.archive.md#protected-abstract-config)
* [requester](service.archive.md#protected-abstract-requester)
* [validator](service.archive.md#protected-abstract-validator)

### Methods

* [searchMany](service.archive.md#abstract-searchmany)
* [searchOne](service.archive.md#abstract-searchone)

## Properties

### `Protected` `Abstract` config

• **config**: *[ServiceConfiguration](../modules/model.md#serviceconfiguration)*

*Defined in [src/service/archive/Archive.ts:29](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L29)*

Service configuration.

**`access`** protected

___

### `Protected` `Abstract` requester

• **requester**: *RequestAPI‹Request, CoreOptions, RequiredUriUrl›*

*Defined in [src/service/archive/Archive.ts:36](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L36)*

Requester object.

**`access`** protected

___

### `Protected` `Abstract` validator

• **validator**: *[ValidatorInterface](../interfaces/service.validatorinterface.md)*

*Defined in [src/service/archive/Archive.ts:22](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L22)*

Validate recieving data.

**`access`** protected

## Methods

### `Abstract` searchMany

▸ **searchMany**(`options`: [SearchOptionsDTO](../modules/model.md#searchoptionsdto)): *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

*Implementation of [ArchiveInterface](../interfaces/service.archiveinterface.md)*

*Defined in [src/service/archive/Archive.ts:40](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [SearchOptionsDTO](../modules/model.md#searchoptionsdto) |

**Returns:** *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

___

### `Abstract` searchOne

▸ **searchOne**(`docID`: number): *Promise‹string›*

*Implementation of [ArchiveInterface](../interfaces/service.archiveinterface.md)*

*Defined in [src/service/archive/Archive.ts:38](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Archive.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`docID` | number |

**Returns:** *Promise‹string›*
