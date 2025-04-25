export class Result {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;

  private constructor(
    success: boolean,
    message: string,
    statusCode: number,
    data?: any,
  ) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  static success(data: any, message: string = 'Operation successful'): Result {
    return new Result(true, message, 200, data);
  }

  static error(message: string, statusCode: number): Result {
    return new Result(false, message, statusCode);
  }
}
