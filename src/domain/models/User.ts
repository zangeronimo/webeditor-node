export default class User {
  private Name: string;
  private Email: string;

  constructor(name: string, email: string) {
    this.Name = name;
    this.Email = email;
  }

  public getName = () => this.Name;
  public getEmail = () => this.Email;
}