import Highcharts, { Tooltip, TooltipFormatterContextObject } from "highcharts/highstock";
import EnrichedPoint from "../common/EnrichedPoint";
import Point from "../common/Point";

class HistogrmOpionsCreator {

  private histogramOptions: Highcharts.Options;

  constructor() {
    this.histogramOptions = {
      chart: {
        type: "column",
        backgroundColor: "rgba(0,0,0,0)"
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            color: "#FFFFFF"
          }
        }
      },
      legend: {
        enabled: false
      },
      series: [],
      tooltip: {
        formatter(this: TooltipFormatterContextObject) {
          let tooltip = `<br>X : ${this.x}<br>Y : ${this.y}<br>`;
          if (this.series.name === "Scatter points") {
            // @ts-ignore
            tooltip += `${this.point.description}`
          }

          return tooltip;
        }
      }
    }
  };

  AddScatterPoints = (scatterPoints: EnrichedPoint[]) => {
    this.histogramOptions.series?.push({
      name: "Scatter points",
      type: "scatter",
      data: scatterPoints,
      color: "#FF0000",
      marker: { radius: 8 },
    });

    return this;
  };

  AddLinePoints = (linePoints: Point[]) => {
    this.histogramOptions.series?.push({
      name: "survival function",
      type: "line",
      color: "#00FF00",
      data: linePoints,
      dataLabels: { enabled: false }
    });

    return this;
  }

  AddTitle = (title: string) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      title: {
        text: title,
        style: { color: "#FFFFFF" }
      }
    };

    return this;
  }

  SetNumberOFDigitsAfterTheDot = (numberOfDigits: number) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: `{point.y:.${numberOfDigits}f}%`
          }
        }
      }
    }

    return this;
  };

  SetYAxisTitle = (title: string) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      yAxis: {
        title: {
          text: title,
          style: {
            color: "#FFFFFF"
          }
        },
        labels: {
          style: {
            color: "#FFFFFF"
          }
        }
      }
    }

    return this;
  };

  GetHistogramOptions = () => {
    return this.histogramOptions;
  }

}

export default HistogrmOpionsCreator