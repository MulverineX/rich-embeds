const { getModule, React } = require('powercord/webpack');


module.exports = class EmbedRenderer extends React.Component {
  constructor (props) { super(props); this.state = { } }

  static getDerivedStateFromProps (props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    return (<div className='re-audio-player'>
      <h2>{this.props.file_name.replace(/\_(?!(\_))/g, ' ')}</h2>
      { `${this.props.ext}@${this.props.format}` }
    </div>);
  }
}