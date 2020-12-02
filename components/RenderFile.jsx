const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');

const { Tooltip } = require('powercord/components');

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
    if (!this.props.embed.height) {
      const Image = getModuleByDisplayName('LazyImageZoomable', false);

      const { filesize } = getModule(['numberFormat'], false);

      const Style = getModule([ 'systemMessageAccessories' ], false);

      const button = (title, run = false) => {return (
              <Tooltip position='top' text={title.charAt(0).toUpperCase() + title.slice(1)}>
                <div className={`re-toolbar-item${run ? ' re-clickable' : ''}`} onClick={run}>
                  <div className={`re-icon re-icon-${title}`}></div><div></div>
                </div>
              </Tooltip>
            )},
            proxy_url = (this.props.embed.proxy_url || '/unknown-file'),
            file_name = _.last(proxy_url.split('/')),
            mime_type = file_name.includes('.') ? 
              (() => {
                try { return mime.lookup(file_name)?.split('/') } 
                catch (e) { return false } }
              )() : false,
            file_size = filesize(this.props.embed.size);

      // for anyone wondering no, I'm not dumb, there will be more special casing like this later
      switch (_.last(file_name.split('.'))) {
        case 'zip': mime_type[0] = 'archive'; break;
      }

      return (<div className='re-file'>
        <div className='re-file-header'>
          <span className={`re-file-name ${Style.username}`}>{file_name}</span>
          <span className={`re-file-size ${Style.timestamp}`}>{file_size}</span>
        </div>
        <div className='re-toolbar'>
          { button(mime_type ? mime_type[0] : 'file') }
          { button('save', () => window.open(this.props.embed.url)) }
          { button('more', () => {}) }
        </div>
        {/*
          mime_type && mime_type[0] === 'image' ? React.createElement(Image, {
            src: proxy_url,
            original: this.props.embed.url,
            className: 're-image',
            height: 512,
            width: 512
          }) : false
        */false}
      </div>)
    }
    else return this.props.content;
  }
};
