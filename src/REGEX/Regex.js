//User can consist of lower, upper, numbers and underscores
export const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
//password must contain one lwoer case, one upper case, one number, one symbol and must be 8-24 long
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;