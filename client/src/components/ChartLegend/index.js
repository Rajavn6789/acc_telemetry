import React from "react";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
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
        scale={scaleOrdinal(scale)}
        labelFormat={(label) => `${label.toUpperCase()}`}
      >
        {(labels) => (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {labels.map((label, i) => {
              let isStrokeDash;
              if (label.text.includes("_")) {
                isStrokeDash = true;
              } else {
                isStrokeDash = false;
              }
              return (
                <LegendItem key={`legend-quantile-${i}`} margin="0 8px">
                  <svg width={16} height={4} style={{ marginRight: 8 }}>
                    <line
                      x1={0}
                      y1={0}
                      x2={16}
                      y2={0}
                      style={{
                        stroke: label.value,
                        strokeWidth: 8,
                        strokeDasharray: (isStrokeDash) ? "6, 2" : "0",
                      }}
                    />
                  </svg>
                  <LegendLabel
                    style={{ color: "white" }}
                    align="left"
                    margin="0 0 0 8px"
                  >
                    {label.text.replace("_", "")}
                  </LegendLabel>
                </LegendItem>
              );
            })}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
};

export default ChartLegend;
