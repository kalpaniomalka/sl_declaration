import React, { Component } from 'react';

class Navbar extends Component {

    constructor( props ) {
        super(props);
        this.state = {addClass: 'Say hello' }
    }

    componentDidMount() {
       window.addEventListener('scroll', this.handleScroll.bind(this));
        
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll () {
        let lastScrollY = window.scrollY

       if( lastScrollY >= 60 ) {

         this.setState((state, props) => ({ 
            addClass: 'nav-sticky' 
        }) );

       } else {

        this.setState((state, props) => ({
            addClass: ''
        }));

       }
        
    }
    render() {
        
        return (
            <div>
            <nav className={`${this.state.addClass} navbar navbar-inverse navbar-expand-lg header-nav fixed-top header`}>
                
                <div className="container">
                    <a className="navbar-brand logo" href={`${process.env.PUBLIC_URL}/`}>
                    <h1><img src="/assets/img/logo1.png" className="" alt="logo" height="140px"></img>SL-E-DECLARATION</h1>
                    <br/>
                    {sessionStorage.getItem('userName') == null?
                    <div>
                    <a href="#" className="nav_link1">HOME</a>
                    <a href={"#login"} className="nav_link10">LOGIN</a>
                    </div>
                    :null}
                      
                      {sessionStorage.getItem('userName') != null?
                    <div>
                    <a href="#" className="nav_link1">HOME</a>
                    <a href={"#login"} className="nav_link10">LOG OUT</a>
                    </div>
                    :null}
                    </a>
                    

                    <button className="navbar-toggler pull-right" type="button" data-toggle="collapse" data-target="#navbarCodeply">
                        <i className="icofont-navigation-menu"></i>
                    </button>
                    
                      
                  
                </div>
            </nav>
            </div>
        )
    }
}


export default Navbar