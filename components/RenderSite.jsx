const { getModule, React } = require('powercord/webpack');

const mime = require('mime-types');

const FourChan =   require('./sites/FourChan'),
      Github =     require('./sites/Github'),
      Reddit =     require('./sites/Reddit'),
      Streamable = require('./sites/Streamable'),
      Twitch =     require('./sites/Twitch'),
      Twitter =    require('./sites/Twitter');


module.exports = class RichEdited extends React.Component {
  constructor(props) { super(props); this.state = {} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    return this.state.content;
  }
};
