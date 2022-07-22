export class Response {
  public status: Number;
  public data: any;
  public message: string;
  constructor(status: Number, data?: any) {
    this.status = status;
    this.data = data || [];
    this.message = "";
  }
  setMsg(message: string) {
    this.message = message;
    return this;
  }
}
