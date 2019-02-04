import * as Types from './appTypes';
import * as App from './app';
import { initialAppState, AppState } from './appReducer';

// Constants to be used globally, like the Application
let ourApplication: React.Component<App.AppProps, AppState>;

describe('Application Unit Tests', () => {
    beforeEach(() => {
        // Construct the Application
        ourApplication = new App.default(initialAppState);
    });

    describe('Existence Tests', () => {

        test('Trying to create an application?', () => {
            expect(ourApplication).toBeDefined();
        });

        test('Testing the initial state for proper construction', () => {
            expect(ourApplication.props).toEqual(initialAppState);
        });
    });
});
