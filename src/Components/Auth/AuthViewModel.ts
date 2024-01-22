// AuthViewModel.ts
import { makeObservable, action, computed } from 'mobx';
import authModel, { IProfile } from './AuthModel';
import { fetchProfileData, login, register, setAuthDefaultPayload } from './AuthDataProvider';
import Cookies from 'js-cookie';

class AuthViewModel {
    constructor() {
        makeObservable(this, {
            profile: computed,
            token: computed,
            loggingIn: computed,
            Userlogin: action,
            UserRegister: action,
            logoutHandler: action
        });
    }

    get profile(): IProfile | null {
        return authModel.profile;
    }

    get loggingIn(): boolean {
        return authModel.token ? true : false;
    }
    get token(): string | undefined {
        return authModel.token;
    }
    async Userlogin(credentials: any) {
        try {
            const data = await login('/auth/login', credentials);
            Cookies.set('authToken', data.token, { expires: 7 });
            return data.token;  // Return the token
        } catch (error) {
            console.error("Login failed:", error);
            throw error;  // Propagate the error
        }
    }

    async UserRegister(credentials: any) {
        try {
            const data = await register('/users', credentials);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;  // Propagate the error
        }
    }
    async logoutHandler() {
        authModel.token = undefined;
        Cookies.remove('authToken');
        return this.loggingIn ? false : true;
    };

    async fetchProfile(authToken?: string) {
        try {
            const data = await fetchProfileData('/users/1', authToken);
            console.log(data);
            authModel.setProfile(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

}

const authViewModel = new AuthViewModel();
export default authViewModel;
