class CustomError extends Error {
  constructor(status, message) {
    super(message); // 반드시 호출
    this.status = status;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CustomError };
