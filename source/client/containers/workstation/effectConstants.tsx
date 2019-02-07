/*** Names for effects ***/
export const COMPRESSOR = "COMPRESSOR";
export const DELAY = "DELAY";
export const DISTORTION = "DISTORTION";
export const DUB = "DUB";
export const FLANGER = "FLANGER";
export const PING_PONG = "PING_PONG";
export const QUADRAFUZZ = "QUADRAFUZZ";
export const REVERB = "REVERB";
export const RING_MOD = "RING_MOD";
export const STEREO_PANNER = "STEREO_PANNER";
export const TREMOLO = "TREMOLO";

/*** For configuring slider options (not currently being used) ***/
export const TREMOLO_OPTIONS = {
	        	speed: {
	        		min: 0,
	        		max: 20,
	        		default: 4
	        	},
	        	depth: {
	        		min: 0,
	        		max: 1,
	        		default: 1
	        	},
	        	mix: {
	        		min: 0,
	        		max: 1,
	        		default: .5
	        	}
        	};

export const RING_MOD_OPTIONS = {
	        	speed: {
        			min: 0,
        			max: 2000,
        			default: 30
        		},
        		distortion: {
        			min: 0.2,
        			max: 50,
        			default: 1
        		},
        		mix: {
        			min: 0,
        			max: 1,
        			default: .5
        		}
			};