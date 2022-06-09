import React, { Component, useCallback } from 'react';
import { Container, Row} from 'reactstrap';
import homedata from '../../data/home.json';
import Typed from 'react-typed';
import Footer from '../global-components/footer';
import Navbar from '../global-components/navbar';
import {Form,Button, Col,Card,Table, Overlay,Modal} from 'react-bootstrap';
import { MultiUploader} from './uploader';
import axios from "axios";
import Grid from '@material-ui/core/Grid'
import DefaultUserPic from "../uploads/def.jpg";
import SearchField from "react-search-field";

class officerHome extends Component {
    constructor(props){
        super(props);
        this.state={
            msg:null,
            modelShow: false,
            arr: null,
            search_id:null,
            val: null,
            modelShow: false,
            user: false,
            type:"dec",
            username:null,
            email:null,
            passport:null,
            profession:null
        }

      //  this.UpdateProfileHandler = this.UpdateProfileHandler.bind(this);
    }

    componentDidMount(){
      //  this.arr = []

        let currentComponent = this;    

        axios.get('http://127.0.0.1:5000/getDeclarationData',{
            // params: {
            //  uname: sessionStorage.getItem('userName')
            // }
          })
          .then(function(response){
              console.log(response.data);
              if(response.data == "0"){

              }else{
                currentComponent.setState({arr:response.data['arr']})
                currentComponent.setState({user:false})
                console.log(currentComponent.state.arr)
              }
          }).catch(function(error){
              console.log(error);
          });      
    
    }

    getSearch() {
        console.log("awa")
    }

    handleSearch (e) {
        this.setState({ search_id: e.target.value })
    }
    
    handleGoClick () {
        var myData = [this.state.search_id]

        let currentComponent = this;        
    
        if(currentComponent.state.type == "dec"){
            console.log("awaaaa")
            axios.get('http://127.0.0.1:5000/getSearchValue', {
                params: {
                    id: myData[0]
                }
            }).then(function(response){
                console.log(response.data)
                currentComponent.setState({val:response.data['arr']})
                currentComponent.setState({user:false})
            }).catch(function(error){
                console.log(error);
            });
        }else if (currentComponent.state.type == "user"){
            axios.get('http://127.0.0.1:5000/getDataPass',{
                params: {
                 pid: myData[0]
                }
              })
              .then(function(response){
                  console.log(response.data);
                  currentComponent.setState({username:response.data["name"]})
                  currentComponent.setState({email:response.data["email"]})
                  currentComponent.setState({passport:response.data["passport"]})
                  currentComponent.setState({profession:response.data["profession"]})
                  currentComponent.setState({profileImage:response.data["pic"]})
                  currentComponent.setState({user:true})
              }).catch(function(error){
                  console.log(error);
              }); 
              
        }
    }
    approve(i){
        var myData = [i]

        let currentComponent = this;        
    
        axios.get('http://127.0.0.1:5000/approve', {
            params: {
                id: myData[0]
            }
        }).then(function(response){
            console.log(response.data)
            if (response.data = "success")
                currentComponent.setState({modelShow:true})
        }).catch(function(error){
            console.log(error);
        });
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
    }


    view = (e) => {
        let currentComponent = this;        
    
        if(e == "dec"){
            axios.get('http://127.0.0.1:5000/getDeclarationData',{
                // params: {
                //  uname: sessionStorage.getItem('userName')
                // }
              })
              .then(function(response){
                  console.log(response.data);
                  if(response.data == "0"){
    
                  }else{
                    currentComponent.setState({arr:response.data['arr']})
                    currentComponent.setState({type:"dec"})
                    currentComponent.setState({user:false})
                    console.log(currentComponent.state.arr)
                  }
              }).catch(function(error){
                  console.log(error);
              });  
        }
        else{   
           currentComponent.setState({type:"user"})
        }
    }

render(){

    const rows = this.state.arr;
    const row = this.state.val;
    return (
        <div>
             <Navbar />
             <br/> <br/> <br/>
             <br/> <br/> <br/>
             <br/> <br/> <br/>
             <Container style={{width:"1000px"}}>
             <div className="nav2">
                    <button  onClick={() => this.view("dec")} className="nav_link2">Search Declaration ID</button>
                    <button  onClick={() => this.view("user")} className="nav_link2">Search User</button>
            </div>
            <br/>
            <div className='search'>
                <form onSubmit={e => e.preventDefault()}>
                    <input
                    type='text'
                    size='45'
                    placeholder='Type Here....'
                    onChange={this.handleSearch.bind(this)}
                     />
                    <button
                    type='submit'
                    onClick={this.handleGoClick.bind(this)}>
                    Search
                    </button>
                </form>
            </div>

            <Row className="full-height align-items-center" style={{width:"1000px"}}>

            {
            row != null && this.state.type != "user"?
         <div className="row align-items-center" style={{width:"100%"}}>
                  <table id="question">
                        <thead>
                            <tr>
                                <th>Declaration ID </th>
                                <th>Passenger Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          row.map((q,i) =>(
                
                          <tr>
                            <td>{q[0]}</td>
                            <td>{q[1]}</td>
                            <td><button className='approve'  onClick={() => this.approve(q[0])}>Approve</button></td>
                          </tr>
                            ))
                        }
                        </tbody>
                  </table>     
                  <br/>
                  <br/>
                  <br/>
              </div>
       :null
    }

            {
            rows != null && this.state.type != "user"?
         <div className="row align-items-center" style={{width:"100%"}}>
                  <table id="question">
                        <thead>
                            <tr>
                                <th>Declaration ID </th>
                                <th>Passenger Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr>
                            <td>{q[0]}</td>
                            <td>{q[1]}</td>
                            <td><button className='approve' onClick={() => this.approve(q[0])}>Approve</button></td>
                          </tr>
                            ))
                        }
                        </tbody>
                  </table>     
                  <br/>
                  <br/>
                  <br/>
              </div>
       :null
    }


{
            this.state.user == true?
<Form className="form_1">     
    <p>{this.state.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Name</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.username} disabled/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control className="fields" type="email" defaultValue={this.state.email} disabled/>
  </Form.Group>
 
  <Form.Group controlId="formCategory2">
    <Form.Label>Passport No</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.passport} disabled/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Profession</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.profession} disabled/>
  </Form.Group>
  </Form>
    :null
}
    </Row>
            </Container>
        <br/> <br/> <br/>
        <br/> <br/> <br/>
        <Footer />

        <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>Approved !</strong></p><br/>
                                        
                                        </td>
                                        </tr>
                                      
                                      
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{this.CloseModal()}}>Close</Button>
                            </Modal.Footer>
            </Modal>

        </div>
    )
}

}


export default officerHome
