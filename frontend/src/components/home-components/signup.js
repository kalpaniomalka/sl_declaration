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


class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            pwd: null,
            passportNo:null,
            show: false,
            uname: null,
            modelShow: false,
            msg: null,
            email:null,
            confirm:null,
            success : null,
            mesg : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = (event) => {
          this.setState({pwd:event.target.value})
      } 
  
    handleChangeName = (event) => {
          this.setState({uname:event.target.value})
      } 
  
      
    handleChangeEmail = (event) => {
      this.setState({email:event.target.value})
  } 
  
  handleChangeConfirm = (event) => {
      this.setState({confirm:event.target.value})
  } 
  
  handleChangePassportNo = (event) => {
          this.setState({passportNo:event.target.value})
  }

    handleSubmit(){
        if(this.state.pwd == this.state.confirm){
            var myData = [this.state.uname,this.state.pwd,this.state.email,this.state.passportNo]
            
            let currentComponent = this;   
            
            axios.get('http://127.0.0.1:5000/addUser',{
                params: {
                    uname: myData[0],
                    pwd: myData[1],
                    email: myData[2],
                    pasportNo: myData[3]
                }
            })
            .then(function(response){
                console.log(response.data);
                sessionStorage.setItem('userName', myData[0]);
                if(response.data == "success"){
                    currentComponent.setState({msg:"Successfully Registered !"})
                    currentComponent.setState({modelShow:true});
                    currentComponent.setState({success:response.data})    
                }else{
                    currentComponent.setState({msg:"Registration Failed. Please Try Again !"})
                    currentComponent.setState({modelShow:true});    
                }        
            }).catch(function(error){
                console.log(error);
            });
        }else{
            alert("Password doesn't match!")
        }
            
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
        if(this.state.success != null){
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
      <p style={{color:'#fff', float:'right', marginTop:'-200px', marginRight:"100px"}}><a href="#" style={{color:'#000'}}>HOME</a></p>
      <div class="form-box">
		<div class="header-text">
			SIGNUP
		</div>
        
        <input placeholder="Your Name" type="text" onChange={this.handleChangeName}/> 
        <input placeholder="Your Email" type="text" onChange={this.handleChangeEmail}/> 
        <input placeholder="Passport Number" type="text" onChange={this.handleChangePassportNo}/>   
        <input placeholder="Your Password" type="password" onChange={this.handleChange}/> 
        <input placeholder="Confirm Password" type="password" onChange={this.handleChangeConfirm}/> 
        <input id="terms" type="checkbox"/> <label for="terms"></label>
        <span style={{color:'#fff'}}>Agree with <a href="#">Terms & Conditions</a></span> 
        <button onClick={this.handleSubmit}>SIGNUP</button>
        <p style={{color:'#fff'}}>Already have an account? <a href="#login" style={{color:'#14E6F4'}}>LOGIN</a></p>
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


export default Signup
