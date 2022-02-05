import React, { useEffect, useRef, useState } from 'react';
import {
  LineSeries,
  AnimatedAxis,
  XYChart,
  Grid,
} from '@visx/xychart';


const speedAccessor = {
  yAccessor: (d) => d.speed,
  xAccessor: (d) => d.time,
};

const SpeedChart = ({data}) => {
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
                {formattedValue}
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
                {formattedValue}
              </text>
            </g>
          )}
        ></AnimatedAxis>

        <LineSeries dataKey="speed" stroke="green" data={data} {...speedAccessor} />
      </XYChart>
    </>
  );
};

export default SpeedChart;
