import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import ewApi from "../../axios-ew";
import { getCurrentUser } from "../../services/authService";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends Component {
  state = {
    options1: {
      theme: "dark1",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "Number of contributions within each Faculty"
      },
      data: []
    },
    options2: {
      theme: "light1",
      animationEnabled: true,
      exportFileName: "New Year Resolutions",
      exportEnabled: true,
      title: {
        text: "Number of contributors within each Faculty"
      },
      data: []
    }
  };
  componentDidMount() {
    ewApi.get("chart/numberofcontribution").then(res => {
      var popData = this.populateDataOpt1(res);
      var data = [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y} articles</strong>",
          indexLabel: "{y}",
          indexLabelPlacement: "inside",
          dataPoints: popData
        }
      ];
      var newData = { ...this.state.options1, data };
      this.setState({ options1: newData });
    });
    ewApi.get("chart/numberofcontributor").then(res => {
      var popData = this.populateDataOpt2(res);
      var data = [
        {
          type: "column",
          showInLegend: true,
          legendText: "{label}",
          toolTipContent: "{label}: <strong>{y} Contributors</strong>",
          indexLabel: "{y}",
          indexLabelPlacement: "inside",
          dataPoints: popData
        }
      ];
      var newData = { ...this.state.options2, data };
      this.setState({ options2: newData });
    });
  }

  populateDataOpt1 = res => {
    for (var i = 0; i < res.data.length; i++) {
      res.data[i]["label"] = res.data[i].facultiesName;
      res.data[i]["y"] = res.data[i].contributionQuantity;
      delete res.data[i].facultiesName;
      delete res.data[i].contributorQuantity;
      delete res.data[i].contributionQuantity;
      delete res.data[i].contributionPercentage;
    }
    return res.data;
  };
  populateDataOpt2 = res => {
    for (var i = 0; i < res.data.length; i++) {
      res.data[i]["label"] = res.data[i].facultiesName;
      res.data[i]["y"] = res.data[i].contributorQuantity;
      delete res.data[i].facultiesName;
      delete res.data[i].contributorQuantity;
      delete res.data[i].contributionQuantity;
      delete res.data[i].contributionPercentage;
    }
    return res.data;
  };
  render() {
    var user = getCurrentUser();
    return (
      <div style={{ marginLeft: "80px" }}>
        <div className="row">
          {user.Roles === "Admin" || user.Roles==="Marketing Manager" ? (
            <React.Fragment>
              <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h2>Contributions Statistic</h2>
                  </div>
                  <CanvasJSChart options={this.state.options1} />
                </div>
              </div>
              <div className="col-xl-5 col-lg-6">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h2>Contributors Statistic</h2>
                  </div>
                  <CanvasJSChart options={this.state.options2} />
                </div>
              </div>
            </React.Fragment>
          ) : 
          <React.Fragment>
            <img src="/img/welcome.png" width="1400" height="900"></img>
          </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;
