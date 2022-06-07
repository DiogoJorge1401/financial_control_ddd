import { Result } from 'types-ddd';

export interface IMockEntity<Domain, Model> {
  domain(props?: Partial<Domain>): Result<Domain>
  model(props?: Partial<Model>): Model
}