import { inject } from 'inversify';

import { Handle, Projection } from '@cashfarm/plow';
import { hydrate } from '@cashfarm/lang';

import * as events from '../domain/events';
import { TodoStore , TodoDto } from '../data/todoStore';

const debug = require('debug')('todo:projections');

// This decorator will register the projection in the event bus
@Projection(
  events.TodoCreated, events.TodoCompleted, events.TodoDescriptionUpdated, events.TodoUncompleted
)
export class TodoProjections {

  constructor(@inject(TodoStore) private todos: TodoStore) {}

  public [Handle(events.TodoCreated)](event: events.TodoCreated): void {
    debug('Running projection for TodoCompleted');

    const todo =  new TodoDto();

    hydrate(todo, event);

    this.todos.save(todo);
  }

  public [Handle(events.TodoCompleted)](event: events.TodoCompleted): void {
    debug('Running projection for TodoCompleted');

    this.todos.findById(event.id)
      .then(todo => {
        todo.done = true;

        return this.todos.save(todo);
      });
  }

  public [Handle(events.TodoUncompleted)](event: events.TodoUncompleted): void {
    debug('Running projection for TodoUncompleted');

    this.todos.findById(event.id)
      .then(todo => {
        todo.done = false;

        return this.todos.save(todo);
      });
  }

  public [Handle(events.TodoDescriptionUpdated)](event: events.TodoDescriptionUpdated): void {
    debug('Running projection for TodoDescriptionUpdated');

    this.todos.findById(event.id)
      .then(todo => {
        todo.description = event.description;
        this.todos.save(todo);
      });
  }
}

//   this.bus.register(TransactionStatusChanged, this);
//       this.bus.register(TransactionBilletCreated, this);
