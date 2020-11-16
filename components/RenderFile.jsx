const { getModule, React } = require('powercord/webpack');

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
    const { username, timestamp } = getModule([ 'systemMessageAccessories' ], false);


    const proxy_url = this.props.embed.proxy_url.split('/');

    const mime_type = mime.lookup(proxy_url[6]).split('/');
    const file_name = _.last(proxy_url);

    const size = this.props.embed.size;

    const kb = roundTo((size / 1024), 2);

    let b = false;
    let mb = false;

    if (kb < 1) b = size;
    if (kb >= 1000) mb = roundTo((kb / 1024), 2);

    console.log(b);

    const file_size = b ? `${b} bytes` : mb ? `${mb} MB` : `${kb} KB`;


    /*if (mime_type[0] === 'audio') return (<Audio {...{
      format: mime_type[1],
      ext: file_name.slice(-1)[0],
      src: this.props.embed.proxy_url,
      file_name: file_name.slice(0, -1).join('.')
    }} />);*/

    return (<div className='re-file'>
      <div className='re-file-header'>
        <span className={`re-file-name ${username}`}>{file_name}</span>
        <span className={`re-file-size ${timestamp}`}>{file_size}</span>
      </div>
      <div className='re-file-toolbar'>
        <div className={`re-file-button re-file-type re-file-${mime_type[0]}`}></div>
        <div className={`re-file-button re-file-save`}></div>
        <div className={`re-file-button re-file-more`}></div>
      </div>
    </div>)
  }
};
