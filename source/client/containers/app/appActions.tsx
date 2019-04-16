import * as Types from './appTypes';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    initializeApplication?: typeof initializeApplication;
    setUser?: typeof setUser;
    performLogout?: typeof performLogout;
    logoutUser?: typeof logoutUser;
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

export const setUser = (username) => {
    sessionStorage.setItem('username', username);
    return ({
        type: Types.SET_USER,
        payload: {
            username
        }
    });
};

export const performLogout = () => {
    return ({
        type: Types.PERFORM_LOGOUT,
    });
};

type ThunkActionType = ThunkAction<Promise<void>, {}, {}, AnyAction>;

// Performs the AJAX request to the server for POSTing the login information.
export const logoutUser = (): ThunkActionType => {
        return (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
                return new Promise<void>((resolve: any) => {
                    sessionStorage.removeItem('username');
                    dispatch(performLogout());
                    return resolve();
                });
            };
};
