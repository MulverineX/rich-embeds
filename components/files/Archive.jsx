const { getModule, React } = require('powercord/webpack');


module.exports = class RichFileArchive extends React.Component {
  constructor (props) { super(props); this.state = { } }

  static getDerivedStateFromProps (props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    return <></>;
  }
}