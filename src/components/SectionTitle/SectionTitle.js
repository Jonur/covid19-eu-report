import React from 'react';
import { bool, func } from 'prop-types';
import classNames from 'classnames';
import { SECTION_TITLE } from '../../definitions/propTypes';
import s from './SectionTitle.module.scss';

const SectionTitle = ({
  alerting,
  ariaLabelledBy,
  sectionTotals,
  sectionNew,
  expandedSection,
  sectionTitle,
  sectionSubtitle,
  setExpandedSection,
}) => (
  <>
    <h1 id={ariaLabelledBy} className={s.sectionTitle}>
      {sectionTitle}
    </h1>
    <h2
      onClick={() => setExpandedSection(!expandedSection)}
      className={classNames(s.sectionSubtitle, {
        [s[alerting]]: alerting,
        [s.compact]: !sectionTotals || !sectionNew,
        [s.expanded]: expandedSection,
      })}
    >
      {sectionTotals && (
        <div className={s.titleTotals}>
          <span
            className={classNames(s.totalLabel, { [s[alerting]]: alerting })}
          >
            Total
          </span>
          <span className={s.totalNumber}>{sectionTotals}</span>
        </div>
      )}
      {sectionNew && (
        <div className={s.titleNew}>
          <span
            className={classNames(s.totalLabel, { [s[alerting]]: alerting })}
          >
            New
          </span>
          <span className={s.totalNumber}>{sectionNew}</span>
        </div>
      )}
      {sectionSubtitle && (
        <span className={s.sectionSubtitleText}>{sectionSubtitle}</span>
      )}
      <div
        className={classNames(s.expandCollapseArrow, {
          [s.expanded]: expandedSection,
        })}
      />
    </h2>
  </>
);

SectionTitle.propTypes = {
  ...SECTION_TITLE,
  expandedSection: bool.isRequired,
  setExpandedSection: func.isRequired,
};

export default SectionTitle;
