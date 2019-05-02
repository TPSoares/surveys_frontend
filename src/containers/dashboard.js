import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import "../styles/style.css";

import { getAllSurveys } from '../actions/surveys';

class Dashboard extends Component {    

    componentWillMount() {
        this.props.getAllSurveys();
    }

    render() {
        console.log(this.props.surveys);
        return(
            <div>
                <div className="container image-container">

                {
                    this.props.surveys.data &&
                    this.props.surveys.data.surveys.map(survey => {
                        return (

                            <div key={survey.id} className="card surveys">
                                <div className="card-header info"><strong>{survey.title}</strong> {survey.start_date} - {survey.end_date}</div>

                                <div className="card-body">
                                    <p><strong>Description: </strong>{survey.description}</p>
                                    <hr></hr>
                                    {
                                        survey.survey_options.map(options => {
                                            return (
                                                <div key={options.id} className="survey_options">
                                                    <button>{options.option_title}</button> 
                                                    <p>{options.votes} votes</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>

            
        )
    }
}

function mapStateToProps(state) {
    return {
        surveys: state.surveys
    };
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({ getAllSurveys }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
