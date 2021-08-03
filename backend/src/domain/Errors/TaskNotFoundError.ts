import PresentableError from './PresentableError';

export default class TaskNotFoundError extends PresentableError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = TaskNotFoundError.name;
  }
}
