import React, { memo } from "react";
import { LineSeries, Axis, XYChart, Grid, DataContext } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

// const FLAccessor = {
//   yAccessor: (d) => d.wheelAngularSpeed[0],
//   xAccessor: (d) => d.time,
// };

// const FRAccessor = {
//   yAccessor: (d) => d.wheelAngularSpeed[1],
//   xAccessor: (d) => d.time,
// };

const RLAccessor = {
  yAccessor: (d) => d.wheelAngularSpeed[0],
  xAccessor: (d) => d.time,
};

const RRAccessor = {
  yAccessor: (d) => d.wheelAngularSpeed[1],
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["Wheel Speed (kph)", "RL", "RR"],
  range: ["", "violet", "#1babbf"],
};

const ChartBackground = ({ height }) => {
  return (
    <>
      <rect x={0} y={0} width={"100%"} height={height} fill={"black"} />
    </>
  );
};

const tickValues = generateRangeArr(0, 300, 20);

const WheelSpeedChart = ({ data, height = 400 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 300] }}
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
        {/* <LineSeries dataKey="fl" stroke="orange" data={data} {...FLAccessor} />
        <LineSeries dataKey="fr" stroke="yellow" data={data} {...FRAccessor} /> */}
        <LineSeries
          dataKey="rlws"
          stroke="violet"
          data={data}
          {...RLAccessor}
        />
        <LineSeries
          dataKey="rrws"
          stroke="#1babbf"
          data={data}
          {...RRAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default memo(WheelSpeedChart);
