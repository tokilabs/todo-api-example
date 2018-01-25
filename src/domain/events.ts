import { Guid, FQN } from '@cashfarm/lang';
import { DomainEvent, Symbols } from '@cashfarm/plow';

@DomainEvent
@FQN('@cashfarm/examples-todo-api:domain.events.TodoCreated')
export class TodoCreated {

  public readonly done = false;
  public readonly createdAt = new Date();

  constructor(
    public readonly id: Guid,
    public readonly description: string
  ) {}

  private static [Symbols.EventLoader](o: any) {
    return new TodoCreated(
      new Guid(o.id),
      o.description,
    )
  }
}

@DomainEvent
@FQN('@cashfarm/examples-todo-api:domain.events.TodoDescriptionUpdated')
export class TodoDescriptionUpdated {
  constructor(
    public readonly id: Guid,
    public readonly description: string
  ) {}

  private static [Symbols.EventLoader](o: any) {
    return new TodoDescriptionUpdated(
      new Guid(o.id),
      o.description,
    )
  }
}

@DomainEvent
@FQN('@cashfarm/examples-todo-api:domain.events.TodoCompleted')
export class TodoCompleted {
  public readonly done: boolean = true;

  constructor(
    public readonly id: Guid
  ) {}

  private static [Symbols.EventLoader](o: any) {
    return new TodoCompleted(
      new Guid(o.id)
    )
  }
}

@DomainEvent
@FQN('@cashfarm/examples-todo-api:domain.events.TodoUncompleted')
export class TodoUncompleted {
  public readonly done: boolean = false;

  constructor(
    public readonly id: Guid
  ) {}

  private static [Symbols.EventLoader](o: any) {
    return new TodoUncompleted(
      new Guid(o.id)
     
    )
  }
}
