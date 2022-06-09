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

class travelProfile extends Component {
    constructor(props){
        super(props);
        this.state={
            user_id:null,
            username:null,
            email:null,
            passport:null,
            profileImage:null,
            msg:null,
            uploadedFile:null,
            new_name:null,
            new_email:null,
            new_passport:null,
            modelShow: false,
            result:null,
            profession:null,
            new_profession: null
        }

        this.UpdateProfileHandler = this.UpdateProfileHandler.bind(this);
    }

    componentDidMount(){
        this.arr = []

        let currentComponent = this;    

        this.setState({uname:sessionStorage.getItem('userName')});

        axios.get('http://127.0.0.1:5000/getData',{
            params: {
             uname: sessionStorage.getItem('userName')
            }
          })
          .then(function(response){
              console.log(response.data);
              currentComponent.setState({username:response.data["name"]})
              currentComponent.setState({email:response.data["email"]})
              currentComponent.setState({passport:response.data["passport"]})
              currentComponent.setState({profession:response.data["profession"]})
              currentComponent.setState({profileImage:response.data["pic"]})
          }).catch(function(error){
              console.log(error);
          }); 
          
          this.arr = []  

          axios.get('http://127.0.0.1:5000/getQR',{
              params: {
               uname: sessionStorage.getItem('userName')
              }
            })
            .then(function(response){
                console.log(response.data['arr']);
                for (let i = 0; i < response.data['arr'].length; i++) {
                  let val = (response.data['arr'][i][1]).split("_")
                  console.log(val)
                  let value = val[1].split(".")
                  currentComponent.arr.push(value[0])
                }
                currentComponent.setState({result:response.data['arr']})
            }).catch(function(error){
                console.log(error);
            });
    
    }

    changeProfileImage(e){
        let file = e.target.files[0]
        const data = new FormData();
        data.append('file', file);
        data.append('filename', "aa");
        data.append('uname', sessionStorage.getItem('userName'))
        let currentComponent = this;
 
        axios({
         url: 'http://127.0.0.1:5000/uploadPic',
         method: "POST",
         data:data
     }).then((response) => {
         console.log(response.data)
         currentComponent.setState({profileImage:sessionStorage.getItem('userName')+".png"})
     });
    }

    nameHandler(e){
        this.setState({new_name:e.target.value})
    }

    emailHandler(e){
        this.setState({new_email:e.target.value})
    }

    passportHandler(e){
        this.setState({new_passport:e.target.value})
    }

    passportHandler(e){
        this.setState({new_profession:e.target.value})
    }

    UpdateProfileHandler(){
        var val1 = this.state.username
        var val2 = this.state.email
        var val3 = this.state.passport
        var val4 = this.state.profession

        if (this.state.new_name != null){
            val1 = this.state.new_name
        }
        if (this.state.new_email != null){
            val2 = this.state.new_email
        }
        if (this.state.new_passport != null){
            val3 = this.state.new_passport
        }
        if (this.state.new_profession != null){
            val4 = this.state.new_profession
        }

        var myData = [val1,val2,val3,this.state.profileImage,val4]
        console.log(myData)
        let currentComponent = this;        
    
        axios.get('http://127.0.0.1:5000/updateUserData', {
            params: {
                uname: sessionStorage.getItem('userName'),
                name: myData[0],
                email: myData[1],
                passport: myData[2],
                pic:myData[3],
                profession: myData[4]
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

render(){

    // if(this.state.profileImage){
    //     var imagestr=this.state.profileImage;
    //     imagestr = imagestr.replace("public/", "");
    //     var profilePic="http://localhost:5000/"+imagestr;
    // }else{
    //      profilePic=DefaultUserPic;
    // }

    var profilePic=DefaultUserPic;
    const rows = this.state.result;

    return (
        <div>
             <Navbar />
             <br/> <br/> <br/>
             <br/> <br/> <br/>
             <br/> <br/> <br/>
        <Container>
        <Row>
       <Col>
       <h5>{sessionStorage.getItem('userName')}</h5>
       {
        this.state.profileImage == null?
        <img src={profilePic} alt="profils pic" />
       :null
        }

        {
        this.state.profileImage != null?
        <img src={"/assets/img/pro_pic/"+this.state.profileImage}  alt="profils pic" />
       :null
        }

<Form className="form">     
    <p>{this.state.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Name</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.username} onChange={(e)=>this.nameHandler(e)}/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control className="fields" type="email" defaultValue={this.state.email} onChange={(e)=>this.emailHandler(e)} />
  </Form.Group>
 
  <Form.Group controlId="formCategory2">
    <Form.Label>Passport No</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.passport} onChange={(e)=>this.passportHandler(e)} />
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Profession</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.profession} onChange={(e)=>this.professionHandler(e)} />
  </Form.Group>

  <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control className="fields" type="file" name="profileImage" onChange={(e) => this.changeProfileImage(e)}/>
    </Form.Group>
    <br/><br/>
  <Button className="profile_btn"  onClick={this.UpdateProfileHandler}>Update Profile</Button>
  </Form>

       </Col>
        <Col className="tbl_dec">
            {
            rows != null?
         <div>
                  <table id="question">
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr className="tr_declarations">
                              <td>Declaration {i+1}</td>
                            <td>{q[0]}</td>
                            <td>{this.arr[i]}</td>
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

   </Col>

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
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>Updated Successfully !</strong></p><br/>
                                        
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


export default travelProfile
