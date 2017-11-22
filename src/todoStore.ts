import { Guid } from '@cashfarm/lang';
import { provide } from '@cashfarm/plow';
import { MysqlStore, Table, TableName, StringField, PK, BooleanField, DateField, TableClass, DtoClass } from '@cashfarm/store';

import { Todo } from './todo';
import { ConnectionPool } from './db';

@TableName('todos')
export class TodosTable extends Table {
  @PK()
  public id = new StringField('id');
  public done = new BooleanField('done');
  public description = new StringField('description');
  public createdAt = new DateField('createdAt');
}

@DtoClass(Todo)
@TableClass(TodosTable)
@provide(TodoStore)
export class TodoStore extends MysqlStore<TodosTable, Todo> {

  constructor() {
    super(ConnectionPool);
  }

  public findAll(): Promise<Todo[]> {
    return super.find(null);
  }

  public findById(id: Guid | string) {
    return this.findOne(q => q.where(t => t.id.equals(id.toString())));
  }

  public async save(todo: Todo) {
    const oldTodo = await this.findById(todo.id.toString());

    if (oldTodo) {
      oldTodo.description = todo.description;
      oldTodo.done = todo.done;

      return this.update(todo, q => q.where(t => t.id.equals(todo.id.toString())))
        .then(() => oldTodo);
    }

    return super.create(todo);
  }
}
