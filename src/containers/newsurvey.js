import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button, Input } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/style.css";

import { createSurvey } from '../actions/surveys';

class Newsurvey extends Component {

    componentWillUpdate() {
    }

    render() {
        const SurveySchema = Yup.object().shape({
            title: Yup.string()
                .required('Título é obrigatório'),
            description: Yup.string()
                .required('Decrição é obrigatória'),
            survey_options: Yup.string()
                .required('Opções é obrigatório'),
            start_date: Yup.date(),
            end_date: Yup.date()
        })

        return (
            
            <div className="container">
     
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        survey_options: '',
                        start_date: '',
                        end_date: ''
                    }}
                    onSubmit={async (values) => {

                        try {
                            await this.props.createSurvey(values)
                            this.props.history.push('/');

                        } catch (err) {
                            console.log("Error: ", err);
                        }
                    }}
                    validationSchema={SurveySchema}
                >
                { props => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        isSubmitting,
                        errors,
                        touched,
                    } = props;
                    return (
                        <div className="form-div-signup">
                            <Form className="form-div-inside-signup" onSubmit={handleSubmit}>
                            
                                <FormControl className="form-control-signup" 
                                type="text" 
                                name="title" 
                                placeholder="Título"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}

                                <FormControl className="form-control"
                                type="text" 
                                name="description" 
                                placeholder="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.description && touched.description && <div className="input-feedback" >{errors.description}</div>}
                                <p>Coloque no mínimo 3 opções, separe-as por uma vírgula</p>
                                <FormControl className="form-control"
                                type="text" 
                                name="survey_options" 
                                placeholder="Opções da enquete"
                                value={values.survey_options}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.survey_options && touched.survey_options && <div className="input-feedback" >{errors.survey_options}</div>}
                               
                                <FormControl className="form-control"
                                type="date" 
                                name="start_date" 
                                placeholder="Data de início"
                                value={values.start_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.start_date && touched.start_date && <div className="input-feedback" >{errors.start_date}</div>}
                                
                                <FormControl className="form-control"
                                type="date" 
                                name="end_date" 
                                placeholder="Data de fim"
                                value={values.end_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.end_date && touched.end_date && <div className="input-feedback" >{errors.end_date}</div>}

                                <Button className="btn btn-primary" type="submit">
                                    Criar
                                </Button>
                                
                                <Link className="btn btn-danger" to="/">
                                    Cancelar
                                </Link>
                            </Form> 
                        </div>      
                    )
                }}
                </Formik>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ createSurvey }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsurvey);
