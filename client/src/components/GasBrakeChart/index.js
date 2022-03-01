import React from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

const gasAccessor = {
  yAccessor: (d) => d.gas,
  xAccessor: (d) => d.time,
};

const brakeAccessor = {
  yAccessor: (d) => d.brake,
  xAccessor: (d) => d.time,
};

const ordinalScaleObj = {
  domain: ["Throttle (%)", "Brake (%)"],
  range: ["green", "red"],
};

const tickValues = generateRangeArr(0, 1, 0.2);

const GasBrakeChart = ({ data, height = 250 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 1] }}
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
                {formattedValue * 100}
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
                {formattedValue * 100}
              </text>
            </g>
          )}
        ></Axis>
        <LineSeries dataKey="gas" stroke="green" data={data} {...gasAccessor} />
        <LineSeries
          dataKey="brake"
          stroke="red"
          data={data}
          {...brakeAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default GasBrakeChart;
