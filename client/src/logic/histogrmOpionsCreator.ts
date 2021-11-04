import Highcharts, { TooltipFormatterContextObject } from "highcharts/highstock";
import EnrichedPoint from "../common/EnrichedPoint";
import Point from "../common/Point";

const MAIN_COLOR = "#FFFFFF";
const SECONDARY_COLOR = "#FF0000";
const THIRD_COLOR = "#00FF00"

class HistogrmOpionsCreator {

  private histogramOptions: Highcharts.Options;

  constructor() {
    this.histogramOptions = {
      credits: {
        enabled: false
      },
      chart: {
        type: "column",
        backgroundColor: "rgba(0,0,0,0)"
      },
      xAxis: {
        type: 'category',
        labels: {
          style: {
            color: MAIN_COLOR
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
      color: THIRD_COLOR,
      marker: { radius: 8 },
    });

    return this;
  };

  AddLinePoints = (linePoints: Point[]) => {
    this.histogramOptions.series?.push({
      name: "survival function",
      type: "line",
      color: SECONDARY_COLOR,
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
        style: { color: MAIN_COLOR }
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
            color: MAIN_COLOR
          }
        },
        labels: {
          style: {
            color: MAIN_COLOR
          }
        }
      }
    }

    return this;
  };

  SetXAxisTitle = (title: string) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      xAxis: {
        title: {
          text: title,
          style: {
            color: MAIN_COLOR
          }
        },
        labels: {
          style: {
            color: MAIN_COLOR
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

export default HistogrmOpionsCreator;