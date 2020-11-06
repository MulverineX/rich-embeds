const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, React } = require('powercord/webpack');

const link_selector = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

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

    const MessageContent = await getModule(m => m.type && m.type.displayName === 'MessageContent');
    const mcType = MessageContent.type;

    inject('Rich-Embeds-Message-Content', MessageContent, 'type', (args, res) => {
      const message = args[0].message;

      if (link_selector.test(message.content) || message.attachments.length !== 0) {
        res.props.children = React.createElement(Renderer, {
          content: Array.isArray(res.props.children) ? res.props.children[0] : [ res.props.children ],
          message: message,
          /*settings: (() => {
            const settingsList = ['setting'];
            let settings = {};

            settingsList.forEach((setting) => { settings[setting] = this.settings.get(setting, true) })

            return settings
          })()*/
        });
      }

      return res;
    })
    Object.assign(MessageContent.type, mcType);
  }

  pluginWillUnload () {
    //powercord.api.settings.unregisterSettings("rich-embeds");
    uninject('Rich-Embeds-Message-Content');
  }
};
