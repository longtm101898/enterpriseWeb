import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import ewApi from "../../axios-ew";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends Component {
  state = {
    options: {
      theme: "dark1",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "Number of contributions within each Faculty"
      },
      data: []
    }
  };
  componentDidMount() {
    ewApi.get("chart/numberofcontribution").then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i]["label"] = res.data[i].facultiesName;
        res.data[i]["y"] = res.data[i].contributionQuantity;
        delete res.data[i].facultiesName;
        delete res.data[i].contributorQuantity;
        delete res.data[i].contributionQuantity;
        delete res.data[i].contributionPercentage;
      }
      var data = [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y}%</strong>",
          indexLabel: "{y}",
          indexLabelPlacement: "inside",
          dataPoints: res.data
        }
      ];
      var newData = { ...this.state.options, data };
      this.setState({ options: newData });
    });
  }
  render() {
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1>Statistic</h1>
        <CanvasJSChart
          options={this.state.options}
        />
      </div>
    );
  }
}

export default Dashboard;
