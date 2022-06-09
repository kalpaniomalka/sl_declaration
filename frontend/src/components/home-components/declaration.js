import React, { Component, useCallback } from 'react';
import { Container, Row} from 'reactstrap';
import homedata from '../../data/home.json';
import Typed from 'react-typed';
import Footer from '../global-components/footer';
import Navbar from '../global-components/navbar';
import {Form,Button, Col,Card,Table, Overlay,Modal} from 'react-bootstrap';
import { MultiUploader} from './uploader';
import axios from "axios";

class Declaration extends Component {
    constructor(props){
        super(props)
        this.state={
            modelShow: false,
            Uploadfile: null,
            result: "",
            illegal: null, 
            firesrms: null, 
            commercial: null,
            unprocessed: null,
            airport: null,
            region: null,
            uname: null,
            id: null,
            uploaded:false,
            purpose:null
        }
        this.next = this.next.bind(this);
        this.upload = this.upload.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount(){
        this.uname = sessionStorage.getItem('userName');
        console.log(this.uname)
    }


    upload(e) {
       let file = e.target.files[0]
       const data = new FormData();
       data.append('file', file);
       data.append('filename', "aa");
       data.append('uname', sessionStorage.getItem('userName'))

       let currentComponent = this;

       axios({
        url: 'http://localhost:5000/checkItem',
        method: "POST",
        data:data
    }).then((response) => {
        console.log(response.data)
        let temp = currentComponent.state.result;
        temp = temp + ""+ response.data + "|";
        console.log(temp)
        currentComponent.setState({result:temp});
        console.log(currentComponent.state.result)
        currentComponent.setState({modelShow:true})
    });
        
    }

    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
        this.setState({uploaded:true})
    }

    handleInputChangePurpose = (e) => {
        this.setState({purpose:e.target.value})
    }


    handleInputChangeAirport = (e) => {
        this.setState({airport:e.target.value})
    }

    handleInputChangeRegion = (e) => {
        this.setState({region:e.target.value})
    }

    illegalYes = (e) => {
        this.setState({illegal:"yes"})
    }

    illegalNo = (e) => {
        this.setState({illegal:"no"})
    }

    firesrmsYes = (e) => {
        this.setState({firesrms:"yes"})
    }
    
    firesrmsNo = (e) => {
        this.setState({firesrms:"no"})
    }

    commercialYes = (e) => {
        this.setState({commercial:"yes"})
    }

    commercialNo = (e) =>{
        this.setState({commercial:"no"})
    }

    unprocessedYes = (e) => {
        this.setState({unprocessed:"yes"})
    }

    unprocessedNo = (e) => {
        this.setState({unprocessed:"no"})
    }

    
    submitData(){
        var myData = [this.uname,this.state.airport,this.state.region,this.state.illegal,this.state.firesrms,
            this.state.commercial,this.state.unprocessed, this.state.purpose, this.state.result]

        let currentComponent = this;        
    
        axios.get('http://127.0.0.1:5000/submitData', {
            params: {
                uname: myData[0],
                airport: myData[1],
                region: myData[2],
                illegal: myData[3],
                firesrms: myData[4],
                commercial: myData[5],
                unprocessed: myData[6],
                purpose:myData[7],
                images: myData[8]
            }
        }).then(function(response){
            console.log(response.data)
            if (response.data['status'] = "success")
                currentComponent.setState({id:response.data['id']})
                currentComponent.next()
        }).catch(function(error){
            console.log(error);
        });
    }

    next(){
        this.props.history.push({
            pathname: '/declarationNext',
            search: '?query=',
            state: { img: this.state.result, airport:this.state.airport,region:this.state.region
                    ,illegal:this.state.illegal, firesrms:this.state.firesrms, commercial: this.state.commercial,
                    unprocessed:this.state.unprocessed, id:this.state.id, purpose:this.state.purpose}
        })
    }

