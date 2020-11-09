const { getModule, React } = require('powercord/webpack');

const mime = require('mime-types');

const FourChan =   require('./sites/FourChan'),
      Github =     require('./sites/Github'),
      Reddit =     require('./sites/Reddit'),
      Streamable = require('./sites/Streamable'),
      Twitch =     require('./sites/Twitch'),
      Twitter =    require('./sites/Twitter');


module.exports = class RichSite extends React.Component {
  constructor(props) { super(props); this.state = {} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  async render() {
    const proxy_url = this.props.embed.proxy_url.split('/');

    const mime_type = mime.lookup(proxy_url[6]).split('/');
    const file_name = _.takeRight(proxy_url, 1)[0].split('.');


    if (mime_type[0] === 'audio') return (<AudioPlayer {...{
      format: mime_type[1],
      ext: file_name.slice(-1)[0],
      src: this.props.embed.proxy_url,
      file_name: file_name.slice(0, -1).join('.')
    }} />);
  }
};