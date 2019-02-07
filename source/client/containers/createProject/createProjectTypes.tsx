/********** Describe the Action Types in Strings **********/
export const SET_AUDIO = 'SET_AUDIO';

/********** Interfaces for the Actions Creators **********/
interface SetAudio {
    type: typeof SET_AUDIO;
    url: string;
}

/********** Interfaces for Objects in the CreateProject Component**********/

/********** Combination of all Redux Actions **********/
export type CreateProjectActionTypes = SetAudio;
