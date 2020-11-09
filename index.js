const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');

const link_selector = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/;

//const EmbedPatcher = require('./components/EmbedPatcher');
//const EmbedsRenderer = require('./components/EmbedsRenderer');

module.exports = class RichEmbeds extends Plugin {
  async startPlugin () {
    const { MessageAccessories } = await getModule(['MessageAccessories']);
    const maType = MessageAccessories.type;

    console.log(maType);

    inject('rich-embeds-accessories', MessageAccessories, 'type', (args, res) => {
      console.log(args);
      console.log(res);

      return res;
    });
    Object.assign(MessageAccessories.type, maType);

    console.log(MessageAccessories);
  }

  pluginWillUnload () {
    uninject('rich-embeds-accessories');
  }
};
