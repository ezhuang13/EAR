import * as Types from './loginTypes';
import login, * as Login from './login';
import { initialLoginState } from './loginReducer';

// Constants to be used globally, like the Application
let loginComponent: React.Component<Login.LoginProps>;

describe('Login Unit Tests', () => {
    beforeEach(() => {
        // Construct the Application
        loginComponent = new Login.default(initialLoginState);
    });

    describe('Existence Tests', () => {

        test('Trying to create a login component?', () => {
            expect(loginComponent).toBeDefined();
        });

        test('Testing the initial state for proper construction', () => {
            expect(loginComponent.props).toEqual(initialLoginState);
        });
    });
});
