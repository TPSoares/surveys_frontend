import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/style.css";

import { edit } from '../actions/surveys';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state= {
            survey: {
                title: '',
                description: '',
            },
        }
    }

    componentWillMount() {
        //console.log(this.props.location);
        if(this.props.location.survey) {
            this.setState({
                survey: this.props.location.survey
            })
        }
    }

    render() {
        const EditSchema = Yup.object().shape({
            title: Yup.string()
                .required('Título é obrigatório'),
            description: Yup.string()
                .required('Descrição é obrigatória'),
        })

        return (
            
            <div className="container form">
     
                <Formik
                    initialValues={{
                        title: this.state.survey.title,
                        description: this.state.survey.description,
                        start_date: this.state.survey.start_date,
                        end_date: this.state.survey.end_date
                    }}
                    onSubmit={async (values) => {

                        try {
                            await this.props.edit(this.state.survey.id, values)
                            this.props.history.push('/');

                        } catch (err) {
                            //console.log("Error: ", err);
                        }
                    }}
                    validationSchema={EditSchema}
                >
                { props => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        errors,
                        touched,
                    } = props;
                    return (
                        <div className="form-div">
                            <Form className="form-div-inside" onSubmit={handleSubmit}>
                            
                                <FormControl className="form-control form-field" 
                                type="text" 
                                name="title" 
                                placeholder="Título"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}

                                <FormControl className="form-control form-field"
                                type="text" 
                                name="description" 
                                placeholder="Descrição"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                /> 
                                {errors.description && touched.description && <div className="input-feedback" >{errors.description}</div>}
                               
                                <FormControl className="form-control form-field"
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
                                min={values.start_date}
                                /> 
                                {errors.end_date && touched.end_date && <div className="input-feedback" >{errors.end_date}</div>}

                                <Button className="btn btn-primary button" type="submit">
                                    Editar
                                </Button>
                                
                                <Link className="btn btn-danger button" to="/">
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
    return bindActionCreators({ edit }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);

