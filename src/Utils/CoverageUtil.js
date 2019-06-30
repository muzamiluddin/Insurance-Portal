import * as _ from 'underscore' 
import ax from "./API";
import * as $ from 'lodash';

export class CoverageUtil {
    static updateLineCoverage(state, payload){
        let clonedState = $.cloneDeep(state);
        let cov = _.findWhere(clonedState.lineCoverages, {publicID: payload.publicID})
        cov.selected = !!payload.value
        _.extend(clonedState.lineCoverages, cov)
        return clonedState
    }
    
    static updateLineCoverageTerm(state, payload){
        let clonedState = $.cloneDeep(state);
        let cov = _.findWhere(clonedState.lineCoverages, {publicID: payload.covPublicID})
        let term = _.findWhere(cov.terms, {publicID: payload.covTermPublicID} )
        term.chosenTerm = payload.chosenTerm
        let index = _.findLastIndex(cov.terms, {publicID: payload.covTermPublicID})
        cov.terms[index] = term
        _.extend(clonedState.lineCoverages, cov)
        return clonedState
    }

    static fetchLineCoverages() {
        return ax.post('quote/coverages', {
            "method": "getLineCoverages",
            "params": ["0000129120"]
        })
    }
}
