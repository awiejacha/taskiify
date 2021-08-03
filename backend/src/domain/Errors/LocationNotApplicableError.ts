import PresentableError from './PresentableError';

export default class LocationNotApplicableError extends PresentableError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = LocationNotApplicableError.name;
  }
}
