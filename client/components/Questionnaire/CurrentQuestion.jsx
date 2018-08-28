import React from 'react';

class CurrentQuestion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.current >= this.props.rating.value) {
      return (
        <div>
          <img src="/images/done.png"/>
        </div>
      );
    }
    return (
      <div>
        <img src="/images/not_done.png"/>
      </div>
    )
  }
}

export default CurrentQuestion;