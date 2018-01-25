import { inject } from 'inversify';

import { Guid } from '@cashfarm/lang';
import { EventSourcedRepositoryOf, IEventStore, IEventPublisher, provide } from '@cashfarm/plow';

import { Todo } from '../domain/todo';

@provide(TodoRepository)
export class TodoRepository extends EventSourcedRepositoryOf<Todo, Guid> {
  constructor(
    @inject(IEventStore) protected storage: IEventStore,
    @inject(IEventPublisher) eventPublisher: IEventPublisher
  ) {
    super(storage, Todo, eventPublisher);
  }
}
