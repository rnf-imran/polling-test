import React, { Component } from "react";

import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { database } from "../../assets/Firebase/Firebase.jsx";
import { Card } from "../../components/Card/Card.jsx";
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx";

import Button from "../../components/CustomButton/CustomButton.jsx";
import { Redirect } from "react-router-dom";

class Createquestion extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      count: 3,
      proprieties:[
        {
          label: "Option1",
          type: "text",
          id: "option1",
          bsClass: "form-control",
          placeholder: "Option1",
          
          onChange: this.handleChange
        },
        {
          label: "Option2",
          type: "text",
          id: "option2",
          bsClass: "form-control",
          placeholder: "Option2",
          
          onChange: this.handleChange
        },
        {
          label: "Option3",
          type: "text",
          id: "option3",
          bsClass: "form-control",
          placeholder: "Option3",
          
          onChange: this.handleChange
        }
      ]
    };

    
  }
  componentDidMount() {
    
  }
  handleChange = event => {
    console.log("events", event);

    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit() {
    console.log("data", this.state);
    delete this.state.proprieties;
    //this.setState({proprieties:null})
    if (this.state.question != "") {
      database.ref("/questions/").set(this.state.question);
      delete this.state.question;
      delete this.state.count;
      database.ref("/options/").set(this.state);
      this.props.history.push("/create");
    } else {
    }
  }
  addOption() {
    let count = this.state.count + 1;
    console.log("count", count);
    console.log("proprieties", proprieties);
    let proprieties = this.state.proprieties;
    console.log("proprieties", proprieties);
    let option = "option" + count;
    let inputProperty = {
      label: "Option" + count,
      type: "text",
      id: "option" + count,
      bsClass: "form-control",
      placeholder: "Option" + count,
      value: this.state.option,
      onChange: this.handleChange
    };
    proprieties.push(inputProperty);
    console.log("proprieties", proprieties);
    this.setState({ proprieties: proprieties });
    this.setState({ count: count });
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Add Question"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-5"]}
                      proprieties={[
                        {
                          label: "Question",
                          type: "text",
                          id: "question",
                          bsClass: "form-control",
                          placeholder: "Question",
                          value: this.state.question,
                          onChange: this.handleChange
                        }
                      ]}
                    />
                    <div>
                      {this.state.proprieties.map((prop,key) => {
                        return (
                          <FormInputs key={key}
                            ncols={["col-md-5"]}
                            proprieties={[prop]}
                          />
                        );
                      })}
                    </div>

                    <Button
                      bsStyle="info"
                      onClick={this.addOption}
                      pullLeft
                      fill
                      type="button"
                    >
                      Add Option
                    </Button>
                    <Button
                      bsStyle="info"
                      onClick={this.handleSubmit}
                      pullRight
                      fill
                      type="button"
                    >
                      Add Question
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Createquestion;
