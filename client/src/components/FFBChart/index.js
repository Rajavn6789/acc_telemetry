import React, { memo } from "react";
import {
  LineSeries,
  Axis,
  XYChart,
  Grid,
  AnnotationLineSubject,
} from "@visx/xychart";
import ChartLegend from "../ChartLegend";
import { generateRangeArr } from "../../utils/functions";

const ffbAccessor = {
  yAccessor: (d) => d.ffb,
  xAccessor: (d) => d.time,
};

const tickValues = generateRangeArr(0, 100, 50);

const ordinalScaleObj = {
  domain: ["Force Feedback (%)"],
  range: ["grey"],
};

const FFBChart = ({ data, height = 200 }) => {
  return (
    <>
      <XYChart
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear", domain: [0, 100], label: "time" }}
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
        <AnnotationLineSubject
          x={50}
          y={50}
          stroke="red"
          opacity={0.5}
          orientation="horizontal"
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
        />
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
        />
        <LineSeries
          dataKey="speed"
          stroke="grey"
          data={data}
          {...ffbAccessor}
        />
      </XYChart>
      <ChartLegend scale={ordinalScaleObj} />
    </>
  );
};

export default memo(FFBChart);
