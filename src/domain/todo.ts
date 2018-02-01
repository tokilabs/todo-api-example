import { Guid, SerializeOptions, Expose } from '@cashfarm/lang';
import { DomainException, ESAggregateRoot } from '@cashfarm/plow';
import * as events from './events';

export class Todo extends ESAggregateRoot<Guid> {

  @Expose({ name: 'id' })
  protected _id: Guid;

  @Expose({ name: 'done' })
  private _done: boolean;

  @Expose({ name: 'description' })
  private _description: string;

  @Expose({ name: 'createdAt' })
  private _createdAt: Date;

  public get done(): boolean {
    return this._done;
  }

  public get description(): string {
    return this._description;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  constructor(description?: string) {
    super(new Guid());

    this.applyChange(new events.TodoCreated(this.id, description));
  }

  public updateDescription(desc: string) {
    if (desc && desc.length > 500)
      throw new DomainException('Description cannot be longer than 500 characters');

    if (this._description !== desc)
      this.applyChange(new events.TodoDescriptionUpdated(this.id, desc || ''));
  }

  public complete() {
    if (!this.complete)
      this.applyChange(new events.TodoCompleted(this.id));
  }

  public uncomplete() {
    if (this.complete) {
      this.applyChange(new events.TodoUncompleted(this.id));
    }
  }
}
