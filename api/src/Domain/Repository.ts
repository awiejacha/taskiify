import Task from './ValueObjects/Task';

export default interface Repository {
  findById(id:string): Promise<Task|null>;
  findNotDone(): Promise<Task[]>;
  add(task: Task): Promise<void>;
}
