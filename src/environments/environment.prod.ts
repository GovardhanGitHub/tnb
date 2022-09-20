export const environment = {


  production: true,
  defaultauth: 'tn',
  baseURL: window['env']['backendBaseUrl'] || 'http://localhost:8080',


  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
