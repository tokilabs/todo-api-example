import { IDomainEvent } from '@cashfarm/plow';
import { Guid } from '@cashfarm/lang';
import { Todo } from './todo';

export const ICampaignRepository = Symbol('ICampaignRepository');

export interface ITodoRepository {
  getById(id: Guid): Promise<Todo>;
  save(todo: Todo): Promise<IDomainEvent[]>;
}
