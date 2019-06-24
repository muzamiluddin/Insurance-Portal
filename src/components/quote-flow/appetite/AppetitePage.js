import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { withFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DisplayFormikState } from "../../common/helper";
import ClassificationSelect from "../../common/classification_select";
import './appetite.scss';
import ax from "../../../Utils/API";
import { AppetiteMetadata } from "../../../Utils/metadata";
import { Redirect } from 'react-router-dom';



const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        classification: Yup.string()
            .ensure()
            .required("Classification is required!")
            .nullable(),
        BOPNumOfEmployees: Yup.string()
            .ensure()
            .required("This field is required!")
            .nullable(),
        BOPNumOfLosses: Yup.string()
            .ensure()
            .required("This field is required!")
            .nullable()
    }),
    mapPropsToValues: props => ({
        classification: ''
    }),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'AppetiteForm',
});

class AppetitePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            displayClassification: true,
        };
    };

    componentWillMount() {
        this.props.dispatch(AppActions.newQuote());
    }

    handleSubmit(){
        this.props.history.push('/products')
    }

    displayAdditionalQuestions = () => {
        var self = this;
        ax.post('quote/question', {
            "method": "fetchBOPAppetiteQuestions",
            "params": ["Retail", "IA"],
        }).then(function (response) {
            const questionKeys = response.data.result.answers;
            let questionSet = [];
            for (const key in questionKeys) {
                questionSet.push(AppetiteMetadata.findQuestionByID(key));
            }
            self.setState((state) => {
                return { displayClassification: false, questions: questionSet };
            });
        });
    }

    questionSet() {
        return <div className="row appetite-question-set">
            <div className="col-12 justify-content-center classification-select-container">
                <div className="col-12 d-flex justify-content-center">
                    <div className="question-text">
                        A couple more questions...
                    </div>
                </div>

                {this.state.questions.map((question) => {
                    return <div className="row mt-3">
                        <div className="col-12 form-group">
                            <div key={question.id}>
                                <div className="row">
                                    <div className="col-12 justify-content-center">
                                        <label>
                                            {question.desc}
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 justify-content-center">
                                        <Field type={question.type} name={question.id} className="form-control align-center" />
                                        <div className="error-msg">
                                            <ErrorMessage name={question.id} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

                <button onClick={() => this.handleSubmit()} className="btn btn-primary jumbo-btn">
                    Submit
                </button>
            </div>

        </div>
    }

    classificationSection() {
        return <div className="row">
            <div className="col-12 d-flex justify-content-center">
                <div className="question-text">
                    Relax. We've got you covered. What's your business about?
                    </div>
            </div>

            <div className="col-12 d-flex justify-content-center">
                <div className="classification-select-container">
                    <ClassificationSelect
                        value={this.props.values.classification}
                        onChange={this.props.setFieldValue}
                        onBlur={this.props.setFieldTouched}
                        error={this.props.errors.classification}
                        touched={this.props.touched.classification}
                    />
                    <button onClick={() => this.displayAdditionalQuestions()} className="btn btn-primary jumbo-btn" type="button">
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    }

    render() {
        return (
            <div>
                <form onSubmit={() => this.handleSubmit()} >
                    {this.state.displayClassification && this.classificationSection()}
                    {!this.state.displayClassification && this.questionSet()}
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        submission: state.submission
    }
}

const EnhancedAppetiteForm = formikEnhancer(AppetitePage);

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(EnhancedAppetiteForm);