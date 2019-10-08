import {inject, injectable, targetName} from 'inversify';

import {TYPES, VALIDATORS} from '../const';
import {ValidatorInterface} from './validator';
import {SearchOptionsDTO, DocumentDTO} from '../models';
import {ArchiveStartegyInterface} from '../strategies';

/**
 * Provid an api to retrieve stored documents.
 */
@injectable()
export class Archive implements ArchiveInterface {
  /**
   * Strategy to be used as api implementation.
   * @typedef ArchiveStartegyInterface
   * @access protected
   */
  protected archiveStrategy: ArchiveStartegyInterface;

  /**
   * Validate recieving data.
   * @typedef ValidatorInterface
   * @access protected
   */
  protected validator: ValidatorInterface;

  constructor(
    @inject(TYPES.ArchiveStartegyInterface) archiveStrategy: ArchiveStartegyInterface,
    @inject(TYPES.ValidatorInterface) @targetName(VALIDATORS.SEARCH_OPTIONS_DTO) validator: ValidatorInterface,
  ) {
    this.archiveStrategy = archiveStrategy;
    this.validator = validator;
  }

  setStrategy(archiveStrategy: ArchiveStartegyInterface): void {
    this.archiveStrategy = archiveStrategy;
  }

  searchOne(docID: number): Promise<DocumentDTO> {
    if (isNaN(+docID)) return Promise.reject(new Error('Invalid id.'));
    else return this.archiveStrategy.searchOne(docID);
  }

  searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>> {
    if (!this.validator.isValid(options)) return Promise.reject(new Error('Invalid request options'));
    else return this.archiveStrategy.searchMany(options);
  }
}

/**
 * Archives api interface.
 */
export interface ArchiveInterface {
  /**
   * Change the archive service provider (which is a strategy).
   * @param {ArchiveStartegyInterface} archiveStrategy The new strategy to be used.
   */
  setStrategy(archiveStrategy: ArchiveStartegyInterface): void;

  /**
   * Search and return a document identify by his ID.
   * @param {number} docID The id of the document needed.
   * @returns {Promise<DocumentDTO>} Retrieved document or an error.
   */
  searchOne(id: number): Promise<DocumentDTO>;

  /**
   * Search and return multiple documents matching the parameters.
   * @param {SearchOptionsDTO} options Search parameters for multiple documents.
   * @returns {Promise<Array<DocumentDTO>>} Retrieved documents that matched the parameters or an error.
   */
  searchMany(options: SearchOptionsDTO): Promise<Array<DocumentDTO>>;
}
