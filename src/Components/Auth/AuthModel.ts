// AuthModel.ts
import Cookies from 'js-cookie';
import { makeObservable, action, observable } from 'mobx';
export interface IName {
  firstname: string;
  lastname: string;
}
export interface IAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}
export interface IProfile {
  id: number;
  email: string;
  username: string;
  password: string;
  name: IName;
  address: IAddress;
  phone: string;
}

class AuthStore {
  token: string | undefined = Cookies.get('authToken');
  profile: IProfile | null = null;
  constructor() {
    makeObservable(this, {
      token: observable,
      profile: observable,
      setProfile: action
    });
  }
  setProfile(profile: IProfile) {
    this.profile = profile;
  }
}

const authModel = new AuthStore();
export default authModel;
