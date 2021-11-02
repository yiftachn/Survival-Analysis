import Highcharts, { Tooltip, TooltipFormatterContextObject } from "highcharts/highstock";
import Point from "../../common/Point";

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
      },
      legend: {
        enabled: false
      },
      series: [],
      tooltip: {
        formatter: function (this: TooltipFormatterContextObject, tooltip: Tooltip) {
          if (this.series.name === "survival function")
            return false;
          else
            return '<br>X : ' + this.x + '<br>Y : ' + this.y;
        }
      }
    }
  };

  AddScatterPoints = (scatterPoints: Point[]) => {
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
      dataLabels:{enabled:false}
    });

    return this;
  }

  AddTitle = (title: string) => {
    this.histogramOptions = {
      ...this.histogramOptions,
      title: {
        text: title,
        style:{color: "#FFFFFF"}
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
          text: title
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