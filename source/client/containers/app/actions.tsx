export const APPLICATION_INITIALIZED = 'APPLICATION_INITIALIZED';

export function initializeApplication () {
    return ({
        type: APPLICATION_INITIALIZED,
    });
}