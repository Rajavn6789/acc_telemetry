import React, { useEffect, useRef, useState } from 'react';
import {
  LineSeries,
  AnimatedAxis,
  XYChart,
  Grid,
} from '@visx/xychart';


const gasAccessor = {
  yAccessor: (d) => d.gas,
  xAccessor: (d) => d.time,
};

const brakeAccessor = {
  yAccessor: (d) => d.brake,
  xAccessor: (d) => d.time,
};

const GasBrakeChart = ({data}) => {
  return (
    <>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
      >
        <rect x={0} y={0} width={'100%'} height={300} fill={'black'} />
        <Grid
          rows={true}
          columns={true}
          numTicks={10}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
        />
        <AnimatedAxis
          orientation="left"
          hideTicks
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue * 100}
              </text>
            </g>
          )}
        ></AnimatedAxis>
        <AnimatedAxis
          orientation="right"
          hideTicks
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue * 100}
              </text>
            </g>
          )}
        ></AnimatedAxis>
        <LineSeries
          dataKey="gas"
          stroke="green"
          data={data}
          {...gasAccessor}
        />
        <LineSeries dataKey="brake" stroke="red" data={data} {...brakeAccessor} />
      </XYChart>
    </>
  );
};

export default GasBrakeChart;
