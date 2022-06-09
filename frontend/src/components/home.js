import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import homedata from '../data/home.json'
import Typed from 'react-typed';
import Footer from './global-components/footer';
import Navbar from './global-components/navbar';
import Grid from '@material-ui/core/Grid'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            show: false,
            Uploadfile: null,
            result: null,
            loader: false,
            imgPath: null,
            size: null,
            level: null,
            nipple: null,
            umame: null
        }
        this.signup = this.signup.bind(this);
    }

    signup(){
        this.props.history.push({
            pathname: '/signup',
            search: '?query=',
           // state: { img: this.state.imgPath, size:this.state.size,status:this.state.result,nipple:this.state.nipple }
        })
    }

    render () {
    let getData = homedata.herov1
    return (
    <div>
         <Navbar />
         <section id="home" className="text-center hero-section-1">
        <br/><br/>  <br/><br/>
            <Container className='hme'>
                <Row className="half-height align-items-center">
                    
                    <div className="hero-content col-lg-12 p-50px-t p-50px-b md-p-10px-b text-center">
                        <h2 className="m-30px-b" >{getData.title}<br/>
                        <Typed 
                        strings={getData.typedText}
                        typeSpeed={70}
                        backSpeed={50} 
                        class="typed">
                        <span className="typed"></span>
                        </Typed>
                        </h2>
                        {/* <p className="m-50px-b md-m-30px-b">
                            {getData.desc}
                        </p> */}
                    <div>
                </div>
                    <div className="col-sm-12">
                        <button className="get_btn" onClick={this.signup}><i className="fa fa-cog" aria-hidden="true"></i> {getData.button.btn1}</button>
                    </div>
                          
                </div>
          

         
            </Row>
            
            </Container>
            <Container>
                <Row className="half-height align-items-center">
                <Grid container style={{margin_top:'-500px'}}>
                <Grid item xs={3} className='grid_btn1'> 
                <a href={'#declaration'}><img src="/assets/img/dec.png" className="" alt="logo" height="140px"></img></a>
                    <h4>Declaration</h4>
                    <p>Complete declaration before arrival</p>
                </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={3} className='grid_btn2'>
                <a href={'#travelProfile'}> <img src="/assets/img/travel.png" className="" alt="logo" height="140px"></img></a>
                    <h4>Travel Profile</h4>
                    <p>Create or edit travel profile for travler</p>
                </Grid>
                <Grid item xs={1}>  </Grid>
                <Grid item xs={3} className='grid_btn3'>
                <a href={'#qrcode'}> <img src="/assets/img/qr.png" className="" alt="logo" height="140px"></img></a>
                    <h4>QR Code</h4>
                    <p>Access the QR code to present it <br/>to the custom officer</p>
                </Grid>
            </Grid>
                </Row>
            </Container>
            <br/><br/>
        </section>
       
        <Footer />
    </div>
    )
    }
}


export default Home
