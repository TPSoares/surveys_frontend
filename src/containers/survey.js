import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sendVote, deleteSurvey } from '../actions/surveys';
import Yup from "yup";
import "../styles/style.css";

class Survey extends Component {
    
    constructor(props) {
        super(props);
        this.state= {
            survey: {},
            selectedOption: ''
        }

        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.vote = this.vote.bind(this);
        this.delete = this.delete.bind(this);
        
    }

    componentWillMount() {
        this.setState({
            survey: this.props.location.state
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.surveys !== nextProps.surveys) {
            // console.log("newprops", nextProps);
            this.setState({
                survey: {
                    id: nextProps.surveys[0].id,
                    description: nextProps.surveys[0].description,
                    end_date: nextProps.surveys[0].end_date,
                    start_date: nextProps.surveys[0].start_date,
                    status: this.state.survey.status,
                    survey_options: nextProps.surveys[0].survey_options,
                    title: nextProps.surveys[0].title
                }
            })
        }
    
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
          selectedOption: changeEvent.target.value
        });
    }

    vote = () => {
        this.props.sendVote(this.state.selectedOption);
    }

    delete = () => {
        this.props.deleteSurvey(this.state.survey.id);
    }


    render() {

        return(
            <div className="container">
                <div className="card survey">
                <div className="card-header info" style={{backgroundColor: this.state.survey.status === 'between' ? '#1aff1a' : (this.state.survey.status === 'coming' ? '#ffd633' : '#ff3333' )}}>
                    <strong>{this.state.survey.title} </strong> <p>{this.state.survey.status === 'between' ? 'Em andamento' : (this.state.survey.status === 'coming' ? 'Não iniciada' : 'Finalizada' )}</p> Início: {this.state.survey.start_date} - Fim: {this.state.survey.end_date}
                </div>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.survey.description}</h5>
                        <hr></hr>
                        {
                            this.state.survey.survey_options.map(options => {
                                return (
                                    <div key={options.id} className="survey_options">
                                        <div>
                                            <input type="radio" name={options.option_title} value={options.id} checked={this.state.selectedOption === options.id} onChange={this.handleOptionChange}>
                                            </input>{options.option_title}
                                        </div>
                                    {options.votes} votes
                                    </div>
                                )
                            })
                        }
                        <div className="vote">
                            <button className="btn btn-primary button" disabled={this.state.survey.status !== 'between'} onClick={() => {this.vote()}}>Votar</button>
                            <Link className="btn btn-danger button" to="/">
                                Cancelar
                            </Link>
                        </div>

                        <div className="survey-edit-delete">
                            <Link className="btn btn-warning button" to={{pathname: 'edit', survey: this.state.survey}}>Editar enquete</Link>

                            <button className="btn btn-danger button" onClick={
                                async () => {
                                    await this.delete()
                                    this.props.history.push('/');
                                    
                                }
                            }>Deletar enquete</button>
                        </div>
                        
                    </div>
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
    return bindActionCreators({ sendVote, deleteSurvey }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
