import {Container, interfaces} from 'inversify';

import {TYPES, VALIDATORS} from '../const';
import {Archive} from '../services/Archive';
import {Docapost} from '../strategies/Docapost';
import {ArchiveInterface} from '../services/Archive';
import {ArchiveStartegyInterface} from '../strategies';
import {ValidatorInterface, ValidateSearchOptionsDTO} from '../services/validator';

const container = new Container();
//  Define autowiring by binding interfaces to instanciated class.
container.bind<ArchiveStartegyInterface>(TYPES.ArchiveStartegyInterface).to(Docapost);
container.bind<ArchiveInterface>(TYPES.ArchiveInterface).to(Archive);
container
  .bind<ValidatorInterface>(TYPES.ValidatorInterface)
  .to(ValidateSearchOptionsDTO)
  .when((request: interfaces.Request) => {
    return request.target.name.equals(VALIDATORS.SEARCH_OPTIONS_DTO);
  });

export default container;
