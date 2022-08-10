export class Response {
  public status: number;
  public response: any;
  public message: string;
  public page: number | string;
  public size: number | string;
  constructor(status: number, data?: any) {
    this.status = status;
    this.response = data || [];
    this.message = "";
    this.page = 1;
    this.size = 10;
  }
  setMsg(message: string) {
    this.message = message;
    return this;
  }
  setPaginationObject(page: string | number, size: string | number) {
    this.page = page || 1;
    this.size = size || 10;
    return this;
  }
}
