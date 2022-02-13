import React from "react";
import { LineSeries, Axis, XYChart, Grid, DataContext } from "@visx/xychart";
import ChartLegend from "../ChartLegend";

const FLAccessor = {
  yAccessor: (d) => d.suspensionTravel[0],
  xAccessor: (d) => d.time,
};

const FRAccessor = {
  yAccessor: (d) => d.suspensionTravel[1],
  xAccessor: (d) => d.time,
};

const RLAccessor = {
  yAccessor: (d) => d.suspensionTravel[2],
  xAccessor: (d) => d.time,
};

const RRAccessor = {
  yAccessor: (d) => d.suspensionTravel[3],
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["FL", "FR", "RL", "RR"],
  range: ["orange", "yellow", "blue", "green"],
};

const ChartBackground = () => {
  return (
    <>
      <rect x={0} y={0} width={"100%"} height={300} fill={"black"} />
    </>
  );
};

const tickValues = [0, 5, 10, 15, 20, 25, 30, 35, 40];

const SuspensionTravelChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={300}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 40] }}
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
        <LineSeries dataKey="fl" stroke="orange" data={data} {...FLAccessor} />
        <LineSeries dataKey="fr" stroke="yellow" data={data} {...FRAccessor} />
        <LineSeries dataKey="rl" stroke="blue" data={data} {...RLAccessor} />
        <LineSeries dataKey="rr" stroke="green" data={data} {...RRAccessor} />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default SuspensionTravelChart;
