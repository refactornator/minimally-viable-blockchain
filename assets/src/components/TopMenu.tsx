import * as React from 'react';

import { Menu } from 'semantic-ui-react';

const TopMenu = () => (
  <Menu fixed="top" style={{ zIndex: 99 }}>
    <Menu.Item header>Minimally Viable Blockchain</Menu.Item>
    <Menu.Item
      icon="github"
      position="right"
      onClick={() =>
        window.open(
          'https://github.com/wlindner/minimally-viable-blockchain',
          'MVB_Github'
        )
      }
    />
  </Menu>
);

export default TopMenu;
