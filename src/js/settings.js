'use strict';

import React          from 'react';
import { Provider }   from 'react-redux';
import { render }     from 'react-dom';
import { wrapStore }  from 'react-chrome-redux';
import store          from './store';
import Background from './component/Background';
import Settings from './component/Settings';

wrapStore(store, {portName: '1337'});

render(
  <Provider store={store}>
    <Background />
  </Provider>,
  window.document.getElementById('options-container')
);
