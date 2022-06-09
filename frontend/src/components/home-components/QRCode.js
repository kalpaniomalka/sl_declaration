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

class QRCode extends Component {
    constructor(props){
        super(props)
        this.state={
            modelShow: false,
            Uploadfile: null,
            result: null,
            illegal: null, 
            firesrms: null, 
            commercial: null,
            unprocessed: null,
            airport: null,
            region: null,
            uname: null,
            quantity: 0,
            price: 0,
            show: false,
            approved:false,
            qr_clicked : false
        }
        this.viewImage = this.viewImage.bind(this);
    }

    componentDidMount(){
            this.arr = []
            this.img = ""

            let currentComponent = this;    

            this.setState({uname:sessionStorage.getItem('userName')});

            axios.get('http://127.0.0.1:5000/getQR',{
                params: {
                 uname: sessionStorage.getItem('userName')
                }
              })
              .then(function(response){
                  console.log(response.data['arr']);
                  currentComponent.img = response.data['arr'][0][1]
                  for (let i = 0; i < response.data['arr'].length; i++) {
                    let val = (response.data['arr'][i][1]).split("_")
                    console.log(val)
                    let value = val[1].split(".")
                    currentComponent.arr.push(value[0])
                  }
                  currentComponent.setState({result:response.data['arr']})
                  console.log(currentComponent.img)
              }).catch(function(error){
                  console.log(error);
              });      
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
    }

    viewImage(q){
        console.log(q)
        this.img = q
        this.setState({modelShow:true})
    }

    view = (e) => {
        let currentComponent = this;        
    
        if(e == "all"){
            axios.get('http://127.0.0.1:5000/getQR', {
                params: {
                    uname: sessionStorage.getItem('userName')
                }
            }).then(function(response){
                console.log(response.data['arr']);
                if(response.data != "0"){
                    for (let i = 0; i < response.data['arr'].length; i++) {
                        let val = (response.data['arr'][i][1]).split("_")
                        console.log(val)
                        let value = val[1].split(".")
                        currentComponent.arr.push(value[0])
                    }
                    currentComponent.setState({result:response.data['arr']})
                    currentComponent.setState({approved:false})
                }
                
            }).catch(function(error){
                console.log(error);
            });
        }
        else{
           
            axios.get('http://127.0.0.1:5000/getApprovedQR', {
                params: {
                    uname: sessionStorage.getItem('userName')
                }
            }).then(function(response){
                console.log(response.data['arr']);
                if(response.data != "0"){
                    for (let i = 0; i < response.data['arr'].length; i++) {
                        let val = (response.data['arr'][i][1]).split("_")
                        console.log(val)
                        let value = val[1].split(".")
                        currentComponent.arr.push(value[0])
                    }
                    currentComponent.setState({result:response.data['arr']})
                    currentComponent.setState({approved:true})
                }
                else{
                    currentComponent.setState({modelShow:true})
                }
            }).catch(function(error){
                console.log(error);
            });
        }
    }

    pay(q){
        sessionStorage.setItem('pid', q);
        this.props.history.push({
            pathname: '/pay',
            search: '?query=',
            state: { id: q}
        })
    }

    setImg(q){
        console.log(q)
        this.img = q
        this.setState({qr_clicked:!this.state.qr_clicked})
        console.log(this.img)
    }

    render () {
    let getData = homedata.herov2
    const rows = this.state.result;
    
    return (
    <div>
         <Navbar />
         <br/> <br/> <br/>
         <br/> <br/> <br/>
         <div className='qr'>
         <Container style={{width:"1000px"}}>
                <Row className="full-height align-items-center" style={{width:"1000px"}}>

                <div className="nav2">
                    <button  onClick={() => this.view("all")} className="nav_link2">All Declarations</button>
                    <button  onClick={() => this.view("approved")} className="nav_link2">Approved Declarations</button>
            </div>

            <Col>
            {
            rows != null?
         <div className="" style={{width:"100%"}}>
                  <table id="question">
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr>
                              <td>Declaration {i+1}</td>
                            <td onClick={() => this.setImg(q[1])}>{q[0]}</td>
                            <td onClick={() => this.setImg(q[1])}>{this.arr[i]}</td>
                            {
                                this.state.approved?
                                <td><button className='approve'  onClick={() => this.pay(q[0])}>Pay</button></td>
                                :null
                            }
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
<Col className="img_qr">
{
            this.state.qr_clicked == false?
            <div>
<img src={"/assets/img/qrcodes/"+this.img} className="" alt="logo" height="300px" width="300px"></img>
            </div>

  :null
}

{
            this.state.qr_clicked == true?
            <div>
<img src={"/assets/img/qrcodes/"+this.img} className="" alt="logo" height="300px" width="300px"></img>
            </div>

  :null
}
</Col>
    <br/>
    <br/>  <br/>
    <br/>
    </Row>
            </Container>
            </div>
        <Footer />
 
        <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">QR Code</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                       <p className="m-0" style={{fontSize:'20px'}}><strong>Approved Declarations not Available.</strong></p><br/>
                                        
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


export default QRCode
