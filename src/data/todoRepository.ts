import { inject } from 'inversify';

import { Guid } from '@cashfarm/lang';
import { ESRepository, IEventStore, IEventBus, provide } from '@cashfarm/plow';

import { Todo } from '../domain/todo';

@provide(TodoRepository)
export class TodoRepository extends ESRepository<Todo, Guid> {
  constructor(
    @inject(IEventStore) protected storage: IEventStore,
    @inject(IEventBus) eventPublisher: IEventBus
  ) {
    super(storage, Todo, eventPublisher);
  }
}
