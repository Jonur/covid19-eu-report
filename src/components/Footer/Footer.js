import React from 'react';
import s from './Footer.module.scss';

const Footer = () => (
  <footer className={s.globalFooter}>
    &copy;{`${new Date().getFullYear()} - `}
    <a
      className={s.link}
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur"
      alt="Jonur on Github"
    >
      Jonur
    </a>
    {` - `}
    <a
      className={s.link}
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/Jonur/covid19-eu-report/blob/master/PrivacyPolicy.md"
      alt="Application Privacy Policy"
    >
      Privacy Policy
    </a>
  </footer>
);

export default Footer;
