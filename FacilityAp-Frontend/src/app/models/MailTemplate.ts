export class MailTemplate {
  [x: string]: string;
  constructor(
    public id?: string,
    public firmName?: string,
    public body?: string,
    public hyperlink?: string,
    public signature?: string
  ) {}
}
