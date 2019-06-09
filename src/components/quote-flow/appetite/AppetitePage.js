import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";

class AppetitePage extends React.Component {

    componentWillMount(){
        this.props.dispatch(AppActions.newQuote());
    }


    render() {
        return (
            <h3> Appetite Page </h3>
        );
    };
}

function mapStateToProps(state) {
    return {
        submission: state.submission
    }
}

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(AppetitePage);