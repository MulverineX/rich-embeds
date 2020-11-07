const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');

const link_selector = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

const EmbedPatcher = require('./components/EmbedPatcher');
const EmbedsRenderer = require('./components/EmbedsRenderer');

module.exports = class RichEmbeds extends Plugin {
  async startPlugin () {
    const MessageContent = await getModule(m => m.type && m.type.displayName === 'MessageContent');
    const Embed = (await getModuleByDisplayName('Embed')).prototype;
    const mcType = MessageContent.type;

    inject('rich-embeds-patched', Embed, 'render', function (_, res) {
      const { embed } = this.props;
      if (embed.url?.startsWith('https://github.com')) {
        console.log(embed);
      }
      return res;
    });

    inject('rich-embeds-custom', MessageContent, 'type', (args, res) => {
      if (link_selector.test(args[0].message.content)) {
        res.props.children = React.createElement(EmbedsRenderer, {
          original: res.props.children,
          content: args[0].message.content
        });
      }

      return res;
    })
    Object.assign(MessageContent.type, mcType);
  }

  pluginWillUnload () {
    uninject('rich-embeds-patched');
    uninject('rich-embeds-custom');
  }
};
