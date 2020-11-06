const { getModule, React } = require('powercord/webpack');

const mime = require('../node_modules/mime-types');

const AudioPlayer = require('./AudioPlayer');

module.exports = class EmbedRenderer extends React.Component {
  constructor (props) { super(props); this.state = {} }

  static getDerivedStateFromProps (props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  async componentDidUpdate () { 
    if (!_.isEqual(this.props.message.content, this.state.message.content)) 
      await this.buildEmbeds();
  }

  async componentDidMount () { await this.buildEmbeds() }

  async buildEmbeds () {
    let content = [...this.props.content];
    
    /* Find Links & Setup Embeds */
    if (content.length !== 0) for (const [i, e] of content.entries()) { if (e && e.props && e.props.href) {
      console.log(e);
    }}

    if (this.props.message.attachments.length !== 0) for (const attachment of this.props.message.attachments) {
      const proxy_url = attachment.proxy_url.split('/');

      const mime_type = mime.lookup(proxy_url[6]).split('/');
      const file_name = _.takeRight(proxy_url, 1)[0].split('.');


      if (mime_type[0] === 'audio') content.push(<AudioPlayer {...{
        format: mime_type[1],
        ext: file_name.slice(-1)[0],
        src: attachment.proxy_url,
        file_name: file_name.slice(0,-1).join('.')
      }} />)
    }

    console.log(content);

    this.setState({ content: content });
  }

  render = () => <>{this.state.content}</>
};
