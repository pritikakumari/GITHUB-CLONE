import React, { useMemo } from "react";
import HeatMap from "@uiw/react-heat-map";

const HeatMapProfile = () => {
  const activityData = useMemo(() => {
    const data = [];
    const startDate = new Date("2025-01-01T12:00:00");
    const endDate = new Date("2025-12-31T12:00:00");

    for (
      const date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      data.push({
        date: [
          date.getFullYear(),
          String(date.getMonth() + 1).padStart(2, "0"),
          String(date.getDate()).padStart(2, "0"),
        ].join("-"),
        count: Math.floor(Math.random() * 6),
      });
    }

    return data;
  }, []);

  return (
    <div className="heatmap-container">
      <h4>Recent Contributions</h4>

      <HeatMap
        value={activityData}
        width={650}
        height={160}
        startDate={new Date("2025-01-01T12:00:00")}
        endDate={new Date("2025-12-31T12:00:00")}
        rectSize={11}
        space={3}
        rectProps={{ rx: 2 }}
        legendCellSize={0}
        panelColors={[
          "#161b22",
          "#0e4429",
          "#006d32",
          "#26a641",
          "#39d353",
        ]}
      />
    </div>
  );
};

export default HeatMapProfile;
