import React from "react";
import { LineSeries, Axis, XYChart, Grid } from "@visx/xychart";
import ChartLegend from "../ChartLegend";

const gasAccessor = {
  yAccessor: (d) => d.gas,
  xAccessor: (d) => d.distance,
};

const brakeAccessor = {
  yAccessor: (d) => d.brake,
  xAccessor: (d) => d.distance,
};

const ordinalScaleObj = {
  domain: ["Throttle", "Brake"],
  range: ["green", "red"],
};

const GasBrakeChart = ({ data }) => {
  return (
    <>
      <XYChart
        height={250}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 1] }}
      >
        <rect x={0} y={0} width={"100%"} height={300} fill={"black"} />
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
