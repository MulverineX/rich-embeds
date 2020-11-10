const { getModule, React, http: { get } } = require('powercord/webpack');

const mime = require('mime-types');

const Curseforge = require('./sites/Curseforge');


module.exports = class RichEmbed extends React.Component {
  constructor(props) { super(props); this.state = { content: (<></>)} }

  static getDerivedStateFromProps(props, state) {
    return { ...Object.assign({}, props), ...state };
  }

  async componentDidMount () { await this.buildEmbed() }

  async buildEmbed () {
    this.setState({content: (<span>{this.props.link}</span>)});
    
    let data = false;

    /*try {
      data = await get({ url: this.props.link, retries: 2 });
    } catch (e) {
      console.log(e);
    }*/
  }

  render() {
    console.log(this.state.content);

    return this.state.content;
  }
};
