import React, { useState } from 'react';
import { GraphSectionResult, SectionTitle } from '..';
import CountryGraphSelect from './CountryGraphSelect';
import { getEUTotalsByDateNewestFirst } from '../../utils/dataFilteringUtils';
import { getEUtotals } from '../../utils/dataPresentationUtils';
import s from './CountryGraphSection.module.scss';

const CountryGraphSection = ({
  ariaLabelledBy,
  graphData,
  sectionSubtitle,
}) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryTotalsTimeline, setCountryTotalsTimeline] = useState({});
  const [countryTotals, setCountryTotals] = useState({});
  const [optionDisplayed, setOptionsDisplayed] = useState({
    confirmed: true,
    deaths: true,
    recovered: true,
  });

  const handleChange = (event) =>
    setOptionsDisplayed({
      ...optionDisplayed,
      [event?.target?.name ?? '']: event?.target?.checked ?? false,
    });
  const handleUserSelect = (event) => {
    const userSelectedCountry = event?.target?.value || '';

    if (userSelectedCountry) {
      const countryTotalsByDate = getEUTotalsByDateNewestFirst(
        graphData,
        userSelectedCountry
      );

      setSelectedCountry(userSelectedCountry);
      setCountryTotalsTimeline(countryTotalsByDate);
      setCountryTotals(getEUtotals(countryTotalsByDate));
    }
  };

  return (
    <section aria-labelledby={ariaLabelledBy} className={s.section}>
      <SectionTitle
        ariaLabelledBy={ariaLabelledBy}
        expandedSection={expandedSection}
        sectionSubtitle={sectionSubtitle}
        setExpandedSection={setExpandedSection}
      />
      {expandedSection && (
        <div className={s.countryGraphSectionContainer}>
          <CountryGraphSelect
            handleUserSelect={handleUserSelect}
            selectedCountry={selectedCountry}
          />
          {selectedCountry && (
            <GraphSectionResult
              optionDisplayed={optionDisplayed}
              handleChange={handleChange}
              graphData={countryTotalsTimeline}
              totals={countryTotals.current}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default CountryGraphSection;
