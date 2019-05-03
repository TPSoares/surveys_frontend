import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Formik, Field } from "formik";
import Yup from "yup";
import "../styles/style.css";

class Survey extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            survey: {}
        }
    }

    componentWillMount() {
        this.setState({
            survey: this.props.location.state
        })
    }

    render() {

        

        console.log(this.props);
        return(
            <div className="container">
                <div className="card">
                <div className="card-header info" style={{backgroundColor: this.state.survey.status === 'between' ? '#1aff1a' : (this.state.survey.status === 'coming' ? '#ffd633' : '#ff3333' )}}>
                    <strong>{this.state.survey.title}</strong> {this.state.survey.start_date} - {this.state.survey.end_date}
                </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.survey.description}</h5>
                        <hr></hr>
                        {
                            this.state.survey.survey_options.map(options => {
                                return (
                                    <div key={options.id} className="survey_options">
                                        <input type="radio" name={options.survey_title}></input>
                                    {options.votes} votes
                                    </div>
                                )
                            })
                        }
                        <div className="vote">
                            <a href="#" className="btn btn-primary">Votar</a>
                        </div>
                    </div>
                </div>
            </div>

            
        )
    }    
}


function mapStateToProps(state) {
    return {
        // surveys: state.surveys
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
