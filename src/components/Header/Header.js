import React from 'react';
import s from './Header.module.scss';

const Header = () => (
  <header className={s.appHeader}>
    <img src="european-union.png" alt="EU flag" title="EU flag" />
    <h1 className={s.appTitle}>EU COVID-19 Country Statistics</h1>
  </header>
);

export default Header;
