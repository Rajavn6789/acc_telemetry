import React, { memo } from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

const steerAngleAccessor = {
  yAccessor: (d) => d.steerAngle,
  xAccessor: (d) => d.time,
};

const tickValues = generateRangeArr(-270, 270, 90);

const ordinalScaleObj = {
  domain: ["Steering °"],
  range: ["orange"],
};

const SteerAngleChart = ({ data, height = 300 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [-270, 270] }}
      >
        <rect x={0} y={0} width={"100%"} height={height} fill={"black"} />
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

export default memo(SteerAngleChart);
