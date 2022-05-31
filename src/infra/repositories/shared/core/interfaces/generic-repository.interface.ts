export interface IQuery {
  [key: string]: string | number
}

export interface IGenericRepository<TargetEntity> {
  save(): Promise<void>
  delete(): Promise<void>
  find(query: IQuery): Promise<Array<TargetEntity>>
  exist(query: IQuery): Promise<boolean>
}