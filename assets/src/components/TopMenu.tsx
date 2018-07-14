import * as React from 'react';

import { Menu } from 'semantic-ui-react';

const TopMenu = () => (
  <Menu fixed="top" style={{ zIndex: 99 }}>
    <Menu.Item header>Pivotcoin!</Menu.Item>
    <Menu.Item
      icon="github"
      position="right"
      onClick={() =>
        window.open('https://github.com/wlindner/pivotcoin', 'Pivotcoin_Github')
      }
    />
  </Menu>
);

export default TopMenu;
