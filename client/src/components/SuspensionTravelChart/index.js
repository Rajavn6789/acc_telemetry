import React from "react";
import { LineSeries, Axis, XYChart, Grid, DataContext } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

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
  domain: ["Suspension Travel (mm)", "FL", "FR", "RL", "RR"],
  range: ["", "orange", "#f7f763", "blue", "#1babbf"],
};

const ChartBackground = ({ height }) => {
  return (
    <>
      <rect x={0} y={0} width={"100%"} height={height} fill={"black"} />
    </>
  );
};

const tickValues = generateRangeArr(0, 45, 5);

const SuspensionTravelChart = ({ data, height = 400 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 45] }}
      >
        <ChartBackground height={height} />
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
        <LineSeries
          dataKey="flst"
          stroke="orange"
          data={data}
          {...FLAccessor}
        />
        <LineSeries
          dataKey="frst"
          stroke="#f7f763"
          data={data}
          {...FRAccessor}
        />
        <LineSeries dataKey="rlst" stroke="blue" data={data} {...RLAccessor} />
        <LineSeries
          dataKey="rrst"
          stroke="#1babbf"
          data={data}
          {...RRAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default SuspensionTravelChart;
