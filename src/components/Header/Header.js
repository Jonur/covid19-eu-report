import React from 'react';
import { string } from 'prop-types';
import s from './Header.module.scss';

const Header = ({ lastUpdate }) => (
  <header className={s.appHeader}>
    <img src="european-union.png" alt="EU flag" title="EU flag" />
    <h1 className={s.appTitle}>EU COVID-19 Country Statistics</h1>
    <p className={s.lastUpdate}>{`Data collected on ${lastUpdate}`}</p>
  </header>
);

Header.propTypes = {
  lastUpdate: string.isRequired,
};

export default Header;
