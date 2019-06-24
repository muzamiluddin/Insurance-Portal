import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { withFormik, Field, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import './business_detail.scss';
import { Redirect } from 'react-router-dom';
import { AccountUtil } from "../../../Utils/AccountUtil";
import { SubmissionUtil } from "../../../Utils/SubmissionUtil";
import { Alert } from "../../../Utils/Alert"

const formikEnhancer = withFormik({
    enableReinitialize: true,
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch(AppActions.AccountBeforeSave(values));
        AccountUtil.createAccount(values)
                      .then(function(response){
                          Alert.success("Account created successfully");
                          props.dispatch(AppActions.AccountAfterSave(response.data.result));
                          SubmissionUtil.createSubmission(response.data.result).then(function(submissionResponse){
                              Alert.success("Submission created successfully");
                              props.dispatch(AppActions.SubmissionAfterSave(submissionResponse.data.result))
                              props.history.push('/eligibility')
                          });
                      });
    },
    mapPropsToValues: (props) => {
        return (
            {
                name: 'John Doe Inc',
                address: {
                    addressLine1: '1190 SE Olson Drive',
                    addressline2: '',
                    city: 'Waukee',
                    state: 'IA',
                    postalcode: '50263'
                },
                email: '',
                phone: ''
            }
        );
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .ensure()
            .required("Business Name is required!"),
        address: Yup.object().shape({
            addressLine1: Yup.string()
                .ensure()
                .required("Address Line 1 is required!"),
            postalcode: Yup.string()
                .ensure()
                .required("Postal Code is required!"),
            city: Yup.string()
                .ensure()
                .required("City is required!"),
            state: Yup.string()
                .ensure()
                .required("State is required!")
        }),
    }),
});

class BusinessDetailPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.dispatch(AppActions.PageLoaded('BusinessInfo'));
    }

    render() {
        return (<div className="container">
            <h2>Business Information</h2>
            <form onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-12 form-group">
                        <Field type="text" name="name" placeholder="Business Name" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="name" />
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <Field type="text" name="address.addressLine1" placeholder="Address Line 1" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="address.addressLine1" />
                        </div>
                    </div>
                    <div className="from-group col-6">
                        <Field type="text" name="address.addressline2" placeholder="Address Line 2" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="address.addressline2" />
                        </div>
                    </div>
                    <div className="form-group col-4">
                        <Field type="text" name="address.city" placeholder="City" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="address.city" />
                        </div>
                    </div>
                    <div className="form-group col-4">
                        <Field component="select" name="address.state" placeholder="State" className="form-control">
                            <option value="">Select State</option>
                            <option value="IA">IA</option>
                            <option value="IL">IL</option>
                            <option value="CA">AL</option>
                        </Field>
                        <div className="error-msg">
                            <ErrorMessage name="address.state" />
                        </div>
                    </div>
                    <div className="form-group col-4">
                        <Field type="text" name="address.postalcode" placeholder="Postal Code" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="address.postalcode" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-6">
                        <Field type="text" name="email" placeholder="Email" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    <div className="form-group col-6">
                        <Field type="text" name="phone" placeholder="Phone" className="form-control" />
                        <div className="error-msg">
                            <ErrorMessage name="phone" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary pull-right btn-lg"> Create Account </button>
                    </div>
                </div>

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

const EnhancedBusinessDetailForm = formikEnhancer(BusinessDetailPage);
const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(EnhancedBusinessDetailForm);