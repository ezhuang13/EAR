/*** Names for effects ***/
export const COMPRESSOR = 'COMPRESSOR';
export const DELAY = 'DELAY';
export const DISTORTION = 'DISTORTION';
export const DUB = 'DUB';
export const FLANGER = 'FLANGER';
export const PING_PONG = 'PING_PONG';
export const QUADRAFUZZ = 'QUADRAFUZZ';
export const REVERB = 'REVERB';
export const RING_MOD = 'RING_MOD';
export const STEREO_PANNER = 'STEREO_PANNER';
export const TREMOLO = 'TREMOLO';
export const EffectList = [COMPRESSOR, DELAY, DISTORTION, DUB, FLANGER, PING_PONG,
                            QUADRAFUZZ, REVERB, RING_MOD, STEREO_PANNER, TREMOLO];

/*** Props for effect customization sliders ***/
// Options for sliders
const attack = {
    label: 'Attack',
    min: 0,
    max: 1,
    defaultValue: .003,
    step: .001,
};

const cutoff = {
    label: 'Cutoff',
    min: 0,
    max: 4000,
    defaultValue: 700,
    step: 10,
};

const decay = {
    label: 'Decay',
    min: 0,
    max: 10,
    defaultValue: .01,
    step: .01,
};

const depthFlanger = {
    label: 'Depth',
    min: 0,
    max: 1,
    defaultValue: .1,
    step: .1,
};

const depthTremolo = {
    label: 'Depth',
    min: 0,
    max: 1,
    defaultValue: 1,
    step: .1,
};

const distortion = {
    label: 'Distortion',
    min: 1,
    max: 50,
    defaultValue: 1,
    step: 1,
};

const feedback = {
    label: 'Feedback',
    min: 0,
    max: 1,
    defaultValue: .5,
    step: .1,
};

const highGain = {
    label: 'High Gain',
    min: 0,
    max: 1,
    defaultValue: .6,
    step: .1,
};

const gain = {
    label: 'Gain',
    min: 0,
    max: 1,
    defaultValue: .5,
    step: .1,
};

const knee = {
    label: 'Knee',
    min: 0,
    max: 40,
    defaultValue: 30,
    step: 1,
};

const lowGain = {
    label: 'Low Gain',
    min: 0,
    max: 1,
    defaultValue: .6,
    step: .1,
};

const midLowGain = {
    label: 'Mid-Low Gain',
    min: 0,
    max: 1,
    defaultValue: .8,
    step: .1,
};

const midHighGain = {
    label: 'Mid-High Gain',
    min: 0,
    max: 1,
    defaultValue: .5,
    step: .1,
};

const mix = {
    label: 'Mix',
    min: 0,
    max: 1,
    defaultValue: .5,
    step: .1,
};

const pan = {
    label: 'Pan',
    min: -1,
    max: 1,
    defaultValue: 0,
    step: .1,
};

const ratio = {
    label: 'Ratio',
    min: 1,
    max: 20,
    defaultValue: 12,
    step: 1,
};

const release = {
    label: 'Release',
    min: 0,
    max: 1,
    defaultValue: .025,
    step: .025,
};

const speedFlanger = {
    label: 'Speed',
    min: 0,
    max: 1,
    defaultValue: .2,
    step: .1,
};

const speedRingMod = {
    label: 'Speed',
    min: 0,
    max: 2000,
    defaultValue: 30,
    step: 10,
};

const speedTremolo = {
    label: 'Speed',
    min: 0,
    max: 20,
    defaultValue: 4,
    step: 1,
};

const threshold = {
    label: 'Threshhold',
    min: -100,
    max: 0,
    defaultValue: -24,
    step: 1,
};

const time = {
    label: 'Time',
    min: 0,
    max: 1,
    defaultValue: .3,
    step: .1,
};

const timeFlanger = {
    label: 'Time',
    min: .01,
    max: 1,
    defaultValue: .45,
    step: .01,
};

const timeReverb = {
    label: 'Time',
    min: .01,
    max: 1,
    defaultValue: .01,
    step: .01,
};

export const optionLabelToParam = {
    'Attack': 'attack',
    'Cutoff': 'cutoff',
    'Decay': 'decay',
    'Depth': 'depth',
    'Distortion': 'distortion',
    'Feedback': 'feedback',
    'High Gain': 'highGain',
    'Gain': 'gain',
    'Knee': 'knee',
    'Low Gain': 'lowGain',
    'Mid-Low Gain': 'midLowGain',
    'Mid-High Gain': 'midHighGain',
    'Mix': 'mix',
    'Pan': 'pan',
    'Ratio': 'ratio',
    'Release': 'release',
    'Speed': 'speed',
    'Threshold': 'threshold',
    'Time': 'time',
};

// Constant for slider options:
// Key into the specific effect, generate a dynamic list of sliders based on props passed in.
// Each slider needs a min, max, step, default, and label
// (onAfterChange passed in by the parent component)
export const sliderOptions = {
    [COMPRESSOR]: [
        threshold,
        knee,
        attack,
        release,
        ratio,
        mix,
    ],
    [DELAY]: [
        feedback,
        time,
        mix,
    ],
    [DISTORTION]: [
        gain,
    ],
    [DUB]: [
        feedback,
        time,
        cutoff,
        mix,
    ],
    [FLANGER]: [
        timeFlanger,
        speedFlanger,
        depthFlanger,
        feedback,
        mix,
    ],
    [PING_PONG]: [
        feedback,
        time,
        mix,
    ],
    [QUADRAFUZZ]: [
        lowGain,
        midLowGain,
        midHighGain,
        highGain,
    ],
    [REVERB]: [
        timeReverb,
        decay,
        mix,
    ],
    [RING_MOD]: [
        distortion,
        speedRingMod,
        mix,
    ],
    [STEREO_PANNER]: [
        pan,
    ],
    [TREMOLO]: [
        speedTremolo,
        depthTremolo,
        mix,
    ],
};

export const toDisplayString = (effectName: string) => {
    const moddedName = effectName.replace('_', ' ').toLocaleLowerCase();
    const displayName = moddedName.charAt(0).toUpperCase() + moddedName.slice(1);
    return displayName;
};
