const { getModule, React } = require('powercord/webpack');

const mime = require('mime-types');

const Curseforge = require('./sites/Curseforge');


module.exports = class RichEmbed extends React.Component {
  constructor(props) { super(props); this.state = { content: (<></>)} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    content = (<span>{this.props.link}</span>);

    console.log(this.state.content);

    return this.state.content;
  }
};
