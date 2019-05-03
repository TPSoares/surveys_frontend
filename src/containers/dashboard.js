import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

                        //check survey date
                        var dateFrom = survey.start_date;
                        var dateTo = survey.end_date;
                        var dateCheck = new Date();

                        var d1 = dateFrom.split("/");
                        var d2 = dateTo.split("/");
                        // var c = dateCheck.split("/");
                        // console.log(d1);

                        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
                        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
                        // var check = new Date(c[2], parseInt(c[1])-1, c[0]);

                        var status = '';

                        if(dateCheck > from && dateCheck < to) {
                            status = 'between';
                        }

                        if(dateCheck > from && dateCheck > to) {
                            status = 'over';
                        }

                        if(dateCheck < from && dateCheck < to) {
                            status = 'coming';
                        }
                        console.log(dateCheck > from && dateCheck < to)
                        console.log(from)
                        console.log(status)

                        return (

                            <div key={survey.id} className="card surveys">
                                <Link 
                                    className="survey-link"
                                    to={{pathname: 'survey', state: {...survey, status}}}
                                >
                                <div className="card-header info" style={{backgroundColor: status === 'between' ? '#1aff1a' : (status === 'coming' ? '#ffd633' : '#ff3333' )}}>
                                    <strong>{survey.title}</strong> {survey.start_date} - {survey.end_date}
                                </div>

                                <div className="card-body">
                                    <p><strong>Description: </strong>{survey.description}</p>
                                    {/* <hr></hr>
                                    {
                                        survey.survey_options.map(options => {
                                            return (
                                                <div key={options.id} className="survey_options">
                                                    <button>{options.option_title}</button> 
                                                    <p>{options.votes} votes</p>
                                                </div>
                                            )
                                        })
                                    } */}
                                </div>
                                </Link>
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
