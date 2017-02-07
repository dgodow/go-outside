import React, {Component} from 'react';
import * as d3 from 'd3';
import { arc } from 'd3-shape';

export default class Slice extends Component {
  render() {
    const {value, fill, innerRadius, outerRadius} = this.props;

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    return (
      <path d={arc(value)} fill={fill} />
    );
  }
}