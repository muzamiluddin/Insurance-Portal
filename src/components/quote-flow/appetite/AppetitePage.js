import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { tsImportEqualsDeclaration } from "@babel/types";
import { Formik, withFormik, Field } from 'formik';
import * as Yup from 'yup';
import { DisplayFormikState } from "../../common/helper";
import ClassificationSelect from "../../common/classification_select";
import './appetite.scss';

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        classification: Yup.string()
            .ensure()
            .required("Classification is required!")
            .nullable(),
    }),
    mapPropsToValues: props => ({
        classification: ''
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            classification: values.classification.value,
        };
        setTimeout(() => {
            alert(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'AppetiteForm',
});

class AppetitePage extends React.Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.props.dispatch(AppActions.newQuote());
    }

    displayAdditionalQuestions(){
        console.log(this.props.values);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 h-100 d-flex justify-content-center">
                    <div className="question-text">
                        Relax. We've got you covered. What's your business about?
                    </div>
                </div>
                
                <div className="col-12 h-100 d-flex justify-content-center">
                    <form onSubmit={this.props.handleSubmit} className="classification-select-container">
                        <ClassificationSelect
                            value={this.props.values.classification}
                            onChange={this.props.setFieldValue}
                            onBlur={this.props.setFieldTouched}
                            error={this.props.errors.classification}
                            touched={this.props.touched.classification}
                        />
                        <button onClick={this.displayAdditionalQuestions()} className="btn btn-primary jumbo-btn">
                            Next Question
                        </button>

                        <DisplayFormikState {...this.props} />
                    </form>
                </div>

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