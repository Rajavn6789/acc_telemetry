import React from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";

const speedAccessor = {
  yAccessor: (d) => d.gear,
  xAccessor: (d) => d.time,
};

const tickValues = [0, 1, 2, 3, 4, 5, 6];

const ordinalScaleObj = {
  domain: ["gear"],
  range: ["yellow"],
};

const GEARChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={200}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 6] }}
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
              {Math.round(formattedValue)}
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
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default GEARChart;
