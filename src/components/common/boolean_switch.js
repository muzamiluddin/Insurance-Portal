import React from "react";
import { ErrorMessage } from 'formik';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

export class BooleanSwitch extends React.Component {
    render() {
        return (
            <Toggle
             onChange={this.props.onChange}
             checked={this.props.value}
             onBlur={this.props.onBlur}
            />
        );
    }
}