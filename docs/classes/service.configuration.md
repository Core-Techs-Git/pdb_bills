[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [service](../modules/service.md) › [Configuration](service.configuration.md)

# Class: Configuration

## Hierarchy

* **Configuration**

## Implements

* [ConfigurationInterface](../interfaces/service.configurationinterface.md)

## Index

### Constructors

* [constructor](service.configuration.md#constructor)

### Properties

* [serviceConfig](service.configuration.md#protected-serviceconfig)

### Methods

* [getServiceConfiguration](service.configuration.md#getserviceconfiguration)
* [setServiceConfiguration](service.configuration.md#protected-setserviceconfiguration)

## Constructors

###  constructor

\+ **new Configuration**(`serviceName`: string): *[Configuration](service.configuration.md)*

*Defined in [src/service/Configuration.ts:19](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/Configuration.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`serviceName` | string |

**Returns:** *[Configuration](service.configuration.md)*

## Properties

### `Protected` serviceConfig

• **serviceConfig**: *[ServiceConfiguration](../modules/model.md#serviceconfiguration)*

*Defined in [src/service/Configuration.ts:19](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/Configuration.ts#L19)*

Configuration the specify service.

**`access`** protected

## Methods

###  getServiceConfiguration

▸ **getServiceConfiguration**(): *[ServiceConfiguration](../modules/model.md#serviceconfiguration)*

*Implementation of [ConfigurationInterface](../interfaces/service.configurationinterface.md)*

*Defined in [src/service/Configuration.ts:56](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/Configuration.ts#L56)*

**Returns:** *[ServiceConfiguration](../modules/model.md#serviceconfiguration)*

___

### `Protected` setServiceConfiguration

▸ **setServiceConfiguration**(`serviceName`: string): *void*

*Defined in [src/service/Configuration.ts:29](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/service/Configuration.ts#L29)*

Set service configuration property.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serviceName` | string | Name of the service configuration to look for.  |

**Returns:** *void*
