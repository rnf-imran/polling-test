import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import Button from "../../components/CustomButton/CustomButton.jsx";
import { Route, Switch, Link } from "react-router-dom";
import { database } from '../../assets/Firebase/Firebase.jsx';
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [] ,question:[], loading: true};
    this.componentDidMount =  this.componentDidMount.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    
  }

//   componentDidMount() {
  
//     fetch("http://localhost:5000/create")
//     .then(res => res.json())
//     .then(result => {
//       var thArray = ["Oquestion","Option1", "Option2", "Option3","Action"];
//       let tdArray ;
//       tdArray = [];
//     console.log('result',result);
//       result.map((pros,key)=>{
//           let data;
//           data = [];
//           //data.push(pros.description);
//           data.push(pros.question.value);
//           data.push(pros.options.option1);
//           data.push(pros.options.option2);
//           data.push(pros.options.option3);
//           data.push(<a href="">Delete</a>);
//          // data.push(<span className="label label-success"><a href="/ideatemix/edit?id=6" >Edit</a></span>);
//           tdArray.push(data);
//       })
   

//       this.setState({ thArray: thArray, tdArray:tdArray});
//       console.log("res",this.state);
//     });

//     var self = this;
//     let question = {}
//       database.ref('/questions/').on('value', function(snapshot) {
//           if(snapshot.val()){
//               question.boxQ = snapshot.val().boxQ
//               question.options = snapshot.val().options
//               self.setState({ loading: false, question : question, edit: false })
//           }
//           console.log('question did: ', question);
// });

//   }

componentDidMount(props){
  var self = this;
  let question = {}
 
  console.log('1',this.state);
    database.ref('/questions').once('value', function(snapshot) {
        
        if(snapshot.val()){
        
          self.setState({ question : snapshot.val() });
         // self.setState({ tdArray : snapshot.val() , thArray:thArray,loading:false});
        }
 
        
    });


    database.ref('/options').once('value', function(snapshot) {
        
      if(snapshot.val()){
        var obj = snapshot.val();
        var arr = Array.from(Object.keys(obj), k=>obj[k]);
      

        self.setState({ options : arr});
       // self.setState({ tdArray : snapshot.val() , thArray:thArray,loading:false});
      }
      self.setState({ loading:false});
     // console.log('snapshot',snapshot.val());
      
  });

  var thArray = [];
  thArray.push("Question");
    //console.log('snapshot',data)
}

deleteQuestion(){
  
  let data = {};
  //delete this.state.tdArray;
  database.ref('/questions/').set(data);
  database.ref('/options/').set(data);
  database.ref('/poll/').set(data);
  this.setState({options:data,question:data,loading:false});
} 
  render() {
 
    if(this.state.loading===false){
      console.log('this.state',this.state);
    return (
      <div className="content">
      <Link to="/createquestion">Create Question</Link>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Survey"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                     {this.state.options.length>0?
                    
                    <thead>
                      <tr>
                       <th>Question</th>
                        {this.state.options.map((prop, key) => {
                          
                        return <th key={key}>Option{key+1}</th>;
                        })
                        
                        }
                        <th>Action</th>
                      </tr>
                    </thead>
                    :<thead>
                    <tr><th>No Data Found!</th></tr></thead>
                      }
                      
                    <tbody>
                    <tr>
                    <td >{this.state.question}</td>
                    {this.state.options.map((prop, key) => {
                          
                          return <td key={key}>{prop}</td>;
                          })
                          
                          }
                          
                          {this.state.options.length>0?
                          <td ><Button bsStyle="info" onClick={this.deleteQuestion} pullRight fill type="button">
        Delete
      </Button></td>:
      <td></td>
      }
                     </tr>
                    </tbody>
                  </Table>
                }
              />
            </Col>

            
          </Row>
        </Grid>
      </div>
    );
  }else{
    return (<div>Loading Data...........</div>);
  }


}
}

export default Create;
