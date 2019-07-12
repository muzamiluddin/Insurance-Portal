import * as _ from 'underscore' 
import ax from "./API";
import * as $ from 'lodash';

export class CoverageUtilAPI {
    static fetchLineCoverages() {
        return ax.post('quote/coverages', {
            "method": "getLineCoverages",
            "params": ["0000129120"]
        })
    }
    
    static updateLineCoverage(covObj) {
        return ax.post('quote/coverages', {
            "method": "updateCoverage",
            "params": ["0000129120", 
                {
                    ...covObj
                }
            ]
        })
    }
}
