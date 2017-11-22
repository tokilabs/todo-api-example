import * as Hapi from 'hapi';
import * as Joi from 'joi';
import * as Boom from 'boom';

import { inject } from 'inversify';
import { provide } from '@cashfarm/plow';
import { IController } from '@cashfarm/tractor/interfaces';
import { Endpoint } from '@cashfarm/tractor/decorators';

import { Todo } from './todo';
import { TodoStore } from './todoStore';

import { Controller } from '@cashfarm/tractor';

@Controller
export class TodoController {
  constructor(@inject(TodoStore) private store: TodoStore) {}

  @Endpoint('GET', '/todos', {
    description: 'Returns all todos'
  })
  public list(req: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    return this.store.findAll();
  }

  @Endpoint('POST', '/todos', {
    description: 'Creates a todo',
    validate: {
      payload: Joi.object({
        description: Joi.string().allow(''),
        done: Joi.bool()
      })
    }
  })
  public create(req: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const todo = new Todo(req.payload.description);
    todo.done = !!req.payload.done;

    return this.store.save(todo);
  }

  @Endpoint('GET', '/todos/{id}', {
    description: 'Returns a single todo',
    validate: {
      params: {
        id: Joi.string().guid()
      }
    }
  })
  public show(req: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    return reply(this.store.findById(req.params.id));
  }

  @Endpoint('POST', '/todos/{id}', {
    description: 'Updates a todo',
    validate: {
      params: {
        id: Joi.string().guid()
      },
      payload: Joi.object({
        description: Joi.string().allow('').optional().default(''),
        done: Joi.bool().optional().default(false)
      })
    }
  })
  public async update(req: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    const todo = await this.store.findById(req.params.id);

    if (!todo)
      return reply(Boom.notFound(`Todo with id ${req.params.id} could not be found`));

    return reply(this.store.save(todo));
  }
}
