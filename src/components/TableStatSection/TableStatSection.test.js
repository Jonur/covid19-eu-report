import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TableStatSection from './TableStatSection';

describe('TableStatSection', () => {
  const renderSetup = (overrideProps = {}) => {
    const props = {
      ariaLabelledBy: 'some-id',
      countryStatColumnName: 'Population',
      data: [
        {
          countryName: 'Italy',
          flagSrc: '32.png',
          totalDeaths: 10023,
          deathsLast24h: 889,
          totalCases: 92472,
          casesLast24h: 5974,
          totalRecovered: 12384,
          recoveredLast24h: 1434,
        },
      ],
      dataProp: 'totalCases',
      dataPropSecondary: 'casesLast24h',
      sectionTitle: 'Total cases',
      sectionSubtitle: '(+ ...)',
      title: 'Some info',
      ...overrideProps,
    };

    return {
      component: render(<TableStatSection {...props} />),
      props,
    };
  };

  test('renders the TableStatSection component correctly', () => {
    const { container } = renderSetup().component;
    expect(container).toMatchSnapshot();
  });

  test('renders the TableStatSection component with positive styled labels', () => {
    const { container } = renderSetup({ positive: true }).component;
    expect(container).toMatchSnapshot();
  });

  test('expands the statistics table when the title is clicked', () => {
    const { component, props } = renderSetup();
    fireEvent.click(component.getByText(props.sectionTitle));
    expect(component.getByText(/Italy/)).toBeInTheDocument();
  });
});
