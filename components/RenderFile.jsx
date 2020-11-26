const { getModule, React } = require('powercord/webpack');

const { Tooltip } = require('powercord/components');

const mime = require('mime-types');

const Archive = require('./files/Archive'),
      Audio =   require('./files/Audio'),
      Vector =  require('./files/Vector');

function roundTo(n, digits) {
  var negative = false;
  if (digits === undefined) {
      digits = 0;
  }
  if (n < 0) {
      negative = true;
      n = n * -1;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  n = (Math.round(n) / multiplicator).toFixed(digits);
  if (negative) {
      n = (n * -1).toFixed(digits);
  }
  return n;
}

module.exports = class RichFile extends React.Component {
  constructor(props) { super(props); this.state = {} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  render() {
    if (!this.props.embed.height) {
      const { username, timestamp } = getModule([ 'systemMessageAccessories' ], false);


      const proxy_url = this.props.embed.proxy_url.split('/');

      const file_name = _.last(proxy_url);

      const mime_type = file_name.includes('.') ? (() => { try { return mime.lookup(file_name)?.split('/') } catch (e) { return false } })() : false;

      const size = this.props.embed.size;

      const kb = roundTo((size / 1024), 2);

      let b = false;
      let mb = false;

      if (kb < 1) b = size;
      if (kb >= 1000) mb = roundTo((kb / 1024), 2);

      const file_size = b ? `${b} bytes` : mb ? `${mb} MB` : `${kb} KB`;

      switch (_.last(file_name.split('.'))) {
        case 'zip': mime_type[0] = 'archive'; break;
      }

      let button = (title, run = false) => {
        return (
          <Tooltip position='top' text={title.charAt(0).toUpperCase() + title.slice(1)}>
            <div className={`re-toolbar-item ${run ? 're-clickable' : ''}`} onClick={run}>
              <div className={`re-icon re-icon-${title}`}></div><div></div>
            </div>
          </Tooltip>
        )
      }

      return (<div className='re-file'>
        <div className='re-file-header'>
          <span className={`re-file-name ${username}`}>{file_name}</span>
          <span className={`re-file-size ${timestamp}`}>{file_size}</span>
        </div>
        <div className='re-toolbar'>
          { button(mime_type ? mime_type[0] : 'file') }
          { button('save', () => window.open(this.props.embed.url)) }
          { button('more', () => {}) }
        </div>
      </div>)
    }
    else return this.props.content;
  }
};
