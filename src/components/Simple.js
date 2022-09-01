import React, { Component } from 'react'
import Annotation from 'react-image-annotation'

export default class Simple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src_image: props.src_image,
      annotations: props.markers,
      annotation: {}
    }
  }

  onChange = (annotation) => {
    this.setState({ annotation });
  }

  onSubmit = (annotation) => {
    const { geometry, data } = annotation;

    this.setState({
      annotation: {},
      annotations: this.state.annotations.concat({
        geometry,
        data: {
          ...data,
          id: Math.random()
        }
      })
    });

    console.log(this.state.annotations);
  }

  render () {
    return (
      <Annotation
        src={this.props.src_image}
        alt='Two pebbles anthropomorphized holding hands'

        annotations={this.state.annotations}

        type={this.state.type}
        value={this.state.annotation}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        allowTouch
      />
    )
  }
}
