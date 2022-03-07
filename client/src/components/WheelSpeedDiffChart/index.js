import React, { memo } from "react";
import { LineSeries, Axis, XYChart, Grid, DataContext } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

const speedDiffAccessor = {
  yAccessor: (d) => d.wheelAngularSpeedDiff,
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["Wheel Speed Diff (kph)", "RR and RL"],
  range: ["", "yellow"],
};

const ChartBackground = ({ height }) => {
  return (
    <>
      <rect x={0} y={0} width={"100%"} height={height} fill={"black"} />
    </>
  );
};

const tickValues = generateRangeArr(-8, 8, 2);

const WheelSpeedDiffChart = ({ data, height = 400 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [-8, 8] }}
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
          dataKey="speeddiff"
          stroke="yellow"
          data={data}
          {...speedDiffAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default memo(WheelSpeedDiffChart);
