export type ErrorPresentation = {
  errorMessage: string;
};

export default abstract class PresentableError extends Error {
  protected constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = PresentableError.name;
  }

  toPresentation(): ErrorPresentation {
    return {
      errorMessage: this.message,
    };
  }
}
