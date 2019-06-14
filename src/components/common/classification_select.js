import React from "react";
import Select from 'react-select';
import {ErrorMessage} from 'formik';

const options = [
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'clothing_store', label: 'Clothing Store' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'retail', label: 'Retail' },
    { value: 'grocery_store', label: 'Grocery Store' },
    { value: 'salon', label: 'Nail Salon' },
];

class ClassificationSelect extends React.Component {
    handleChange = value => {
        // this is going to call setFieldValue and manually update values.topcis
        this.props.onChange('classification', value);
    };

    handleBlur = () => {
        // this is going to call setFieldTouched and manually update touched.topcis
        this.props.onBlur('classification', true);
    };

    errorClass = () => {
        if (this.props.error && this.props.touched) {
        debugger
            return 'has-error'
        }
    }

    render() {
        return (
            <div style={{ margin: '1rem 0' }} className="w-100">
                <Select
                    id="classification"
                    options={options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    placeholder="Ex: Retail, Restaurant"
                    name="classification"
                    className={this.errorClass()}
                />
                <span className="error-msg">
                   <ErrorMessage name="classification" />
                </span>
            </div>
        );
    }
}

export default ClassificationSelect;