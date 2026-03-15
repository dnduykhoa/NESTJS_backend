export class ApiResponse<T = any> {
  message: string;
  data: T | null;

  constructor(message: string, data: T | null = null) {
    this.message = message;
    this.data = data;
  }
}
