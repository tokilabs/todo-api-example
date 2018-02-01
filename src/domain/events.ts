import { Guid, FQN } from '@cashfarm/lang';
import { DomainEvent, Symbols } from '@cashfarm/plow';

// tslint:disable:max-classes-per-file

@DomainEvent('domain.events.TodoCreated')
export class TodoCreated {

  public readonly done = false;
  public readonly createdAt = new Date();

  constructor(
    public readonly id: Guid,
    public readonly description: string
  ) {}
}

@DomainEvent('domain.events.TodoDescriptionUpdated')
export class TodoDescriptionUpdated {
  constructor(
    public readonly id: Guid,
    public readonly description: string
  ) {}
}

@DomainEvent('domain.events.TodoCompleted')
export class TodoCompleted {
  public readonly done: boolean = true;

  constructor(
    public readonly id: Guid
  ) {}
}

@DomainEvent('domain.events.TodoUncompleted')
export class TodoUncompleted {
  public readonly done: boolean = false;

  constructor(
    public readonly id: Guid
  ) {}
}
