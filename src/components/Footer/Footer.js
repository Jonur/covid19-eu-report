import React from 'react';
import s from './Footer.module.scss';

const Footer = () => (
  <footer className={s.globalFooter}>
    &copy;{`${new Date().getFullYear()} - `}
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur"
      alt="Jonur on Github"
    >
      Jonur
    </a>
  </footer>
);

export default Footer;
