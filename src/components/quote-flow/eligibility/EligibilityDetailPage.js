import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { withFormik, Field, ErrorMessage, getIn, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Redirect } from 'react-router-dom';
import { AccountUtil } from "../../../Utils/AccountUtil";
import { SubmissionUtil } from "../../../Utils/SubmissionUtil";
import { Alert } from "../../../Utils/Alert"
import ax from "../../../Utils/API";
import { QuestionUtil } from "../../../Utils/QuestionUtil";
import { BOPEligibilityMetadata } from "../../../Utils/metadata";
import { BooleanSwitch } from "../../common/boolean_switch";
import * as _ from 'underscore';
import * as $ from 'lodash';

const formikEnhancer = withFormik({
    enableReinitialize: true,
    handleSubmit: (values, { props, setSubmitting }) => {
    },
    mapPropsToValues: (props) => {
    },
    validationSchema: Yup.object().shape({
    }),
});

class EligibilityDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }

    getValueFromProps(dynamicKey){
      return Object.keys(this.props)
      .map((propKey) => {
         if (propKey == dynamicKey){
             return this.props[propKey]
         }
      })
    }

    componentDidMount() {
        let questionSet = [];
        let currentObj = this;
        QuestionUtil.fetchEligibilityQuestions().then(function (response) {
            let questionKeys = response.data.result.answers
            for (const key in questionKeys) {
                let question = BOPEligibilityMetadata.findQuestionByID(key)
                if (!_.isUndefined(question)) {
                    questionSet.push(question);
                }
            }
            currentObj.setState((state) => {
                return { questions: questionSet };
            });
        })
    }

    render() {
        return (<div className="container">
            <h2>Eligibility Questions</h2>
            <Form>
                <FieldArray
                    name="questions"
                    render={ arrayHelpers => (
                        <div>
                            {this.props.values.questions.map((question, index) => {
                                return <div>
                                         {question.desc}
                                        </div>
                            })}
                        </div>
                    )}
                 />
            </Form>


            <form onSubmit={this.props.handleSubmit}>
                    {this.state.questions.map((question) => {
                        return <div key={question.id}>
                        </div>
                    })}

                    <button onClick={() => this.handleSubmit()} className="btn btn-primary jumbo-btn">
                        Submit
                    </button>
            </form>
        </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        submission: state.submission
    }
}

const EnhancedEligibilityDetailForm = formikEnhancer(EligibilityDetailPage);
const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(EnhancedEligibilityDetailForm);