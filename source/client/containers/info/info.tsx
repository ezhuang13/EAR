import * as React from 'react';

// Just a reference page for users. Contains static HTML
const Info = (props: any) => {
    return (
        <React.Fragment>
            <div>Effects (from PizzicatoJS library):</div>
                <ul>
                <li>Compressor:
                <p>A compressor allows reducing the range between the loudest and the quietest parts of a
                    sound. This is done by boosting the quiet segments and attenuating the loud ones.</p>
                <p>The following options are available when creating a compressor effect:</p>
                <ul>
                <li><code>threshold</code>&nbsp;<em>(min: -100, max: 0, defaults to -24)</em>: The decibel
                value above which the compression will start taking effect.</li>
                <li><code>knee</code>&nbsp;<em>(min: 0, max: 40, defaults to 30)</em>: A value representing
                the range above the threshold where the curve smoothly transitions to the "ratio" portion.</li>
                <li><code>attack</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.003)</em>: How soon the
                compressor starts to compress the dynamics after the threshold is exceeded. Short values will
                result in a fast response to sudden, loud sounds, but will make the changes in volume more
                obvious to listeners.</li>
                <li><code>release</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.025)</em>: How soon the
                compressor starts to release the volume level back to normal after the level drops below the
                threshold.</li>
                <li><code>ratio</code>&nbsp;<em>(min: 1, max: 20, defaults to 12)</em>: The amount of
                compression applied to the audio once it passes the threshold level. The higher the Ratio the
                more the loud parts of the audio will be compressed.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output.</li>
                </ul>
                </li>
                <li>Delay:
                <p>The delay effect plays back the sound a certain number of times in defined intervals,
                    giving the impression of an echo. The following options are available when creating a
                    delay effect:</p>
                <ul>
                <li><code>feedback</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: The intensity
                with which the input will echo back. A larger value will result in more echo repetitions.</li>
                <li><code>time</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.3)</em>: Interval time in seconds.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume
                balance between the original audio and the effected output (the delayed sound).</li>
                </ul>
                </li>
                <li>Distortion:
                <p>The distortion effect adds a basic "override" to the sound. The distortion effect only
                    takes one parameter:</p>
                <ul>
                <li><code>gain</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Amount of distortion
                applied.</li>
                </ul>
                </li>
                <li>Dub:
                <p>The dub delay effect is similar to a regular Delay effect, however on each feedback loop
                    the output is routed through a biquad filter.</p>
                <p>The following options are available when creating a delay effect:</p>
                <ul>
                <li><code>feedback</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: The intensity with
                which the input will echo back. A larger value will result in more echo repetitions.</li>
                <li><code>time</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.3)</em>: Interval time in seconds.</li>
                <li><code>cutoff</code>&nbsp;<em>(min: 0, max: 4000, defaults to 700)</em>: Frequency value
                applied to each successive loop. The lower the value, the more different each repetition will
                be perceived.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output (the delayed sound).</li>
                </ul>
                </li>
                <li>Flanger:
                <p>The flanger produces a swirling effect by delaying a "copy" of the sound by a small,
                    gradually changing period. The flanger effect takes the following parameters:</p>
                <ul>
                <li><code>time</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.45)</em>: Changes the small
                delay time applied to the copied signal.</li>
                <li><code>speed</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.2)</em>: Changes the speed
                at which the flanging occurs.</li>
                <li><code>depth</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.1)</em>: Changes the
                depth/intensity of the swirling effect.</li>
                <li><code>feedback</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.1)</em>: Changes the volume
                of the delayed sound.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output.</li>
                </ul>
                </li>
                <li>Ping Pong:
                <p>The ping pong delay effect is similar to a regular Delay effect, however on each feedback
                    loop the output is swapped between left and right channels. The following options are
                    available when creating a delay effect:</p>
                <ul>
                <li><code>feedback</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: The intensity with
                which the input will echo back. A larger value will result in more echo repetitions.</li>
                <li><code>time</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.3)</em>: Interval time in seconds.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output (the delayed sound).</li>
                </ul>
                </li>
                <li>Quadrafuzz:
                <p>The quadrafuzz effect divides the sound into separate bands and then distorts each band
                    independently, allowing you to control which frequencies you distort and how much.</p>
                <p>The effect takes the following parameters:</p>
                <ul>
                <li><code>lowGain</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.6)</em>:</li>
                <li><code>midLowGain</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.8)</em>:</li>
                <li><code>midHighGain</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>:</li>
                <li><code>highGain</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.6)</em>:</li>
                </ul>
                </li>
                <li>Reverb:
                <p>The reverb effect is similar to the convolver effect in that it allows the sound to be
                    heard with a certain ressonance or repercussion. This simulates a particular physical
                    environment in which the sound could be played (e.g., an auditorium, a concert hall, etc).</p>
                <ul>
                <li><code>time</code>&nbsp;<em>(min: 0.0001, max: 10, defaults to 0.01)</em>: Duration of
                impulse, in seconds.</li>
                <li><code>decay</code>&nbsp;<em>(min: 0, max: 10, defaults to 0.01)</em>: The rate for the
                reflections of sound to fade away.</li>
                <li><code>reverse</code>&nbsp;<em>(boolean)</em>: Whether or not to reverse the impulse shape.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output.</li>
                </ul>
                </li>
                <li>Ring mod:
                <p>The ring modulator effect combines two input signals, where one of the inputs is a sine
                    wave modulating the other. The 'ring' in this effect derives from the layout of diode nodes
                    in the original analogue equipment, and also refers to the sound being increasingly modulated
                    as it travels through the ring of diodes.</p>
                <ul>
                <li><code>distortion</code>&nbsp;<em>(min: 0.2, max: 50, defaults to 1)</em>: Level of distortion
                applied to the diode nodes.</li>
                <li><code>speed</code>&nbsp;<em>(min: 0, max: 2000, defaults to 30)</em>: The frequency of the
                modulating signal.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between the
                original audio and the effected output.</li>
                </ul>
                </li>
                <li>Stereo Panner:
                <p>The stereo panner is used to adjust the level of a sound through the left and right speakers.
                    A&nbsp;<code>-1</code>&nbsp;value will channel all the sound through the left speaker, whereas
                    a&nbsp;<code>1</code>&nbsp;value will do so through the right speaker.</p>
                <ul>
                <li><code>pan</code>&nbsp;<em>(min: -1, max: 1, defaults to 0)</em>: Pan value between -1
                (full left pan) and 1 (full right pan).</li>
                </ul>
                </li>
                <li>Tremolo:
                <p>The tremolo effect changes the volume of the sound over time. The outcome would be similar
                    as if you turned the volume node up and down periodically.</p>
                <ul>
                <li><code>speed</code>&nbsp;<em>(min: 0, max: 20, defaults to 4)</em>: The speed at which the
                volume will change.</li>
                <li><code>depth</code>&nbsp;<em>(min: 0, max: 1, defaults to 1)</em>: The intensity of
                the volume change.</li>
                <li><code>mix</code>&nbsp;<em>(min: 0, max: 1, defaults to 0.5)</em>: Volume balance between
                the original audio and the effected output.</li>
                </ul>
                </li>
                </ul>
        </React.Fragment>
    );
};

export default Info;
