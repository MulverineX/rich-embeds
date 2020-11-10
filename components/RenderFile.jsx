const { getModule, React } = require('powercord/webpack');

const mime = require('mime-types');

const Archive = require('./files/Archive'),
      Audio =   require('./files/Audio'),
      Vector =  require('./files/Vector');

module.exports = class RichFile extends React.Component {
  constructor(props) { super(props); this.state = {} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    const proxy_url = this.props.embed.proxy_url.split('/');

    const mime_type = mime.lookup(proxy_url[6]).split('/');
    const file_name = _.takeRight(proxy_url, 1)[0].split('.');


    if (mime_type[0] === 'audio') return (<Audio {...{
      format: mime_type[1],
      ext: file_name.slice(-1)[0],
      src: this.props.embed.proxy_url,
      file_name: file_name.slice(0, -1).join('.')
    }} />);
    else return this.state.content;
  }
};
