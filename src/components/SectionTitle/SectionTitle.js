import React from 'react';
import { bool, func } from 'prop-types';
import classNames from 'classnames';
import { SECTION_TITLE } from '../../definitions/propTypes';
import s from './SectionTitle.module.scss';

const SectionTitle = ({
  alerting,
  ariaLabelledBy,
  expandedSection,
  sectionSubtitle,
  sectionTitle,
  setExpandedSection,
}) => (
  <h2
    id={ariaLabelledBy}
    onClick={() => setExpandedSection(!expandedSection)}
    className={s.sectionTitle}
  >
    {sectionTitle}
    <span className={classNames(s.last24hInfo, { [s[alerting]]: alerting })}>
      {sectionSubtitle}
    </span>
    <span
      className={classNames(s.expandCollapseArrow, {
        [s.expanded]: expandedSection,
      })}
    />
  </h2>
);

SectionTitle.propTypes = {
  ...SECTION_TITLE,
  expandedSection: bool.isRequired,
  setExpandedSection: func.isRequired,
};

export default SectionTitle;
