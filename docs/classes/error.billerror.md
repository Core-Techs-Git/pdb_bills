[@core-techs-git/pdb_bills](../README.md) › [Globals](../globals.md) › [error](../modules/error.md) › [BillError](error.billerror.md)

# Class: BillError

## Hierarchy

* [Error](error.billerror.md#static-error)

  ↳ **BillError**

  ↳ [AuthenticationError](error.authenticationerror.md)

  ↳ [ConfigurationError](error.configurationerror.md)

  ↳ [ValidationError](error.validationerror.md)

## Index

### Constructors

* [constructor](error.billerror.md#constructor)

### Properties

* [message](error.billerror.md#message)
* [name](error.billerror.md#name)
* [stack](error.billerror.md#optional-stack)
* [Error](error.billerror.md#static-error)

## Constructors

###  constructor

\+ **new BillError**(`info?`: string | [Error](error.billerror.md#static-error)): *[BillError](error.billerror.md)*

*Defined in [src/error/BillError.ts:6](https://github.com/Core-Techs-Git/pdb_bills/blob/129d5d6/src/error/BillError.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`info?` | string &#124; [Error](error.billerror.md#static-error) |

**Returns:** *[BillError](error.billerror.md)*

## Properties

###  message

• **message**: *string*

*Inherited from [BillError](error.billerror.md).[message](error.billerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [BillError](error.billerror.md).[name](error.billerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [BillError](error.billerror.md).[stack](error.billerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
