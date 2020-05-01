import React, { useEffect, useRef, useState } from 'react';
import { cloneDeep } from 'lodash';
import { COUNTRY_GRAPHS } from '../../definitions/propTypes';
import { CountryGraphSelect, SectionTitle } from '..';
import CurveLineChart from './CurveLineChart';
import { getCountryNewCasesByDateNewestFirst } from '../../utils/dataFilteringUtils';
import s from './CurveSection.module.scss';

const CurveSection = ({ ariaLabelledBy, graphData, sectionSubtitle }) => {
  const [expandedSection, setExpandedSection] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [dataCurve, setDataCurve] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    if (!expandedSection) {
      setSelectedCountry('');
    }
  }, [expandedSection]);

  const handleUserSelect = (event) => {
    const userSelectedCountry = event?.target?.value || '';

    if (userSelectedCountry) {
      setSelectedCountry(userSelectedCountry);

      const newCases = getCountryNewCasesByDateNewestFirst(
        cloneDeep(graphData),
        userSelectedCountry
      );
      setDataCurve(newCases);
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
        <div className={s.curveSectionContainer} ref={containerRef}>
          <CountryGraphSelect
            handleUserSelect={handleUserSelect}
            selectedCountry={selectedCountry}
          />
          {selectedCountry && (
            <CurveLineChart
              data={dataCurve}
              lineDataKey={'New Cases'}
              containerRef={containerRef}
            />
          )}
        </div>
      )}
    </section>
  );
};

CurveSection.propTypes = COUNTRY_GRAPHS;

export default CurveSection;
