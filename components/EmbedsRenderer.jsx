const { getModule, React } = require('powercord/webpack');

const mime = require('../node_modules/mime-types');

module.exports = class EmbedsRenderer extends React.Component {
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
  }

  render = () => <>{this.state.content}</>
};
