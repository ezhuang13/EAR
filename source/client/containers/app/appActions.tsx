import * as Types from './appTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeApplication
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const initializeApplication = () => {
    return ({
        type: Types.APPLICATION_INITIALIZED,
        payload: {
            appInitialized: true
        }
    });
};
