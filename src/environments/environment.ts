// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCAEPlxnWs9iw-bJZ4cX04C9J8F69QknbE',
    authDomain: 'classroot-tech.firebaseapp.com',
    databaseURL: 'https://classroot-tech.firebaseio.com',
    projectId: 'classroot-tech',
    storageBucket: 'classroot-tech.appspot.com',
    messagingSenderId: '459289276534'
  }
};
