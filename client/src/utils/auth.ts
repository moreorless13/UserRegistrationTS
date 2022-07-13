import decode from 'jwt-decode'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class AuthService {
    getUser() {
        return decode(this.getToken())
    }
    loggedIn() {
        const token = this.getToken()
        return token && !this.isTokenExpired(token) ? true : false;
    }
    isTokenExpired(token: any) {
        const decoded: any = decode(token)
        try {
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('id_token')
                cookies.remove('id_token')
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error)
            return false;
        }
    }
    getToken() {
        let token = localStorage.getItem('id_token') || cookies.get('id_token')
        return token 
    }
    login(token: any) {
        cookies.set('id_token', token)
        localStorage.setItem('id_token', token);
        window.location.assign('/');
    }
    logout() {
        cookies.remove('id_token')
        localStorage.removeItem('id_token');
        window.location.assign('/')
    }
}

export default new AuthService();