import {resolve} from 'path';
import {Container} from 'inversify';
import requester from '@core-techs-git/pdb_requester';
import {RequestAPI, Request, CoreOptions, RequiredUriUrl} from 'request';

import {TYPES, VALIDATORS, ARCHIVE} from '@pdb_bills/const';
import {ConfigurationInterface, Configuration, ValidatorInterface, SearchOptionsDTOValidator, Docapost, ArchiveInterface} from '@pdb_bills/services';

const configPath = resolve(process.cwd(), 'config.js');
const container = new Container();
//  Define autowiring by binding interfaces to instanciated class.
Object.keys(ARCHIVE).map(archiveName => {
  container
    .bind<ConfigurationInterface>(TYPES.ConfigurationInterface)
    .toDynamicValue(() => {
      return new Configuration(ARCHIVE[archiveName], configPath);
    })
    .inSingletonScope()
    .whenTargetNamed(ARCHIVE[archiveName]);

  container
    .bind<RequestAPI<Request, CoreOptions, RequiredUriUrl>>(TYPES.Requester)
    .toDynamicValue(() => {
      return requester(ARCHIVE[archiveName]);
    })
    .inSingletonScope()
    .whenTargetNamed(ARCHIVE[archiveName]);
});
container
  .bind<ValidatorInterface>(TYPES.ValidatorInterface)
  .to(SearchOptionsDTOValidator)
  .whenTargetNamed(VALIDATORS.SEARCH_OPTIONS_DTO);
container
  .bind<ArchiveInterface>(TYPES.ArchiveInterface)
  .to(Docapost)
  .whenTargetNamed(ARCHIVE.DOCAPOSTE);

export default container;
