
const BOPEligibilityQuestions = [
    { 
        id: 'PolicyRejected',
        desc: 'Has any policy or coverage been declined, canceled, or non-renewed during the prior 3 years?',
        type: 'Boolean'
    },

    { 
        id: 'Foreclosure',
        desc: 'Has applicant had a foreclosure, repossession, bankruptcy, judgement, or lien during the past five years?',
        type: 'Boolean'
    },
    { 
        id: 'Catastrophe',
        desc: 'Do any catastrophe exposures exist?',
        type: 'Boolean'
    },
    { 
        id: 'ApplicantArson',
        desc: 'During the last five years, has any applicant been convicted of any degree of the crime of arson?',
        type: 'Boolean'
    },
    { 
        id: 'PersonnelIssues',
        desc: 'Have there been any claims or allegations relating to sexual abuse or molestation allegations, discrimination, or negligent hiring?',
        type: 'Boolean'
    },
    { 
        id: 'OtherInsurance',
        desc: 'Does the applicant have other past or current policies with this company?',
        type: 'Boolean'
    },
    { 
        id: 'OtherBusiness2',
        desc: 'Does the applicant own or operate any business not included on this application?',
        type: 'Boolean'
    },
    { 
        id: 'FireCode',
        desc: 'Do any uncorrected fire code violations exist?',
        type: 'Boolean'
    },
    { 
        id: 'Flammables',
        desc: 'Is there any exposure to flammables, explosives, or chemicals?',
        type: 'Boolean'
    },
    { 
        id: 'HazardousMaterial',
        desc: 'Have any operations, past or present, involved storing, treating, discharging, applying, disposing, or transporting of hazardous materials?',
        type: 'Boolean'
    },
    { 
        id: 'Manufacturing',
        desc: 'Is there any manufacturing, mixing, relabeling, or repackaging of products?',
        type: 'Boolean'
    },
    { 
        id: 'RentEquipment',
        desc: 'Is equipment rented or loaned to others?',
        type: 'Boolean'
    },
    { 
        id: 'LeaseEmployees',
        desc: 'Are employees leased to or from others?',
        type: 'Boolean'
    },
    { 
        id: 'BOPBusinessownersPreQualWorkersComp',
        desc: 'Is workers compensation carried?',
        type: 'Boolean'
    },
    { 
        id: 'SubContractors',
        desc: 'Are sub-contractors required to provide certificates of insurance prior to beginning work?',
        type: 'Boolean'
    },
    { 
        id: 'AthleticTeams',
        desc: 'Are athletic teams sponsored?',
        type: 'Boolean'
    },

]

const AppetiteQuestions = [
    {
        id: 'BOPNumOfEmployees',
        desc: 'Total number of Employees:',
        type: 'number'
    },
    {
        id: 'BOPNumOfLosses',
        desc: 'Number of claims in last 3 years:',
        type: 'number'
    }
];

export class AppetiteMetadata {
    static findQuestionByID(id){
        return AppetiteQuestions.find((question) => {
            return question.id === id
        })
    }

}

export class BOPEligibilityMetadata {
    static findQuestionByID(id){
        return BOPEligibilityQuestions.find((question) => {
            return question.id === id
        })
    }

}