<p align="center">
  <a href="https://www.laplateforme.com/">
    <img src="https://www.laplateforme.com/cms/i?o=%2Fsites%2Fdefault%2Ffiles%2F2017-04%2Flogo_pdb_bsl-1.jpg" alt="Pdb logo" width="200">
  </a>
</p>

# PDB BILLS

[![Latest tag](https://img.shields.io/github/v/tag/Core-Techs-Git/pdb_bills?color=f87a15)](https://github.com/Core-Techs-Git/pdb_bills/tags)
![Commit since latest release](https://img.shields.io/github/commits-since/Core-Techs-Git/pdb_bills/latest?color=f87a15&sort=semver)

[![Built with TypeScript](https://img.shields.io/npm/v/typescript?color=007ACC&label=Typescript&logo=typescript)](https://github.com/microsoft/TypeScript)
[![Tested with Jest](https://img.shields.io/npm/v/jest?color=C21325&label=Jest&logo=jest)](https://github.com/facebook/jest)
[![Code Style Eslint](https://img.shields.io/npm/v/eslint?color=4B32C3&label=Eslint&logo=eslint)](https://github.com/eslint/eslint)
[![Code Style Prettier](https://img.shields.io/npm/v/prettier?color=F7B93E&label=Prettier&logo=prettier)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This module gather in one place all the dependencies required by **[La Plateform du bâtiment](https://www.laplateforme.com/)** projects to interact with bills document. It relays on external services like [Docapost](https://www.docaposte.com/).

## Features

Below are the features offered by **pdb_bills**:

- [x] Search in stored documents
- [x] Retrieve a specified document

## How to use it ?

1. Install with `npm`

```Shell
$ npm i -S @core-techs-git/pdb_bills
```

> ⚠️
> To install this way you need to have configured `npm` to use `github package registry`. To know more you may follow [this link](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry#authenticating-to-github-package-registry).

<details>
  <summary>Or you can follow this quick setup</summary>
  <ul>
    <li>
      <p>Set a scoped registry access</p>
      <pre>$ npm config set @core-techs-git:registry https://npm.pkg.github.com/core-techs-git</pre>
    </li>
    <li>
      <p>Set authentication information inside your .npmrc file</p>
      <pre>//npm.pkg.github.com/:_authToken=PERSONAL-ACCESS-TOKEN</pre>
    </li>
  </ul>
  <p><b><i><a href="https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line">PERSONAL-ACCESS-TOKEN</a></i></b> is generated in github settings.</p>
</details>

2. Edit your configurations files _`config/**.js`_ (located at the root of your project) according to [pdb_requester](https://github.com/Core-Techs-Git/pdb_requester) since bills depends on it to make its requests.

```JavaScript
const config = {};
...
config.docapost = {
  proxy: false,
  protocol: 'https',
  host: 'externalhost.com',
  path: '/somepath',
  user: 'myusername',
  password: 'mypassword'
};
...
module.exports = config;
```

4. Import the module inside your code and just use it

```JavaScript
const bills = require('@core-techs-git/pdb_bills');

docapost.serviceDoc(docId, (err, data) => {
  console.log('err', err);
  console.log('data', data);
});

docapost.serviceSearch({
  code_depot: '2',
  priceFrom: '0',
  priceTo: '10.6'
}, (err, data) => {
  console.log('err', err);
  console.log('data', data);
});
```

## How to contribute ?

1. Import the project from [github](https://github.com/Core-Techs-Git/pdb_bills)

```Shell
$ git clone git@github.com:Core-Techs-Git/pdb_bills.git
```

2. Install dependencies with `npm`

```Shell
$ npm i
```

That's it you're all setup and can start contributing :thumbsup:.
Also remember to check out our guidelines for contributing :wink:.
