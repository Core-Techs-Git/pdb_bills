[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [service](../modules/service.md) › [Docapost](service.docapost.md)

# Class: Docapost

Implement docapost service as an archive strategy

## Hierarchy

* [Archive](service.archive.md)

  ↳ **Docapost**

## Implements

* [ArchiveInterface](../interfaces/service.archiveinterface.md)

## Index

### Constructors

* [constructor](service.docapost.md#constructor)

### Properties

* [config](service.docapost.md#protected-config)
* [requester](service.docapost.md#protected-requester)
* [validator](service.docapost.md#protected-validator)

### Methods

* [authenticate](service.docapost.md#protected-authenticate)
* [searchMany](service.docapost.md#searchmany)
* [searchOne](service.docapost.md#searchone)

## Constructors

###  constructor

\+ **new Docapost**(`config`: [ConfigurationInterface](../interfaces/service.configurationinterface.md), `requester`: RequestAPI‹Request, CoreOptions, RequiredUriUrl›, `validator`: [ValidatorInterface](../interfaces/service.validatorinterface.md)): *[Docapost](service.docapost.md)*

*Defined in [src/service/archive/Docapost.ts:25](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [ConfigurationInterface](../interfaces/service.configurationinterface.md) |
`requester` | RequestAPI‹Request, CoreOptions, RequiredUriUrl› |
`validator` | [ValidatorInterface](../interfaces/service.validatorinterface.md) |

**Returns:** *[Docapost](service.docapost.md)*

## Properties

### `Protected` config

• **config**: *[ServiceConfiguration](../modules/model.md#serviceconfiguration)*

*Overrides [Archive](service.archive.md).[config](service.archive.md#protected-abstract-config)*

*Defined in [src/service/archive/Docapost.ts:23](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L23)*

___

### `Protected` requester

• **requester**: *RequestAPI‹Request, CoreOptions, RequiredUriUrl›*

*Overrides [Archive](service.archive.md).[requester](service.archive.md#protected-abstract-requester)*

*Defined in [src/service/archive/Docapost.ts:25](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L25)*

___

### `Protected` validator

• **validator**: *[ValidatorInterface](../interfaces/service.validatorinterface.md)*

*Overrides [Archive](service.archive.md).[validator](service.archive.md#protected-abstract-validator)*

*Defined in [src/service/archive/Docapost.ts:24](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L24)*

## Methods

### `Protected` authenticate

▸ **authenticate**(): *Promise‹string›*

*Defined in [src/service/archive/Docapost.ts:42](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L42)*

Authentication to docaposte service.

**Returns:** *Promise‹string›*

A token in case of successful authentication.

___

###  searchMany

▸ **searchMany**(`query`: [SearchOptionsDTO](../modules/model.md#searchoptionsdto)): *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

*Implementation of [ArchiveInterface](../interfaces/service.archiveinterface.md)*

*Overrides [Archive](service.archive.md).[searchMany](service.archive.md#abstract-searchmany)*

*Defined in [src/service/archive/Docapost.ts:130](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L130)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | [SearchOptionsDTO](../modules/model.md#searchoptionsdto) |

**Returns:** *Promise‹Array‹[DocumentDTO](../modules/model.md#documentdto)››*

___

###  searchOne

▸ **searchOne**(`docID`: number): *Promise‹string›*

*Implementation of [ArchiveInterface](../interfaces/service.archiveinterface.md)*

*Overrides [Archive](service.archive.md).[searchOne](service.archive.md#abstract-searchone)*

*Defined in [src/service/archive/Docapost.ts:85](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/archive/Docapost.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`docID` | number |

**Returns:** *Promise‹string›*
