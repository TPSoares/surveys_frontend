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
                <div className="card-header info" style={{backgroundColor: this.state.survey.status === 'between' ? '#00cc00' : (this.state.survey.status === 'coming' ? '#ffd633' : '#e60000' )}}>
                    <strong>{this.state.survey.title} </strong> <p>Status: {this.state.survey.status === 'between' ? 'Em andamento' : (this.state.survey.status === 'coming' ? 'Não iniciada' : 'Finalizada' )}</p> Início: {this.state.survey.start_date} - Fim: {this.state.survey.end_date}
                </div>
                    <div className="card-body">
                    <div className="survey-edit-delete">
                        <h5 className="card-title">{this.state.survey.description}</h5>
                        <div className="">
                            <Link className="btn btn-default button button-edit" to={{pathname: 'edit', survey: this.state.survey}}>Editar enquete</Link>

                            <button className="btn btn-default button button-delete" onClick={
                                async () => {
                                    await this.delete()
                                    this.props.history.push('/');
                                    
                                }
                            }>Deletar enquete</button>
                        </div>
                    </div>
                        <hr></hr>
                        {
                            this.state.survey.survey_options.map(options => {
                                return (
                                    <div key={options.id} className="survey_options">
                                        <div className="options">
                                            <input type="checkbox" name={options.option_title} value={options.id} checked={this.state.selectedOption === options.id} onChange={this.handleOptionChange} disabled={this.state.survey.status !== 'between'}>
                                            </input><h5>{options.option_title}</h5>
                                        </div>
                                    <h5>{options.votes} votos</h5>
                                    </div>
                        
                                )
                            })
                        }
                        <hr></hr>
                        <div className="vote">
                            <button className="btn btn-primary button" disabled={this.state.survey.status !== 'between'} onClick={() => {this.vote()}}>Votar</button>
                            <Link className="btn btn-danger button" to="/">
                                Cancelar
                            </Link>
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
