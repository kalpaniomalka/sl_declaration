import React, { Component } from 'react';
import FooterData from '../../data/footerdata'; 
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { SocialIcon } from 'react-social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class Footer extends Component {
    render() {
        return <footer id="footer-section" className="bg-black">

        <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
        <MDBCol className='col1'>
            <ul>
              <li className="list-unstyled">
                <FontAwesomeIcon icon={faLocationDot}/> <p>40 Main St<br/>Colombo 11, Sri Lanka</p>
              </li>
              <li className="list-unstyled">
                <FontAwesomeIcon icon={faPhone}/> <p>0112 143 434</p>
              </li>
              <li className="list-unstyled">
                <FontAwesomeIcon icon={faEnvelope}/> <p>info@customs.gov.lk</p>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
              <br/>
            <h5 className="title">About the company</h5>
            <p>
            Sri Lanka Customs is one of the oldest Customs administrations in the world which celebrated its 200 years in 2009
            </p>
            <br/>
            <div className="scl_icon">
                <SocialIcon url="https://www.facebook.com/" />
                <SocialIcon network="twitter" bgColor="#ff5a01" />
                <SocialIcon url="https://www.whatsapp.com/?lang=en" />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> SL-E-DECLARATION </a>
        </MDBContainer>
      </div> */}
    </MDBFooter>

    </footer>
    }
}



export default Footer
