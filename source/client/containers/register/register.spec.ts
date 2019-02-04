import * as Types from './registerTypes';
import * as Register from './register';
import { initialRegisterState } from './registerReducer';

// Constants to be used globally, like the Application
let registerComponent: React.Component<Register.RegisterProps>;

describe('Register Unit Tests', () => {
    beforeEach(() => {
        // Construct the Application
        registerComponent = new Register.default(initialRegisterState);
    });

    describe('Existence Tests', () => {

        test('Trying to create a register component?', () => {
            expect(registerComponent).toBeDefined();
        });

        test('Testing the initial state for proper construction', () => {
            expect(registerComponent.props).toEqual(initialRegisterState);
        });
    });
});
