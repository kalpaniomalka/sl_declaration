import React, { Component } from 'react';
import homedata from '../../data/home.json';

class Results extends Component {
    render () {

        let factsInfo = homedata.results
        let sectionHeadingInfo = factsInfo.sectionHeading


        return     <section id="results" className="pt100 pb100">
        {/* <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-3 offset-md-2 offset-sm-1">
                    <div className="section-title text-center mb60">
                        <h2 dangerouslySetInnerHTML={{__html: sectionHeadingInfo.title}}></h2>
                        <hr className="lines"/>
                        <p>{sectionHeadingInfo.desc}</p>
                    </div>
                </div>
            </div>
            <div className="row text-center">
                        <table className="styled-table">
                        <thead>
                        <tr>
                            <th><h2 className="text-right">Your BMI is </h2></th>
                            <th><h2 className="text-left">25</h2></th>
                        </tr>
                        </thead>
                        <tbody>
                       
                        <tr>
                            <td> <img src="/assets/img/bg1.jpeg" alt="logo" height="350px" className="align-center"></img></td>
                            <td> <img src="/assets/img/bg1.jpeg" alt="logo" height="350px" className="align-center"></img></td>
                           
                            
                        </tr>
                        </tbody>
                    </table>
                    
                   
            </div>
        </div> */}
    </section>
    }
}


export default Results
