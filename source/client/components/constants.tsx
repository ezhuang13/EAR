/***** This is where general application constants go! *****/
export const USERNAME = 'Username';
export const PASSWORD = 'Password';
export const EMAIL = 'Email';

/***** This is where form fields for dynamically generated forms go! *****/
export const RegisterFields = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    [USERNAME]: 'username',
    [EMAIL]: 'emailAddress',
    [PASSWORD]: 'password',
};

export const LoginFields = {
    [USERNAME]: 'username',
    [PASSWORD]: 'password',
};
