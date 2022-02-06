import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  LineSeries,
  Axis,
  XYChart,
  Grid,
  DataProvider,
  DataContext,
} from '@visx/xychart';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal, LegendItem, LegendLabel } from '@visx/legend';

const legendGlyphSize = 15;

const absAccessor = {
  yAccessor: (d) => d.abs,
  xAccessor: (d) => d.time,
};

const tcAccessor = {
  yAccessor: (d) => d.tc,
  xAccessor: (d) => d.time,
};

const ordinalColorScale = scaleOrdinal({
  domain: ['TC', 'ABS'],
  range: ['blue', 'violet'],
});

const ChartBackground = () => {
  const { margin, innerHeight, innerWidth } = useContext(DataContext);
  return (
    <>
      <rect x={0} y={0} width={'100%'} height={300} fill={'black'} />
    </>
  );
};

const tickValues = [0, 1];

const ABSTCChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={200}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear', domain: [0, 1] }}
      >
        <ChartBackground />
        <Grid
          rows={true}
          columns={false}
          numTicks={1}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
        />
        <Axis
          orientation="left"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue }
              </text>
            </g>
          )}
        ></Axis>
        <Axis
          orientation="right"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue }
              </text>
            </g>
          )}
        ></Axis>
        <LineSeries dataKey="abs" stroke="blue" data={data} {...absAccessor} />
        <LineSeries dataKey="tc" stroke="violet" data={data} {...tcAccessor} />
      </XYChart>
    </>
  );
};

export default ABSTCChart;
