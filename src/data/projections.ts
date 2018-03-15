import { inject, injectable } from 'inversify';

import { Handle, IEventBus, Projection } from '@cashfarm/plow';
import { hydrate } from '@cashfarm/lang';

import * as events from '../domain/events';
import { TodoStore , TodoDto } from '../data/todoStore';

const debug = require('debug')('todo:projections');

// This decorator will register the projection in the event bus
@injectable()
@Projection(
  events.TodoCreated,
  events.TodoCompleted,
  events.TodoDescriptionUpdated,
  events.TodoUncompleted
)
export class TodoProjections {

  constructor(@inject(TodoStore) private todos: TodoStore, @inject(IEventBus) bus: IEventBus) {
    bus.subscribe(events.TodoCreated, this);
  }

  public [Handle(events.TodoCreated)](event: events.TodoCreated): void {
    debug('Running projection for TodoCreated', event);

    const todo =  new TodoDto();

    hydrate(todo, event);

    this.todos.save(todo);
  }

  public [Handle(events.TodoCompleted)](event: events.TodoCompleted): void {
    debug('Running projection for TodoCompleted', event);

    this.todos.findById(event.id)
      .then(todo => {
        todo.done = true;

        return this.todos.save(todo);
      });
  }

  public [Handle(events.TodoUncompleted)](event: events.TodoUncompleted): void {
    debug('Running projection for TodoUncompleted', event);

    this.todos.findById(event.id)
      .then(todo => {
        todo.done = false;

        return this.todos.save(todo);
      });
  }

  public [Handle(events.TodoDescriptionUpdated)](event: events.TodoDescriptionUpdated): void {
    debug('Running projection for TodoDescriptionUpdated', event);

    this.todos.findById(event.id)
      .then(todo => {
        todo.description = event.description;
        this.todos.save(todo);
      });
  }
}
