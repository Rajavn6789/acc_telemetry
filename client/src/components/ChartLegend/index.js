import React from "react";
import { LegendOrdinal } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

const ChartLegend = ({ scale }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: -40,
        marginBottom: 8,
      }}
    >
      <LegendOrdinal
        direction="row"
        scale={scaleOrdinal(scale)}
        legendLabelProps={{ color: "white" }}
        labelMargin="0 16px 0 4px"
        shape="line"
        style={{
          backgroundColor: "inherit",
          color: "white",
          display: "flex",
          padding: "0 8px",
        }}
      />
    </div>
  );
};

export default ChartLegend;
