import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { withFormik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DisplayFormikState } from "../../common/helper";
import ClassificationSelect from "../../common/classification_select";
import './business_detail.scss';
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

class BusinessDetailPage extends React.Component {
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
        console.log("trying to submit a form");
        this.props.history.push('/business')
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
        return <div className="row">
            <div className="col-12 justify-content-center classification-select-container">
                <div className="col-12 d-flex justify-content-center">
                    <div className="question-text">
                        A couple more questions...
                            </div>
                </div>

                {this.state.questions.map((question) => {
                    return <div className="row mt-3">
                        <div className="col-12">
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
                                        <Field type={question.type} name={question.id} />
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
            <div class="col-12">
                <form>
                    <Field type="text" name="name" placeholder="Business Name"/>
                    <Field type="text" name="addressline1" placeholder="Address Line 1"/>
                    <Field type="text" name="addressline2" placeholder="Address Line 1"/>
                    <Field type="text" name="postalcode" placeholder="Postal Code"/>
                    <Field type="text" name="city" placeholder="City"/>
                    <Field type="text" name="state" placeholder="State"/>
                    <Field type="text" name="email" placeholder="Email"/>
                    <Field type="text" name="phone" placeholder="Phone"/>

                </form>
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

const EnhancedAppetiteForm = formikEnhancer(BusinessDetailPage);

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(EnhancedAppetiteForm);