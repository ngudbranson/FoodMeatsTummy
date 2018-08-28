import React from 'react';
import Typed from 'typed.js';

class TypedOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var typed = new Typed('#typed', this.props.options);
  }

  render() {
    return (
      <span/>
    );
  }
}

export default TypedOut;