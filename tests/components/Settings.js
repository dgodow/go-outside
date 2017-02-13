import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Settings from '../../src/js/components/Settings';
import Duration from '../../src/js/components/Settings/Duration';
import Greylist from '../../src/js/components/Settings/Greylist';

describe('Settings component', () => {

  let SettingsWrapper;

  beforeEach('set up shallow wrapper', () => {
    SettingsWrapper = shallow(<Settings />);
  })

  it('wraps everything in a root div', () => {
    const rootDivExists = SettingsWrapper
      .find('.content').exists();
    expect(rootDivExists).to.be.true;
  });

  it('has two tabs', () => {
    const hasTabOne = SettingsWrapper
      .find('[eventKey=1]').exists();
    const hasTabTwo = SettingsWrapper
      .find('[eventKey=2]').exists();
    expect(hasTabOne).to.be.true;
    expect(hasTabTwo).to.be.true;
  });

  it('has a close window button that responds to clicks', () => {
    const hasCloseButton = SettingsWrapper
      .find('.fa-times').exists();
    expect(hasCloseButton).to.be.true;

    const setRouteSpy = sinon.spy();
    SettingsWrapper = shallow(<Settings setRoute={setRouteSpy} />);
    SettingsWrapper.find('.fa-times').simulate('click');
    expect(setRouteSpy.calledOnce).to.be.true;
  });
});
