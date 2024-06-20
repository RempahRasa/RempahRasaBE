class ResponseError extends Error {
  status: number;
  constructor(status: number, messsage: string) {
    super(messsage);
    this.status = status;
  }
}

export { ResponseError };
