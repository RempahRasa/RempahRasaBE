import path from "path";

class VerificationResponseError extends Error {
    status: number;
    pathFile: string;
    constructor(status: number, messsage: string, pathFile: string) {
      super(messsage);
      this.status = status;
      this.pathFile = pathFile;
    }
  }
  
  export { VerificationResponseError };
  