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

class DeclarationNext extends Component {
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
            id: null
        }
        this.getSummary = this.getSummary.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    componentDidMount(){
        if( this.props.location.state != null){
            this.val1 =  Object.values((this.props.location.state.img).split("|"))
        //  this.setState({result:(this.val1).split("|")})
            this.value = []
            this.arr = []
            this.type = []
            this.total = 0
            this.hs = []

	        for (let i = 0; i < this.val1.length; i++) {
                if(this.val1[i].length != 0){
                    this.arr.push(this.val1[i])
                    let val = this.val1[i].split("_")
                    this.type.push(val[1])
                    if(val[1] == "laptop"){
                        this.value.push("400")
                        this.hs.push('84713010')
                    }
                    else if(val[1] == "phone"){
                        this.value.push("300")
                        this.hs.push('54713518')
                    }
                    else if(val[1] == "flask"){
                        this.value.push("200")
                        this.hs.push('14715090')
                    }
                }        
            }
            this.qty = Array(this.arr.length).fill(0)
            this.pr = Array(this.arr.length).fill(0)

            this.setState({uname:sessionStorage.getItem('userName')});

            this.val2 = this.props.location.state.airport
            this.val3 = this.props.location.state.region
            this.val4 = this.props.location.state.illegal
            this.val5 = this.props.location.state.firesrms
            this.val6 = this.props.location.state.commercial
            this.val7 = this.props.location.state.unprocessed
            this.val8 = this.props.location.state.id
            this.val9 = this.props.location.state.purpose
        }
    }

    getQuantity = (e,i) =>{
        this.qty[i] = e.target.value
        console.log(this.qty)
    }

    getPrice = (e,i) =>{
        this.pr[i] = e.target.value
        console.log(this.pr)
    }
        
    CloseModal(){
        this.setState({modelShow:!this.state.modelShow})
        this.props.history.push({
            pathname: '/qrcode',
            search: '?query=',
            state: { }
        })
    }

    submitData(){
        var myData = [this.state.uname,this.val2,this.val3,this.val4,this.val5,
            this.val6,this.val7, this.val1,this.total, this.val8, this.val9]

        let currentComponent = this;        
    
        axios.get('http://127.0.0.1:5000/generateQR', {
            params: {
                uname: myData[0],
                airport: myData[1],
                region: myData[2],
                illegal: myData[3],
                firesrms: myData[4],
                commercial: myData[5],
                unprocessed: myData[6],
                images: this.props.location.state.img,
                total: myData[8],
                id: this.props.location.state.id,
                purpose:myData[9]
            }
        }).then(function(response){
            console.log(response.data)
            currentComponent.setState({modelShow:true})
        }).catch(function(error){
            console.log(error);
        });
    }

    getSummary(){
        console.log(this.total)
        this.total = 0
        for ( let i =0; i < this.qty.length; i++) {
            console.log(i)
                console.log(this.qty[i])
                console.log(this.type[i])
                let tax = 0
                if(this.type[i] == "laptop"){
                    tax = 400;
                }
                else if(this.type[i] == "phone"){
                    tax = 300;
                }
                else if(this.type[i] == "flask"){
                    tax = 200;
                }

                this.total = this.total + (this.qty[i]*tax)
                this.result = this.type.length
           //     this.setState({total:t})
                console.log(this.total)
         
            if(i == this.qty.length-1)
                this.setState({show:true})    
        }
    }

    render () {
    let getData = homedata.herov2
    const rows = this.arr;
    
    return (
    <div>
         <Navbar />
         {/* <Container style={{width:"1000px"}}> */}
                 <Row style={{width:"1600px"}}> 
                <Col  className='tbl_col'>
         <br/> <br/> <br/> <br/> <br/> <br/>
         <br/> <br/> <br/> <br/> <br/>
            {
            rows != null?
            
         <div>
                  <table id="question">
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item</th>
                            <th>HS Code</th>
                            <th>Quantity</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          rows.map((q,i) =>(
                
                          <tr>
                            <td>{this.type[i]}</td>
                            <td><img src={"/assets/img/outputs/"+q+".png"} className="" alt="logo" height="140px"></img></td>
                            <td>{this.hs[i]}</td>
                            <td><input type="number" name="quantity" onChange={(e) => this.getQuantity(e,i)}/></td>
                            <td>{this.value[i]}</td>
                          </tr>
                            ))
                        }
                        </tbody>
                  </table>
                 
                  <br/>
                  <br/>
                  <br/>
                  <div className="col-sm-9">
                        <button className="next_btn" onClick={this.getSummary}><i className="fa fa-cog" aria-hidden="true"></i> Get Summary</button>
                    </div>
              </div>
       :null
    }
    </Col>

    <Col className='summery'>
    
    <br/> <br/> <br/> <br/> <br/> <br/><br/> <br/> <br/>
    <br/><br/> <br/> <br/>
    {
            this.state.show == true?
            <div className="row">

            {/* {
            this.state.size == null? */}
               <div className="">
                        <table className="styled-table">
                        <thead>
                        <tr>
                            <th><h5 className="text-right">Number of Items :</h5></th>
                            <th><h5 className="text-left">{this.result}</h5></th>
                        </tr>
                        <tr>
                            <th><h5 className="text-right">Total :</h5></th>
                            <th><h5 className="text-left">{this.total}$</h5></th>
                        </tr>
                        </thead>  
                    </table>   
               </div>
            <br/><br/><br/>
            <div className="col-sm-6">
                        <button className="next_btn" onClick={this.submitData}><i className="fa fa-cog" aria-hidden="true"></i> Submit </button>
                    </div>
            </div>
       :null
    }
    <br/>
    <br/>  <br/>
    <br/>
    <br/>
    <br/>  <br/>
    <br/>
    </Col>
     </Row>
            {/* </Container>  */}
            <br/>  <br/>
    <br/>
        <Footer />
 
        <Modal show={this.state.modelShow}>
                            <Modal.Header className="model_hdr">Results</Modal.Header>
                            <Modal.Body>
                                <Table responsive hover>
                                    <tbody>
                                       
                                        <tr className="unread">
                                        <td>
                                        <h6 className="mb-1"></h6>
                                      
                                        <p className="m-0" style={{fontSize:'20px'}}><strong>QR Code Generated Successfully !</strong></p><br/>
                                        
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


export default DeclarationNext
