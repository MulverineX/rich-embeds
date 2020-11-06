const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, React } = require('powercord/webpack');

const Renderer = require('./components/Renderer');
// const Settings = require('./components/Settings');

// const { process_embeds } = require('./utils/embed_processing.js');

module.exports = class RichEmbeds extends Plugin {
  async startPlugin () {
    /*powercord.api.settings.registerSettings("rich-embeds", {
      label: 'Rich Embeds',
      category: this.entityID,
      render: Settings
    });*/

    //this.loadStylesheet('./style.scss');

    const ChannelMessage = (await getModule([ 'MESSAGE_ID_PREFIX' ])).default;
    const MessageContent = await getModule(m => m.type && m.type.displayName === 'MessageContent');
    const cmType = ChannelMessage.type;
    const mcType = MessageContent.type;

    /*const getSettings = () => {
      const settingsList = ['setting'];
      let settings = {};

      settingsList.forEach((setting) => { settings[setting] = this.settings.get(setting, true) })

      return settings
    }*/

    inject('Rich-Embeds-Message', ChannelMessage, 'type', (args, res) => {
      if (res.props.childrenMessageContent) { 
        if (linkSelector.test(args[0].message.content)) {
          let MessageC = res.props.childrenMessageContent.props

          MessageC.content = React.createElement(Renderer, {
            content: MessageC.content,
            message: args[0].message,
            //settings: getSettings()
          });

          MessageC.re_preventInject = true;
        }
      }

      return res;
    }, false);
    Object.assign(ChannelMessage.type, cmType);

    // For search, pinned, inbox, threads, and other plugin compatibility
    inject('Rich-Embeds-Message-Content', MessageContent, 'type', (args, res) => {
      if (!args[0].re_preventInject && linkSelector.test(args[0].message.content))
        res.props.children = React.createElement(Renderer, {
          content: res.props.children[0],
          message: args[0].message,
          //settings: getSettings()
      });

      return res;
    })
    Object.assign(MessageContent.type, mcType);
  }

  pluginWillUnload () {
    powercord.api.settings.unregisterSettings("rich-quotes");
    uninject('Rich-Quotes-Message');
    uninject('Rich-Quotes-Message-Content');
  }
};
