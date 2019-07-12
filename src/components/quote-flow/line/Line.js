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

class LineDetailPage extends React.Component {
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

    updateCoverages(lineCoverages) {
        this.setState(prevState => ({
            ...prevState,
            lineCoverages: {
                ...lineCoverages,
            }
        }));
    }

    updateLineCov = (payload) => {
        this.props.dispatch(AppActions.updateLineCoverage(payload));
    }
    
    updateLineCovTerm = (payload) => {
    }

    handleCovChange(e) {
        e.persist();
        this.updateCoverage(e)
    }

    updateCoverage(e){
        const target = e.target;
        let value = target.checked;
        const name = target.name;
        let covObj = {
            publicID: name,
            coverageCategoryCode: target.getAttribute('coveragecategorycode'),
            updated: true,
            selected: value
        };

        let currentObj = this;
        CoverageUtilAPI.updateLineCoverage(covObj).then(function (response) {
            currentObj.props.dispatch(AppActions.updateLineCoverage(response.data.result))
        })
    }

    renderCovTerms(cov) {
        if (!cov.hasTerms || !cov.selected){
            return;
        }
        return Object.keys(cov.terms).map((covTermIndex) => {
            return <div className="col-md-6">
                {this.renderCovTerm(cov.terms[covTermIndex], cov)}
            </div>
        })
    }

    handleCovTermChange(e, cov){
        const target = e.target;
        let value = target.value;
        const name = target.name;
        e.persist();
        this.props.dispatch(AppActions.updateLineCoverageTerm({covPublicID: cov.publicID, covTermPublicID: name, chosenTerm: value }));
    }

    renderCovTerm(covTerm, cov) {
        return <div className="row">
            <div className="col">
                {covTerm.name}
            </div>
            <div className="col">
                <Select
                    value={covTerm.chosenTerm} onChange={e => this.handleCovTermChange(e, cov)}
                    inputProps={{
                        name: covTerm.publicID
                    }}
                >
                    {covTerm.options.map((option) => {
                        return  <MenuItem value={option.code}>
                            {option.name} 
                        </MenuItem>
                    })}
                </Select>
            </div>
        </div>;
    }

    renderCoverage(cov) {
        if (_.isUndefined(cov.publicID)){
            return
        }

        return <div class="row coverage-row">
            <div class="col-12 col-title text-bold">
                <label>
                    <Checkbox
                        checked={cov.selected}
                        onChange={(e) => this.handleCovChange(e)}
                        inputProps={{
                            'name': cov.publicID,
                            'coverageCategoryCode': cov.coverageCategoryCode,
                            'aria-label': 'primary checkbox',
                            'publicID': cov.publicID
                        }}
                    />
                    {cov.name}
                </label>
                {this.renderCovTerms(cov)}
            </div>
            <div class="col-md-12">

            </div>
        </div>
    }

    renderLineCoverages() {
        if (!_.isUndefined(this.props.lineCoverages)) {
            let covs = this.props.lineCoverages;
            return Object.keys(covs).map((index) => {
                return this.renderCoverage(covs[index]);
            });

        }
    }

    render() {
        return (<Container maxWidth="lg">
            <h2>Line Coverages</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {this.renderLineCoverages()}
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