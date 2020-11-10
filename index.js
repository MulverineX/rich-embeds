const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { getModule, getModuleByDisplayName, React } = require('powercord/webpack');

const edit_sites = new RegExp(`(${['github\.com', 'streamable\.com', 'twitch\.com', 'reddit\.com', 'twitter\.com'].join(')|(')})`);
const add_sites = new RegExp(`(${['4chan\.org','curseforge\.com'].join(')|(')})`);

const RenderSite = require('./components/RenderSite');
const RenderLink = require('./components/RenderLink');
const RenderFile = require('./components/RenderFile');

module.exports = class RichEmbeds extends Plugin {
  async startPlugin () {
    const MessageAccessories = (await getModule(['MessageAccessories'])).MessageAccessories.prototype;

    inject('rich-embeds-accessories', MessageAccessories, 'render', (f, res) => {
      let accessories = [...res.props.children],
          embeds = { linked: accessories[3], native: accessories[2] },
          message = accessories[6].props.message,
          content = JSON.parse(JSON.stringify(message.content)),
          embedded_links = [],
          embed_links = [];

      if (embeds.linked) embeds.linked.forEach((embed) => { embedded_links.push(embed.props.children.props.embed.url) });

      if (content !== "") {
        const { parse } = getModule(["parse", "parseTopic"], false);

        let embedded = false;

        if (embeds.linked) {
          embedded = '';

          embedded_links.forEach((link) => { embedded += `(${link.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})|`; });

          embedded = new RegExp(embedded.substring(0, embedded.length-1));
        }

        parse(content, true, { channelId: message.channel_id }).forEach((e) => {
          if (e?.props?.href && add_sites.test(e.props.href) 
           && !(embedded && embedded.test(e.props.href))
           && !e.props.href.includes('imgur.com')) {
            let split = content.split(e.props.href);

            split[0] = split[0].slice(-1);
            split[1] = split[1].slice(0, 1);

            let display = true;

            if (`${split[0]}${split[1]}` === '<>') display = false;

            content = content.replace(`${split[0]}${e.props.href}${split[1]}`, '');

            if (display) embed_links.push(e.props.href);
          }
        })
      }
      
      if ((embeds.linked || embeds.native) || embed_links.length > 0) {
        // Modify/Overwrite Embeds
        if (embeds.linked) for (let e of embeds.linked) {
          let embed = e.props.children;

          if (edit_sites.test(embed.props.embed.url)) embed = React.createElement(RenderSite, {
            content: embed,
            data: embed.props.embed,
          });
        }

        const msg_link = [accessories[6].props.channel.guild_id, message.channel_id, message.id];

        // Create/Add Embeds
        if (embed_links.length !== 0) {
          if (!embeds.linked) embeds.linked = [];

          for (const link of embed_links) embeds.linked.push(React.createElement(RenderLink, {
            link: link, message: msg_link
          }))

          console.log(embeds.linked)
        }

        // Modify/Overwrite Attachments
        if (embeds.native) for (let a of embeds.native) {
          let embed = a.props.children;

          if (!embed.height) embed = React.createElement(RenderFile, {
            content: embed, message: msg_link,
            data: embed.props.attachment
          });
        }
      }

      return res;
    });
  }

  pluginWillUnload () {
    uninject('rich-embeds-accessories');
  }
};
