'use strict';
import React from 'react';
import LineGraph from './graphs/Line';
import { findDOMNode } from 'react-dom';

const data = require('../controllers/dummyData.json')

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 500
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const elem = findDOMNode(this);
    console.log(`updating dimensions: ${elem.offsetWidth} by ${elem.offsetHeight}`);
    this.setState({
      width: elem.offsetWidth,
      height: elem.offsetHeight
    });
  }

  onClickClose(e){
    this.props.setRoute(null)
  }

  render() {
    const {width, height} = this.state;
    return (
      <div id="graph-modal" className="content">
        <div className="modal-bar">
          <div className="modal-title">Graph</div>
          <div>
            <i className="fa fa-times" onClick={this.onClickClose.bind(this)}></i>
          </div>
        </div>
        <LineGraph db={data} width={width} height={height} label={'Words Per Minute'}/>
      </div>
    );
  }
}
