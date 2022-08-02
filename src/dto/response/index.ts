export class Response {
  public status: number;
  public response: any;
  public message: string;
  constructor(status: number, data?: any) {
    this.status = status;
    this.response = data || [];
    this.message = "";
  }
  setMsg(message: string) {
    this.message = message;
    return this;
  }
}
