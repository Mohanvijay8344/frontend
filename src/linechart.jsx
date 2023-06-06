import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const LineChart = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    const chartCanvas = chartRef.current;
    const context = chartCanvas.getContext("2d");

    const chart = new Chart(context, {
      type: "line",
      data: data,
      options: options
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} width="600" height="150"></canvas>
    </div>
  );
};

const data = {
  datasets: [
    {
      label: "BSI 916",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0,
      data: []
    },
    {
      label: "18k",
      borderColor: "rgb(0, 255, 0)",
      backgroundColor: "rgba(0, 255, 0, 0.3)",
      tension: 0,
      data: []
    }
  ]
};

const options = {
  scales: {
    x: {
      type: "realtime",
      realtime: {
        onRefresh: () => {
          data.datasets[0].data.push({
            x: Date.now(),
            y: Math.random() * 100
          });
          data.datasets[1].data.push({
            x: Date.now(),
            y: Math.random() * 50
          });
        },
        delay: 2000
      }
    }
  }
};

export default LineChart;
