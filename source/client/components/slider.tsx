import * as React from 'react';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

interface HandleProps {
  className: string;
  disabled: boolean;
  dragging: boolean;
  index: number;
  max: number;
  min: number;
  offset: number;
  prefixCls: string;
  value: number;
  vertical: boolean;
}

// Enables handle to show values when sliding
const Handle = Slider.Handle;
const handle = (props: HandleProps) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls='rc-slider-tooltip'
      overlay={value}
      visible={dragging}
      placement='top'
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

interface SliderProps {
    min: number;
    max: number;
    defaultValue: number;
    step: number;
    label: string;
    marks?: any;
    onAfterChange(value: number, label: string): void;
}

interface SliderState {}

class MusicSlider extends React.Component<SliderProps, SliderState> {
    onAfterChange: (value: number) => void;

    constructor(props: SliderProps) {
        super(props);

        this.onAfterChange = (value: number) => this.props.onAfterChange(value, this.props.label);
    }

    render() {
      const wrapperStyle = { width: '9em', margin: '0.5em' };
      const marks = this.props.marks ? this.props.marks :
      { [this.props.min]: this.props.min, [this.props.max]: this.props.max };

      return (
        <div style={wrapperStyle}>
          <p>{this.props.label}</p>
          <Slider
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            defaultValue={this.props.defaultValue}
            handle={handle}
            marks={marks}
            onAfterChange={this.onAfterChange}
          />
        </div>
        );
    }
}

export default MusicSlider;
