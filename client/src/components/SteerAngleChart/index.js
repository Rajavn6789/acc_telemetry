import React from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";

const steerAngleAccessor = {
  yAccessor: (d) => d.steerAngle,
  xAccessor: (d) => d.distance,
};

const tickValues = [-400, -200, 0, 200, 400];

const ordinalScaleObj = {
  domain: ["Steering"],
  range: ["orange"],
};

const SteerAngleChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={250}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [-200, 200] }}
      >
        <rect x={0} y={0} width={"100%"} height={300} fill={"black"} />
        <Grid
          rows={true}
          columns={false}
          numTicks={tickValues.length}
          strokeWidth={1}
          strokeOpacity={0.1}
          strokeDasharray="5,2"
        />
        <Axis
          orientation="left"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={"white"} opacity={0.5}>
                {formattedValue}
              </text>
            </g>
          )}
        ></Axis>
        <Axis
          orientation="right"
          tickValues={tickValues}
          tickComponent={({ formattedValue, ...tickProps }) => (
            <g>
              <text {...tickProps} fill={"white"} opacity={0.5}>
                {formattedValue}
              </text>
            </g>
          )}
        ></Axis>

        <LineSeries
          dataKey="speed"
          stroke="orange"
          data={data}
          {...steerAngleAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default SteerAngleChart;
