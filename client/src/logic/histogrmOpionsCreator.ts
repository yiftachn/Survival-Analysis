import Highcharts, { TooltipFormatterContextObject } from "highcharts/highstock";
import EnrichedPoint from "../common/EnrichedPoint";
import Point from "../common/Point";

const MAIN_COLOR = "#FFFFFF";
const SECONDARY_COLOR = "#00FF00";
const THIRD_COLOR = "#FF0000"
const DIGITS_AFTER_DOT = 2;
const MAX_YAXIAS_HEIGHT = 100;

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
        itemHoverStyle: {
          color: "#b6b8b6"
        },
        itemStyle: {
          color: MAIN_COLOR
        },
        enabled: true,
        align: "left",
        verticalAlign: "top"
      },
      series: [],
      tooltip: {
        formatter(this: TooltipFormatterContextObject) {
          let tooltip = `<br>X : ${this.x.toFixed(DIGITS_AFTER_DOT)}
              <br>Y : ${this.y.toFixed(DIGITS_AFTER_DOT)}<br>`;
          if (this.series.name === "Scatter Points") {
            // @ts-ignore
            tooltip += `${this.point.description}`
          }

          return tooltip;
        }
      }
    }
  };

  public AddScatterPoints = (scatterPoints: EnrichedPoint[]) => {
    this.histogramOptions.series?.push({
      name: "Scatter Points",
      type: "scatter",
      data: scatterPoints,
      color: THIRD_COLOR,
      marker: { radius: 8 },
    });

    return this;
  };

  public AddLinePoints = (linePoints: Point[]) => {
    this.histogramOptions.series?.push({
      name: "Survival Function",
      type: "line",
      color: SECONDARY_COLOR,
      data: linePoints,
      dataLabels: { enabled: false }
    });

    return this;
  }

  public AddTitle = (title: string) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      title: {
        text: title,
        style: { color: MAIN_COLOR }
      }
    };

    return this;
  }

  public SetNumberOFDigitsAfterTheDot = (numberOfDigits: number) => {
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

  public SetYAxisTitle = (title: string) => {
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
        },
        max: MAX_YAXIAS_HEIGHT
      }
    }

    return this;
  };

  public SetXAxisTitle = (title: string) => {
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

  public GetHistogramOptions = () => {
    return this.histogramOptions;
  }


}

export default HistogrmOpionsCreator;