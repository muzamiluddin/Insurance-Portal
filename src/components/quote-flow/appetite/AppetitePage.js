import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { tsImportEqualsDeclaration } from "@babel/types";
import { Formik, withFormik, Field } from 'formik';
import * as Yup from 'yup';
import { DisplayFormikState } from "../../common/helper";
import ClassificationSelect from "../../common/classification_select";

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
        topics: Yup.array()
            .min(1, 'Pick at least 1 tag')
            .of(
                Yup.object().shape({
                    label: Yup.string().required(),
                    value: Yup.string().required(),
                })
            )
            .nullable(),
    }),
    mapPropsToValues: props => ({
        email: '',
        topics: [],
    }),
    handleSubmit: (values, { setSubmitting }) => {
        const payload = {
            ...values,
            topics: values.topics.map(t => t.value),
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

    render() {
        return (
            <div class="row">
                <div class="col-12">
                    <div class="text-default">
                    Relax, We got you covered...
                    </div>
                    <div class="text-default">
                    What's your business about?
                    </div>
                </div>
                <form onSubmit={this.props.handleSubmit}>
                    <label htmlFor="email" style={{ display: 'block' }}>
                        Email
                </label>
                    <input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        value={this.props.values.email}
                        onChange={this.props.handleChange}
                        onBlur={this.props.handleBlur}
                    />
                    {this.props.errors.email &&
                        this.props.touched.email && (
                            <div style={{ color: 'red', marginTop: '.5rem' }}>{this.props.errors.email}</div>
                        )}
                    <ClassificationSelect
                        value={this.props.values.topics}
                        onChange={this.props.setFieldValue}
                        onBlur={this.props.setFieldTouched}
                        error={this.props.errors.topics}
                        touched={this.props.touched.topics}
                    />
                    <button
                        type="button"
                        className="outline"
                        onClick={this.props.handleReset}
                        disabled={!this.props.dirty || this.props.isSubmitting}
                    >
                        Reset
            </button>
                    <button type="submit" disabled={this.props.isSubmitting}>
                        Submit
            </button>

                    <DisplayFormikState {...this.props} />
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