class AuthServices {
  getToken: () => string | null;
  constructor() {
    this.getToken = () => {
      return localStorage.getItem('token');
    };
  }
}

export default AuthServices;
