export class ApiError extends Error {
  constructor(errors) {
    super();

    this.errors = errors.errors || errors;
  }
}
