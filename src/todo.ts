import { Guid } from '@cashfarm/lang';

export class Todo {
  public id: Guid;
  public done: boolean;
  public createdAt: Date;

  constructor(public description?: string) {
    this.id = new Guid();
    this.done = false;
    this.createdAt = new Date();
  }
}
