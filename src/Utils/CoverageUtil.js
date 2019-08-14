import * as _ from 'underscore'
import { connect } from "react-redux";
import ax from "./API";
import { CoverageUtilAPI } from './CoverageUtilAPI';
import * as AppActions from "../redux/actions/appActions";
import * as $ from 'lodash';
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export class CoverageUtil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineCoverages: {},
            formValid: false
        };

    }

    static updateLineCoverage(state, payload) {
        let clonedState = $.cloneDeep(state);
        let cov = _.findWhere(clonedState.lineCoverages, { publicID: payload.publicID })
        cov.selected = payload.selected
        cov.terms = payload.terms
        _.extend(clonedState.lineCoverages, cov)
        return clonedState
    }

    static updateLineCoverageTerm(state, payload) {
        let clonedState = $.cloneDeep(state);
        let cov = _.findWhere(clonedState.lineCoverages, { publicID: payload.covPublicID })
        let term = _.findWhere(cov.terms, { publicID: payload.covTermPublicID })
        if (_.contains(['Money', 'Count'], term.valueType)) {
            term = this.updateNumberTerm(term, payload)
        } else {
            term = this.updateSelectTerm(term, payload)
        }

        let index = _.findLastIndex(cov.terms, { publicID: payload.covTermPublicID })
        cov.terms[index] = term
        _.extend(clonedState.lineCoverages, cov)
        return clonedState
    }

    static updateSelectTerm(term, payload) {
        term.chosenTerm = payload.value
        return term
    }

    static updateNumberTerm(term, payload) {
        term.chosenTermValue = payload.value
        term.chosenTerm = payload.value
        return term
    }

    static tabContainer() {
        return <div className="row">
            Tab content goes here...
        </div>
    }


    static renderCoverages(covs, parentObj) {
        if (_.isUndefined(covs)) {
            return; 
        }

        return Object.keys(covs).map((index) => {
            return this.renderCoverage(covs[index], parentObj);
        });
    }

    static fetchLineCoverages() {
        return ax.post('quote/coverages', {
            "method": "getLineCoverages",
            "params": ["0000129120"]
        })
    }

    static updateCoverage(e, parentObj) {
        const target = e.target;
        let value = target.checked;
        const name = target.name;
        let covObj = {
            publicID: name,
            coverageCategoryCode: target.getAttribute('coveragecategorycode'),
            updated: true,
            selected: value,
            dependentCoverages: this.getDependentCoverages(name)
        };

        CoverageUtilAPI.updateLineCoverage(covObj).then(function (response) {
            parentObj.props.dispatch(AppActions.updateLineCoverage(response.data.result))
        })
    }

    static getDependentCoverages(covPatternID){
        return BOP_DEPENDENT_COVERAGES[covPatternID]
    }

    static updateCovTerm(e, cov, parentObj) {
        const target = e.target;
        let value = target.value;
        const name = target.name;
        parentObj.props.dispatch(AppActions.updateLineCoverageTerm({ covPublicID: cov.publicID, covTermPublicID: name, value: value }));
    }

    static renderCoverage(cov, parentObj) {
        if (_.isUndefined(cov.publicID)) {
            return
        }

        return <Box flexWrap="wrap" bgcolor="background.paper" boxShadow={2} m={1}>
                    <label>
                        <Checkbox
                            checked={cov.selected}
                            disabled={cov.required}
                            onChange={(e) => this.handleCovChange(e, parentObj)}
                            inputProps={{
                                'name': cov.publicID,
                                'coverageCategoryCode': cov.coverageCategoryCode,
                                'aria-label': 'primary checkbox',
                                'publicID': cov.publicID
                            }}
                        />
                        {cov.name}
                    </label>
                    <div class="row">
                        <div class="col">
                            {this.renderCovTerms(cov, parentObj)}
                        </div>
                    </div>
        </Box>
    }

    static renderCovTerms(cov, parentObj) {
        if (!cov.hasTerms || !cov.selected) {
            return;
        }
        return Object.keys(cov.terms).map((covTermIndex) => {
            return <div className="col-md-6">
                {this.renderCovTerm(cov.terms[covTermIndex], cov, parentObj)}
            </div>
        })
    }

    static renderCovTerm(covTerm, cov, parentObj) {
        if (covTerm.valueType == 'Money' || covTerm.valueType == 'Count') {
            return this.renderNumberTerm(covTerm, cov, parentObj);
        } else {
            return this.renderSelectTerm(covTerm, cov, parentObj);
        }
    }

    static renderNumberTerm(covTerm, cov, parentObj) {
        return <div className="row">
            <div className="col">
                {covTerm.name}
            </div>
            <div className="col">
                <TextField
                    id={covTerm.publicID}
                    value={covTerm.chosenTermValue}
                    onChange={e => this.handleCovTermChange(e, cov, parentObj)}
                    type="number"
                    className={""}
                    InputProps={{
                        name: covTerm.publicID
                    }}
                    margin="normal"
                />
            </div>
        </div>;
    }

    static renderSelectTerm(covTerm, cov, parentObj) {
        return <div className="row">
            <div className="col">
                {covTerm.name}
            </div>
            <div className="col">
                <Select
                    value={covTerm.chosenTerm || 'None Selected'} onChange={e => this.handleCovTermChange(e, cov, parentObj)}
                    inputProps={{
                        name: covTerm.publicID
                    }}
                >
                    {covTerm.options.map((option) => {
                        return <MenuItem value={option.code || 'None Selected'}>
                            {option.name}
                        </MenuItem>
                    })}
                </Select>
            </div>
        </div>;
    }

    static handleCovChange(e, parentObj) {
        e.persist();
        this.updateCoverage(e, parentObj)
    }

    static handleCovTermChange(e, cov, parentObj) {
        e.persist();
        this.updateCovTerm(e, cov, parentObj)
    }
}

export const BOP_DEPENDENT_COVERAGES = {
            'BOPEmpBenefits': ['BOPEmpBenExtRpting']
        }