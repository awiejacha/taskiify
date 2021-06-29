import ProgressNotPossibleError from '../Errors/ProgressNotPossibleError';
import TaskNotAssignableError from '../Errors/TaskNotAssignableError';
import Location from './Location';
import Person from './Person';
import TaskDefinition from './TaskDefinition';
import TaskState from './TaskState';

export type TaskPresentation = {
  id: string;
  location: string;
  definition: string;
  state: string;
  assignee?: string;
  responsible?: string;
};

export default class Task {
  private taskState: TaskState;
  private taskAssignee?: Person;
  private taskResponsible?: Person;

  constructor(
    public readonly id: string,
    public readonly location: Location,
    public readonly definition: TaskDefinition,
    state: TaskState,
    assignee?: Person,
    responsible?: Person,
  ) {
    this.taskState = state;
    this.taskAssignee = assignee;
    this.taskResponsible = responsible;
  }

  get state(): TaskState {
    return this.taskState;
  }

  public progress(): void {
    if (!this.taskAssignee) {
      throw new ProgressNotPossibleError('Must be assigned first');
    }

    this.taskState = this.taskState.getProgressed();
  }

  public regress(): void {
    this.taskState = this.taskState.getRegressed();

    if (this.taskState.name === TaskState.PENDING) {
      this.taskAssignee = null;
      this.taskResponsible = null;

      return;
    }

    if (this.taskState.name === TaskState.ONGOING) {
      this.taskAssignee = new Person(this.taskResponsible.name);
    }
  }

  get assignee(): Person|null {
    return this.taskAssignee;
  }

  public assignTo(assignee: Person): void {
    if (this.taskState.name === TaskState.DONE) {
      throw new TaskNotAssignableError('Can not be reassigned when done');
    }

    if (this.taskState.name === TaskState.ONGOING) {
      throw new TaskNotAssignableError('Can not be reassigned when ongoing');
    }

    this.taskAssignee = assignee;

    if (!this.taskResponsible) {
      this.taskResponsible = new Person(this.taskAssignee.name);
    }
  }

  get responsible(): Person|null {
    return this.taskResponsible;
  }

  public toPresentation(): TaskPresentation {
    const presentation: TaskPresentation = {
      id: this.id,
      location: this.location.name,
      definition: this.definition.name,
      state: this.taskState.name,
    };

    if (this.taskAssignee) {
      presentation.assignee = this.taskAssignee.name;
    }

    if (this.taskResponsible) {
      presentation.responsible = this.taskResponsible.name;
    }

    return presentation;
  }
}
