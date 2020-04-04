import React from 'react';
import { string } from 'prop-types';
import s from './Header.module.scss';

const Header = ({ lastUpdate }) => (
  <header className={s.appHeader}>
    <img
      src="eustars.png"
      alt="EU flag"
      title="EU flag"
      className={s.euStars}
    />
    <div className={s.headerText}>
      <h1 className={s.appTitle}>EU COVID-19 Country Statistics</h1>
      <p
        className={s.lastUpdate}
      >{`Updates daily - last updated on ${lastUpdate}`}</p>
    </div>
  </header>
);

Header.propTypes = {
  lastUpdate: string.isRequired,
};

export default Header;
