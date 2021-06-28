import PresentableError from './PresentableError';

export default class RegressNotPossibleError extends PresentableError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = RegressNotPossibleError.name;
  }
}