    render () {
    let getData = homedata.herov2
    return (
    <div>
         <Navbar />
         <br/><br/>
         <br/><br/>
         <br/><br/>
         <br/><br/>
         <Container>
                <Row className="align-items-center">
                    <div className="hero-content col-lg-12 p-50px-t p-50px-b md-p-10px-b text-center">
                        <h2 className="m-30px-b">{getData.title}<br/>
                        <Typed 
                        strings={getData.typedText}
                        typeSpeed={70}
                        backSpeed={50} 
                        class="typed">
                        <span className="typed"></span>
                        </Typed>
                        </h2>
                        <p className="m-50px-b md-m-30px-b">
                            {getData.desc}
                        </p>
                    <div>
                </div>                    
                </div>
            </Row>
            </Container>
         <div className='data_form'>
                <Row>
                    <Col>
                    <Card>
                    <Card.Body>
                <Col md={10}>
               
                <Form>

                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Purpose of Arrival</Form.Label>
                            <Form.Control as="select" onChange={this.handleInputChangePurpose} className='opt'>
                                <option value='' selected disabled>Select Answer</option>
                                <option value='Personal'>Personal</option>
                                <option value='Tourist'>Tourist</option>
                                <option value='Study'>Study</option>
                                <option value='Employement'>Employement</option>
                                <option value='Immigrate'>Immigrate</option>
                            </Form.Control>
                    </Form.Group> 
                    <br/>
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Arrival Airport</Form.Label>
                            <Form.Control as="select" onChange={this.handleInputChangeAirport} className='opt'>
                                <option value='' selected disabled>Select Airport</option>
                                <option value='CMB Katunayake'>CMB Katunayake</option>
                                <option value='RML Ratmalana'>RML Ratmalana</option>
                            </Form.Control>
                    </Form.Group> 
                    <br/>
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Departure Region</Form.Label>
                            <Form.Control as="select" onChange={this.handleInputChangeRegion} className='opt'>
                                <option value='' selected disabled>Select Departure Region</option>
                                <option value='North America'>North America</option>
                                <option value='South America'>South America</option>
                                <option value='Europe'>Europe</option>
                                <option value='Middle East'>Middle East</option>
                                <option value='Africa'>Africa</option>
                                <option value='East Asia'>East Asia</option>
                                <option value='South Asia'>South Asia</option>
                                <option value='Australia'>Australia</option>
                            </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Any illegale items brought in to the country</Form.Label>
                        <br/>
                        <Form.Check
                            inline
                            label="Yes"
                            name="group"
                            type='radio'
                            onChange={(e)=>this.illegalYes(e)}
                       
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="group"
                            type='radio'
                            onChange={(e)=>this.illegalNo(e)}
                       
                        />
                    </Form.Group>     
       
                    <br/>
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Any firesrms brought in to the country</Form.Label>
                        <br/>
                        <Form.Check
                            inline
                            label="Yes"
                            name="group1"
                            type='radio'
                            onChange={(e)=>this.firesrmsYes(e)}
                       
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="group1"
                            type='radio'
                            onChange={(e)=>this.firesrmsNo(e)}
                       
                        />
                    </Form.Group>   

                    <br/>
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Any commercial goods brought in to the country</Form.Label>
                        <br/>
                        <Form.Check
                            inline
                            label="Yes"
                            name="group2"
                            type='radio'
                            onChange={(e)=>this.commercialYes(e)}
                       
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="group2"
                            type='radio'
                            onChange={(e)=>this.commercialNo(e)}
                       
                        />
                    </Form.Group>     
                    <br/>
                    
                    <Form.Group controlId="EMP_Dep">
                        <Form.Label>Any fruits or unprocessed food items brought in to the country</Form.Label>
                        <br/>
                        <Form.Check
                            inline
                            label="Yes"
                            name="group3"
                            type='radio'  
                            onChange={(e)=>this.unprocessedYes(e)}
                        />
                        <Form.Check
                            inline
                            label="No"
                            name="group3"
                            type='radio'
                            onChange={(e)=>this.unprocessedNo(e)}
                        />
                    </Form.Group>   
                 </Form>

<br/>
                 Upload Your Files
                 <br/>   <br/>
                 {
                    this.state.uploaded == false?
            <div className='chooser'>
                    <input
                        type="file"
                        onChange={(e)=>this.upload(e)}
                        className='chooser'
                    />
    
                </div>
                 :null
                }

                {
                    this.state.uploaded == true?
            <div className='chooser'>
                <label htmlFor="filePicker">
                To Upload More Items
                </label>
                    <input
                        type="file"
                        onChange={(e)=>this.upload(e)}
                        className='chooserafter'
                    />
    
                </div>
                 :null
                }
    <br/>
                <div className="col-sm-9">
                        <button className="next_btn" onClick={this.submitData}><i className="fa fa-cog" aria-hidden="true"></i> Save and Procceed</button>
                    </div>
                 </Col>
                </Card.Body>
                </Card>
                    </Col>

                </Row>
                </div>
                <br/><br/>
         <br/><br/>
         <br/><br/>
        <Footer />


        <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>Image Uploaded Successfully !</strong></p><br/>
                                        
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


export default Declaration
