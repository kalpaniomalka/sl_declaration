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
import jsPDF from "jspdf";

class payment extends Component {
    constructor(props){
        super(props)
        this.state={
            modelShow: false,
            Uploadfile: null,
            result: null,
            name:null,
            total:null,
            items:null,
            show: false,
            approved:false,
            modelShow:false
        }
         this.pay = this.pay.bind(this);
    }

    componentDidMount(){
            this.arr = []
         //   sessionStorage.setItem('pid', this.props.location.state.id);
            let currentComponent = this;    

            axios.get('http://127.0.0.1:5000/getApprovedDeclarationDetails',{
                params: {
                 id:  sessionStorage.getItem('pid')
                }
              })
              .then(function(response){
                  console.log(response.data['arr']);
                  currentComponent.setState({name:response.data['arr'][1]})
                  currentComponent.setState({items:response.data['arr'][2]})
                  currentComponent.setState({total:response.data['arr'][3]})
              }).catch(function(error){
                  console.log(error);
              });      
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
    }


    pay(){
        let currentComponent = this;    

            axios.get('http://127.0.0.1:5000/pay',{
                params: {
                 id:  sessionStorage.getItem('pid')
                }
              })
              .then(function(response){
                  console.log(response.data);
                  if (response.data == "success")
                    currentComponent.setState({modelShow:true})
              }).catch(function(error){
                  console.log(error);
              });     
    }
    

    next(){
        this.props.history.push({
            pathname: '/',
            search: '?query=',
            state: {}
        })
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
        this.next()
    }

    download = (imgName) => {
        var doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.text(120,20,"Payment Receipt")
        doc.text(120,50,"Declaration ID: "+sessionStorage.getItem('pid'))
        doc.text(120,70,"Name: "+sessionStorage.getItem('userName'))
        doc.text(120,90,"Number of Items: "+this.state.items)
        doc.text(120,110,"Total Amount($): "+this.state.total)
        doc.save("payment.pdf")
    }

    render () {
    let getData = homedata.herov2
    const rows = this.state.result;
    
    return (
    <div>
         <Navbar />
         <br/> <br/> <br/>
         <br/> <br/> <br/>
         <br/> 
         <div className='payment'>
         <Container style={{width:"1000px"}}>
            <Row className="full-height align-items-center" style={{width:"1000px"}}>
                    <Col>
                    <Card>
                    <Card.Body>
                <Col>
               
                <Form>
                 
  <Form.Group controlId="formCategory1">
    <Form.Label>Declaration ID</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={sessionStorage.getItem('pid')} disabled/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Name</Form.Label>
    <Form.Control className="fields" type="email" defaultValue={this.state.name} disabled/>
  </Form.Group>
 
  <Form.Group controlId="formCategory2">
    <Form.Label>No of Items</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.items} disabled/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>Total Amount</Form.Label>
    <Form.Control className="fields" type="text" defaultValue={this.state.total} disabled/>
  </Form.Group>

                   <br/>
                     
                 </Form>
                 </Col>
                </Card.Body>
                </Card>
                    </Col>
    
                <Col>
                <Card>
                <Card.Body>
                   
                    <Form>
                    <br/>
                    <Form.Group controlId="formCategory2">
    <Form.Label>Card Number</Form.Label>
    <Form.Control className="fields" type="email"/>
  </Form.Group>
 
  <Form.Group controlId="formCategory2">
    <Form.Label>Expiry Date</Form.Label>
    <Form.Control className="fields" type="text"/>
  </Form.Group>

  <Form.Group controlId="formCategory2">
    <Form.Label>CVV Code</Form.Label>
    <Form.Control className="fields" type="text"/>
  </Form.Group>
  <br/>
  <div className="col-sm-10">
                        <button className="next_btn" onClick={this.pay}><i className="fa fa-cog" aria-hidden="true"></i> Pay</button>
                    </div>
                 </Form>
                 
                    </Card.Body>
                </Card>
                </Col>


                </Row>
        </Container>
        </div>
        <br/><br/>
        <Footer />
 
        <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">QR Code</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>Payment Successfull !</strong></p><br/>
                                        <button className="downld" onClick={this.download}>Download Receipt</button>
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


export default payment
