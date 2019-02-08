import * as Types from './workstationTypes';

/********** List of Actions for Dispatch Props **********/
export interface DispatchProps {
    volumeChange?,
    toggleEffect?,
    createSound?
}

/********** Action Creators for the Synchronous Typed Actions **********/
export const volumeChange = (volume: number) => {
    return ({
        type: Types.VOLUME_CHANGE,
        volume: volume
    });
};

export const toggleEffect = (effect: string) => {
	return ({
        type: Types.TOGGLE_EFFECT,
        effect: effect
	});
}

export const createSound = (url: string) => {
    return ({
        type: Types.CREATE_SOUND,
        url: url
    });
}

/********** Action Creators for Asynchronous Typed Actions **********/
