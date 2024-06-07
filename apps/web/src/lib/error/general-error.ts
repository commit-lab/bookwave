export class GeneralError extends Error {
  name: string;
  constructor(message: string) {
    super(message);
    this.name = "GeneralError";

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, GeneralError.prototype);
  }

  getUserFacingErrorMessage() {
    return `Something went wrong: ${this.message}`;
  }
}
