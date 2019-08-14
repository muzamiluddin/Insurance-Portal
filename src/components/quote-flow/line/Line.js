import React from "react";
import { connect } from "react-redux";
import * as AppActions from "../../../redux/actions/appActions";
import { Redirect } from 'react-router-dom';
import ax from "../../../Utils/API";
import { QuestionUtil } from "../../../Utils/QuestionUtil";
import { BOPEligibilityMetadata } from "../../../Utils/metadata";
import * as _ from 'underscore';
import Toggle from 'react-toggle';
import "react-toggle/style.css"
import { Alert } from "../../../Utils/Alert";
import { CoverageUtil } from "../../../Utils/CoverageUtil";
import { CoverageUtilAPI } from "../../../Utils/CoverageUtilAPI";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import TextField  from '@material-ui/core/TextField';

class LineDetailPage extends React.Component {
    static activeTab = 0;
    constructor(props) {
        super(props);
        this.state = {
            lineCoverages: {},
            formValid: false
        };
        
    }

    // Fetch line coverages
    componentDidMount() {
        let currentObj = this;
        CoverageUtil.fetchLineCoverages().then(function (response) {
            currentObj.updateCoverages(response.data.result);
            currentObj.props.dispatch(AppActions.FetchLineCoverages(response.data.result));
        })
    }

    // Used only during initial page load 
    updateCoverages(lineCoverages) {
        this.setState(prevState => ({
            ...prevState,
            lineCoverages: {
                ...lineCoverages,
            }
        }));
    }

    render() {
        return (<Container maxWidth="lg">
            <h2>Line Coverages</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {CoverageUtil.renderCoverages(this.props.lineCoverages, this)}
            </form>
            <div className="row jumbotron">
                <h2>CURRENT STATE</h2>
                {JSON.stringify(this.state)}
            </div>
        </Container>
        );
    }
};

function mapStateToProps(state) {
    return {
        lineCoverages: state.app.lineCoverages
    }
}

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(LineDetailPage);