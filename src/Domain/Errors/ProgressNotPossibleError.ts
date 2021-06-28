import PresentableError from './PresentableError';

export default class ProgressNotPossibleError extends PresentableError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = ProgressNotPossibleError.name;
  }
}
