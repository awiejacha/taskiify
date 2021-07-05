import PresentableError from './PresentableError';

export default class TaskNotAssignableError extends PresentableError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = TaskNotAssignableError.name;
  }
}
