const { getModule, React } = require('powercord/webpack');


//const AudioPlayer = require('./AudioPlayer');

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
    //const content = [...this.props.content];

    /* Find Links & Render Embeds */
    /*for (const [i, e] of content.entries()) { if (e && e.props && e.props.href) {

    }}*/
  }

  render = () => <>{this.state.content}</>
};
