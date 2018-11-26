import React, { Component } from "react";
import { database } from "../../assets/Firebase/Firebase.jsx";
class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = { results: {}, loading: true, optionSelect: "", success: "",isDisabled:false };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addOption = this.addOption.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    var self = this;
    

    console.log("1", this.state);
    database.ref("/questions").once("value", function(snapshot) {
      if (snapshot.val()) {
        self.setState({ question: snapshot.val() });
      }
    });
    database.ref("/options").once("value", function(snapshot) {
      if (snapshot.val()) {
        var obj = snapshot.val();

        var arr = Array.from(Object.keys(obj), k => obj[k]);

        self.setState({ options: arr });
      }
      self.setState({ loading: false });
      
    });
  }

  addOption() {
    var option = "";
    for (let i = 1; i <= this.state.count; i++) {
      option +=
        '<div className="radio"><input type="radio" name="group-poll" />' +
        this.state.option +
        i +
        "</div>";
    }

    return option;
  }
  handleOnChange(val) {
    console.log(val);
    this.setState({ optionSelect: val });
  }

  handleClick(props) {
    let self = this;
    self.setState({ isDisabled: true });
    database
      .ref("/poll/" + self.state.optionSelect)
      .once("value", function(snapshot) {
        if (snapshot.val()) {
          let pollCount = parseInt(snapshot.val());
          pollCount = pollCount + 1;
          database.ref("/poll/" + self.state.optionSelect).set(pollCount);
        } else {
          database.ref("/poll/" + self.state.optionSelect).set(1);
        }
        self.setState({ loading: false });
        const divStyle = {
          margin: "18px,0px,0px,0px"
        };
       
        self.setState({
          success: (
            <div className="alert alert-success" style={divStyle}>
              Thank you for your participation!
            </div>
          )
        });
        self.props.history.push("/stats");
       
      });
  }
  render() {
    if (this.state.loading === false) {
      console.log("this.state", this.state);

      return (
        <div className="content">
          {this.state.success}
          {this.state.options ? (
            <div className="user-poll-section">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <strong>Question : </strong>
                  {this.state.question}
                </div>
                <div className="panel-body">
                  {this.state.options.map((prop, key) => {
                    return (
                      <div key={key}>
                        <input
                          type="radio"
                          name="group-poll"
                          value={prop}
                          onChange={() => this.handleOnChange(prop)}
                        />
                        <strong>{prop}</strong>
                      </div>
                    );
                  })}
                </div>
               {this.state.isDisabled === true?
                <button
                  type="button"
                  disabled ={this.state.isDisabled}
                  className="btn-fill pull-right btn btn-info"
                  onClick={() => this.handleClick()}
                >
                  Vote
                </button>
                :
                <button
                  type="button"
                 
                  className="btn-fill pull-right btn btn-info"
                  onClick={() => this.handleClick()}
                >
                  Vote
                </button>
                }
              </div>
            </div>
          ) : (
            <div>No Data Found!</div>
          )}
        </div>
      );
    } else {
      return <div>Loading Data...........</div>;
    }
  }
}

export default Poll;
