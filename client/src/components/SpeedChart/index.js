import React from 'react';
import { LineSeries, Axis, XYChart, Grid } from '@visx/xychart';

const speedAccessor = {
  yAccessor: (d) => d.speed,
  xAccessor: (d) => d.time,
};

const SpeedChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={300}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear', domain: [0, 300] }}
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
          tickValues={[0, 50, 100, 150, 200, 250, 300]}
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
          tickValues={[0, 50, 100, 150, 200, 250, 300]}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {formattedValue}
              </text>
            </g>
          )}
        ></Axis>

        <LineSeries
          dataKey="speed"
          stroke="green"
          data={data}
          {...speedAccessor}
        />
      </XYChart>
    </>
  );
};

export default SpeedChart;
