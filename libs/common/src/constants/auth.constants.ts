export namespace Auth {
  export const SERVICE_NAME = 'AUTH_SERVICE';

  export namespace EnvKey {
    export const SERVICE_HOST = 'AUTH_SERVICE_HOST';
    export const SERVICE_PORT = 'AUTH_SERVICE_PORT';
  }

  export namespace Event {
    export const USER_CREATE = 'auth.user.create';
    export const USER_UPDATE = 'auth.user.create';
    export const USER_DELETE = 'auth.user.create';
    export const USER_LOGIN = 'auth.user.login';
    export const USER_LOGOUT = 'auth.user.logout';
    export const USER_VERIFY = 'auth.user.verify';
    export const USER_REFRESH = 'auth.user.refresh';
  }
}
