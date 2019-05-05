import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";



class Nav extends Component {

   

    render() {
        return (
            <Navbar className="navbar navbar-light dashboard-nav d-flex">
                <div className="p2" style={{color: "#FFF"}}>
                <Link className="my-auto nav-items" to={{
                        pathname: '/',
                    }}>
                        HOME
                    </Link>
                </div>
                <div className="ml-auto p-2">

                    <Link className="my-auto nav-items" to={{
                        pathname: 'newsurvey',
                        // state: this.props.location.state
                    }}>
                    Nova enquete
                    </Link>
                    
                </div>
                </Navbar>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Nav);