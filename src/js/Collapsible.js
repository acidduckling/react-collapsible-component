import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.panelHeight = React.createRef();
  }

  handleToggle(e) {
    e.preventDefault();
    //console.log(this.panelHeight.current.clientHeight);

    this.setState({
      isExpanded: !this.state.isExpanded,
      height: this.panelHeight.current.clientHeight
    });
  }

  render() {
    const { title, children } = this.props;
    const { isExpanded, height } = this.state;
    const currentHeight = isExpanded ? height : 0;
    return (
      <div
        className={`panel ${isExpanded ? 'is-expanded' : ''}`}
        onClick={e => this.handleToggle(e)}
      >
        <div className="panel-heading">
          <h2>{title}</h2>
        </div>
        <div className="panel-collapse" style={{ height: currentHeight + 'px'}}>
          <div className="panel-body" ref={this.panelHeight}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string
};

export default Collapsible;
