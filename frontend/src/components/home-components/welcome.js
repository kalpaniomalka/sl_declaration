import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import homedata from '../../data/home.json';
import Typed from 'react-typed';
import {
    MDBEdgeHeader,
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBRow,
    MDBCardGroup,
    MDBCol,
    MDBAnimation 
} from 'mdbreact';
import axios from "axios";
import {Form,Button, Col,Card,Table, Overlay,Modal, ProgressBar} from 'react-bootstrap';


class Welcome extends Component {
    constructor(props){
        super(props);
        this.state={
            pwd: null,
            show: false,
            uname: null,
            modelShow: false,
            msg: null,
            success: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }  

    handleChange = (event) => {
		this.setState({pwd:event.target.value})
	} 

    handleChangeName = (event) => {
		this.setState({uname:event.target.value})
	} 

    handleSubmit(){
        var myData = [this.state.uname,this.state.pwd]
    
        let currentComponent = this;   

        if(myData[0] == 'user' && myData[1] == 'user'){
            this.props.history.push("/officerHome");
        }else{
            
            axios.get('http://127.0.0.1:5000/getUser',{
            params: {
                uname: myData[0],
                pwd: myData[1]
            }
            })
            .then(function(response){
                console.log(response.data);
                sessionStorage.setItem('userName', myData[0]);
                if(response.data == "1"){
                    currentComponent.setState({msg:"Successfully Logged In !"})
                    currentComponent.setState({success:true})
                    currentComponent.setState({modelShow:true})
                }
                else if(response.data == "0")
                    currentComponent.setState({msg:"Login Failed. Please Try Again !"})
                   // currentComponent.setState({success:false})
                    currentComponent.setState({modelShow:true})
                       
            }).catch(function(error){
                console.log(error);
            });
        }
    }
    
    CloseModal(){
      this.setState({modelShow:!this.state.modelShow})
      if(this.state.success == true){
        this.props.history.push("/");
      }
    }
    
    render () {
        let getData = homedata.herov1

        return (
            <div className="pge">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
     
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md='8' className='mx-auto'>
                        
     
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            
            <br/>
      <br/>
      <br/>
      <br/>
      <p style={{color:'#fff', float:'right', marginTop:'-200px', marginRight:"100px"}}><a href="#" style={{color:'#fff'}}>HOME</a></p>
      <div class="form-box1">
		<div class="header-text">
			LOGIN
		</div>
        
        <input placeholder="Your Username" type="text" onChange={this.handleChangeName}/> 
        <input placeholder="Your Password" type="password" onChange={this.handleChange}/> 
        <button onClick={this.handleSubmit}>login</button>
        <p style={{color:'#fff'}}>Don't have an account? <a href="#signup" style={{color:'#14E6F4'}}>SIGNUP</a></p>
        
	</div>
 
    <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>{this.state.msg}</strong></p><br/>
                                        
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


export default Welcome
