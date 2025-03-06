import { Base } from "./_base/Base";

export class Client extends Base {
  constructor(public name: string, public email: string, public phone: string) {
    super();
  }

  changeName(newName: string) {
    this.name = newName;
  }

  changeEmail(newEmail: string) {
    this.email = newEmail;
  }

  chagePhone(newPhone: string) {
    this.phone = newPhone;
  }
}
