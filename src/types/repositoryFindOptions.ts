import { FindOneOptions, FindOptionsRelations, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export type WhereOption<Entity> = FindOptionsWhere<Entity> | FindOneOptions<Entity>['where'];
export type RelationsOption<Entity> = FindOptionsRelations<Entity> | FindOneOptions<Entity>['relations'];
export type SelectOption<Entity> = FindOptionsSelect<Entity> | FindOneOptions<Entity>['select'];
export type OderOption<Entity> = FindOneOptions<Entity>['order'];
export type QueryOption<Entity> = FindOptionsWhere<Entity>;
export type PartialEntity<Entity> = QueryDeepPartialEntity<Entity>;
