import React from 'react';
import { LineSeries, Axis, XYChart, Grid } from '@visx/xychart';

const speedAccessor = {
  yAccessor: (d) => d.rpm,
  xAccessor: (d) => d.time,
};

const RPMChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear', domain: [0, 10000] }}
      >
        <rect x={0} y={0} width={'100%'} height={300} fill={'black'} />
        <Grid
          rows={true}
          columns={false}
          numTicks={10}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
        />
        <Axis
          orientation="left"
          tickValues={[0, 2500, 5000, 7500, 10000]}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue}
              </text>
            </g>
          )}
        ></Axis>
        <Axis
          orientation="right"
          tickValues={[0, 2500, 5000, 7500, 10000]}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue}
              </text>
            </g>
          )}
        ></Axis>

        <LineSeries
          dataKey="rpm"
          stroke="green"
          data={data}
          {...speedAccessor}
        />
      </XYChart>
    </>
  );
};

export default RPMChart;
