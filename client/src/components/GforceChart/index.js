import React from "react";
import { scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { Axis } from "@visx/axis";
import { generateRangeArr } from "../../utils/functions";


const min = -2.5;
const max = 2.5; 

const hTickValues = generateRangeArr(min, max, 1);
const vTickValues = generateRangeArr(min, max, 1);

const width = 200;
const height = 200;
const circleRadius = 6;

const horizontalScale = scaleLinear({
  domain: [min, max],
  range: [-width / 2, width / 2],
});

const verticalScale = scaleLinear({
  domain: [min, max],
  range: [height / 2, -height / 2],
});

const GforceChart = ({ accG }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
      <svg width={width + 50} height={height + 50} >
        <circle
          fill={"whitesmoke"}
          cx={width / 2 + 20}
          cy={height / 2 + 20}
          r={width / 2}
          stroke="grey"
          strokeWidth="1"
        />
        <Group top={height / 2 + 20} left={width / 2 + 20}>
          <Axis
            key={`axis-horizontal`}
            labelProps={{
                display: "none",
              }}
            top={0}
            left={0}
            scale={horizontalScale}
            stroke={"#d9d9d9"}
            tickStroke="grey"
            tickTransform="translate(0, -4)"
            tickValues={hTickValues}
            tickComponent={() => null}
          />
          <Axis
            orientation="left"
            labelProps={{
              display: "none",
            }}
            key={`axis-vertical`}
            top={0}
            left={0}
            scale={verticalScale}
            stroke={"#d9d9d9"}
            tickStroke="grey"
            tickTransform="translate(4, 0)"
            tickValues={vTickValues}
            tickComponent={() => null}
          />
          <circle
            key={`brake-accl`}
            cx={0}
            cy={verticalScale(-accG[2])}
            fill={"red"}
            r={circleRadius}
          />
          <circle
            key={`left-right`}
            cx={horizontalScale(accG[0])}
            cy={0}
            fill={"green"}
            r={circleRadius}
          />
        </Group>
        <text  transform="translate(115,240)">A</text>
        <text  transform="translate(115, 10)">B</text>
        <text transform="translate(0,125)">L</text>
        <text transform="translate(230,125) ">R</text>
      </svg>
    </div>
  );
};

export default GforceChart;
