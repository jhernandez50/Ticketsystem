import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
  setUser({_id,fullname,userType}){
    localStorage.setItem('user_id',_id)
    localStorage.setItem('full_name',fullname)
    localStorage.setItem('user_type',userType)
    if(userType==="admin"){
      window.location.assign('/dashboard');
    }
    else{
      window.location.assign('/');
    }
    
  }
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
};

export default new AuthService();
