import { UniqueEntityID } from 'types-ddd';

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
