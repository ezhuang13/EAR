// Importing the validation stuff
import * as Joi from 'joi-browser';

// Import the different Form Types
import * as LoginTypes from '../containers/login/loginTypes';
import * as RegisterTypes from '../containers/register/registerTypes';

export const LoginSchemaOptions = {
    username: {
        min: 3,
        max: 10,
    },
    password: {
        min: 5,
        max: 14
    }
};

export const LoginSchemaJoi = Joi.object().keys({
    username: Joi
        .string()
        .required()
        .trim()
        .alphanum()
        .min(LoginSchemaOptions.username.min)
        .max(LoginSchemaOptions.username.max)
        .error((errors: any) => errors),
    password: Joi
        .string()
        .required()
        .trim()
        .min(LoginSchemaOptions.password.min)
        .max(LoginSchemaOptions.password.max)
        .error((errors: any) => errors)
});

export const RegisterSchemaOptions = {
    username: {
        min: 3,
        max: 10
    },
    password: {
        min: 5,
        max: 14
    },
    firstName: {
        min: 1,
        max: 20
    },
    lastName: {
        min: 1,
        max: 20
    },
    emailAddress: {
        min: 5,
        max: 50
    }
};

export const RegisterSchemaJoi = {
    username: Joi
        .string()
        .required()
        .min(RegisterSchemaOptions.username.min)
        .max(RegisterSchemaOptions.username.max)
        .error((errors: any) => errors),
    password: Joi
        .string()
        .required()
        .min(RegisterSchemaOptions.password.min)
        .max(RegisterSchemaOptions.password.max)
        .error((errors: any) => errors),
    firstName: Joi
        .string()
        .required()
        .min(RegisterSchemaOptions.firstName.min)
        .max(RegisterSchemaOptions.firstName.max)
        .error((errors: any) => errors),
    lastName: Joi
        .string()
        .required()
        .min(RegisterSchemaOptions.lastName.min)
        .max(RegisterSchemaOptions.lastName.max)
        .error((errors: any) => errors),
    emailAddress: Joi
        .string()
        .required()
        .min(RegisterSchemaOptions.emailAddress.min)
        .max(RegisterSchemaOptions.emailAddress.max)
        .error((errors: any) => errors)
}

export const mapError = (errorType: string, errorParam: string, errorLimit: number | string) => {
    let mappedError = errorParam;
    if (errorType === 'any.empty') {
        mappedError += ' is required, shouldn\'t be empty.';
    } else if (errorType === 'string.min') {
        mappedError += ' is too short, the minimum length is ' + errorLimit + ' characters.';
    } else if (errorType === 'string.max') {
        mappedError += ' is too long, the maximum length is ' + errorLimit + ' characters.';
    } else if (errorType === 'string.alphanum') {
        mappedError += ' is not alphanumeric, should only be alphabetic or numerical characters.';
    } else {
        mappedError += ' has an error that hasn\'t been accounted for yet.';
    }

    return mappedError;
};

type ValidationInfo = LoginTypes.LoginInformation | RegisterTypes.RegisterInformation;
export const performValidation = (validationInfo: ValidationInfo, infoType: string) => {

    let theResult: any;
    switch (infoType) {
        case 'Login':
            theResult = Joi.validate(validationInfo, LoginSchemaJoi);
            break;
        case 'Register':
            theResult = Joi.validate(validationInfo, RegisterSchemaJoi);
            break;
        default:
            break;
    }

    if (theResult && theResult.error) {
        const theError = theResult.error;
        const errorLimit = theError.details[0].context.limit ?
                            theError.details[0].context.limit : '';

        // Crafting a proper error message
        const errorPath = theError.details[0].path[0];
        const actualPath = errorPath.charAt(0).toUpperCase() + errorPath.slice(1);
        const errorType = theError.details[0].type;

        // Perform error mapping, generating custom messages for each particular failed input
        const mappedError = mapError(errorType, actualPath, errorLimit);
        return {
            mappedError,
            error: 'exists!'
        };
    } else {
        return {
            error: null
        };
    }
};
