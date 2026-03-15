import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigator from './Navigator';

function UserLayout() {
  return (
    <div>
      <Navigator />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;