/***** This is where general application constants go! *****/
export const USERNAME = 'Username';
export const PASSWORD = 'Password';
export const EMAIL = 'Email';

/***** This is where form fields for dynamically generated forms go! *****/
export const RegisterFields = {
    'First Name': 'first_name',
    'Last Name': 'last_name',
    [USERNAME]: 'username',
    [EMAIL]: 'email_address',
    [PASSWORD]: 'password',
};

export const LoginFields = {
    [USERNAME]: 'username',
    [PASSWORD]: 'password',
};
