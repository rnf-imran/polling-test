import React, { Component } from "react";
import { database } from "../../assets/Firebase/Firebase.jsx";
class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [], data: [], loading: true };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var self = this;
    let question = {};

    console.log("1", this.state);
    database.ref("/poll").once("value", function(snapshot) {
      if (snapshot.val()) {
        var obj = snapshot.val();
        var key = Object.keys(obj);
        var arr = Array.from(Object.keys(obj), k => obj[k]);
        var totalVote = 0;
        arr.map(prop => {
          totalVote = totalVote + prop;
        });

        var statsData = [];
        arr.map(prop => {
          if (prop != 0) {
            let persent = 0;
            persent = parseFloat((prop / totalVote) * 100).toFixed(2);
            statsData.push(persent);
          } else {
            statsData.push(0);
          }
        });

        console.log("arr", arr);
        console.log("arr", key);
        console.log("arr", statsData);
        self.setState({ options: key, data: statsData });
      }
      self.setState({ loading: false });
    });
  }

  render() {
    if (this.state.loading === false) {
      console.log("this.state", this.state);
      return (
        <div className="content">
          {this.state.options.length > 0 ? (
            <div className="panel-body">
              <h5 className="text-danger">Result Of Poll :</h5>

              {this.state.options.map((prop, key) => {
                return (
                  <div className="progress">
                    {prop}:{this.state.data[key]}%
                  </div>
                );
              })}
              <hr />
            </div>
          ) : (
            <div>No Poll Data Found!</div>
          )}
        </div>
      );
    } else {
      return <div>Loading Data...........</div>;
    }
  }
}

export default Stats;
