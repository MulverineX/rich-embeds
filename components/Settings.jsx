const { React } = require('powercord/webpack');

const { FormTitle } = require('powercord/components');
const { SwitchItem } = require('powercord/components/settings');

const settingStrings = {
  setting: ['Title', 'Description.']
};

const embedSettings = [''];

module.exports = class Settings extends React.Component {
  constructor(props) { super(props); this.state = {} }

  toggleSetting (setting, defaultOption) {
    const { getSetting } = this.props;
    this.props.toggleSetting(setting, defaultOption);

    let embedAll = true;

    embedSettings.forEach((type) => { if (getSetting(type) === false) embedAll = false; });

    if (getSetting('embedAll') !== embedAll) this.props.toggleSetting('embedAll', defaultOption);
  }

  render () {
    const { getSetting } = this.props;

    return (
      <div>
        <FormTitle className='re-settingsHeader'>Display</FormTitle>

        {/*<SwitchItem note={settingStrings.setting[1]}
          value={getSetting('setting', true)}
          onChange={() => this.toggleSetting('setting', true)}
        >{settingStrings.setting[0]}</SwitchItem>*/}
      </div>
    );
  }
};
