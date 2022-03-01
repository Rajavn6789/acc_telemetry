import React from "react";
import { LineSeries, Axis, XYChart, Grid, DataContext } from "@visx/xychart";
import ChartLegend from "../ChartLegend";

const absAccessor = {
  yAccessor: (d) => d.abs,
  xAccessor: (d) => d.time,
};

const tcAccessor = {
  yAccessor: (d) => d.tc,
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["ABS", "TC"],
  range: ["blue", "violet"],
};

const ChartBackground = ({height}) => {
  return (
    <>
      <rect x={0} y={0} width={"100%"} height={height} fill={"black"} />
    </>
  );
};

const tickValues = [0, 1];

const ABSTCChart = ({ data, height = 175 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 1] }}
      >
        <ChartBackground height={height}/>
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
        <LineSeries dataKey="abs" stroke="blue" data={data} {...absAccessor} />
        <LineSeries dataKey="tc" stroke="violet" data={data} {...tcAccessor} />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default ABSTCChart;
