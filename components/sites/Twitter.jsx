const { React } = require('powercord/webpack');

module.exports = class RichSiteTwitter extends React.Component {
  constructor(props) { super(props); this.state = {} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  async render() {
    return <></>;
  }
};
