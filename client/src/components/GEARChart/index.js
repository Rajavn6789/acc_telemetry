import React from 'react';
import { LineSeries, Axis, XYChart, Grid } from '@visx/xychart';

const speedAccessor = {
  yAccessor: (d) => d.gear,
  xAccessor: (d) => d.time,
};

const GEARChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={200}
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear', domain: [0, 6],  }}
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
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
                {Math.round(formattedValue)}
              </text>
            </g>
          )}
        ></Axis>
        <Axis
          orientation="right"
          tickValues={[0, 1, 2, 3, 4, 5, 6]}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={'white'} opacity={0.5}>
              {Math.round(formattedValue)}
              </text>
            </g>
          )}
        ></Axis>

        <LineSeries
          dataKey="gear"
          stroke="yellow"
          data={data}
          {...speedAccessor}
        />
      </XYChart>
    </>
  );
};

export default GEARChart;
