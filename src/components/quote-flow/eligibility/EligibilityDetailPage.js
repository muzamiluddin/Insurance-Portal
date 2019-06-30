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

class EligibilityDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: {},
            formValid: false
        };
    }
    
    handleChange = (e) => {
        console.log("handle change event triggered");
        const target = e.target;
        let value = target.value;
        const name = target.name;
        e.persist();
        let updatedQuestions = this.state.questions;
        updatedQuestions[name].value = !this.state.questions[name].value;
        updatedQuestions[name].touched = true;
        this.setQuestions(updatedQuestions);
    }

    // Validate Question on Blur and update State
    handleBlur = (e) => {
        const target = e.target;
        let value = target.value;
        const name = target.name;
        e.persist();
        let updatedQuestions = this.state.questions;
        updatedQuestions[name].touched = true;
        updatedQuestions[name] = this.validateQuestion(updatedQuestions[name])
        this.setQuestions(updatedQuestions);
    }


    // Fetch eligibility questions and populate screen
    componentDidMount() {
        let questionSet = {};
        let currentObj = this;
        QuestionUtil.fetchEligibilityQuestions().then(function (response) {
            let questionKeys = response.data.result.answers
            for (const ID in questionKeys) {
                let question = BOPEligibilityMetadata.findQuestionByID(ID)
                if (!_.isUndefined(question)) {
                    questionSet[ID] = question;
                }
            }
            currentObj.setQuestions(questionSet); 
        })
    }

    // Update quesiton sets
    setQuestions(questionSet) {
        this.setState(prevState => ({
            ...prevState,
            questions: {
                ...questionSet,
            }
        }));
    }

    // Get the question value
    questionValue(ID){
        return this.state.questions[ID].value
    }

    errorClass(hasError){
        if (hasError){
            return "error-toggle"
        }
    }

    // Render question HTML
    renderQuestion(question) {
        return(<div className="row question-row">
            <div className="col-10">
                {question.desc}
            </div>
            <div className={`col-2 pull-right ${this.errorClass(question.error)}`}>
                <Toggle
                    onChange={(e) => {this.handleChange(e)}}
                    checked={this.questionValue(question.id)}
                    value={this.questionValue(question.id)}
                    onBlur={this.handleBlur}
                    name={question.id}
                />
            </div>
        </div>);
    }

    renderQuestionSet() {
        let questionKeys = Object.keys(this.state.questions)
        if (questionKeys.length == 0){
            return;
        }
        return questionKeys.map((key) => {
            return <div>
                {this.renderQuestion(this.state.questions[key])}
            </div>              
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.validateForm()){
            this.props.dispatch(AppActions.EligibilityBeforeSave(this.state.questions));
            QuestionUtil.updateEligibilityQuestion(this.state.questions).then(function(response){
                Alert.success("Eligibility Questions updated successfully");
                console.log(response);
            })
        } else{
            console.log("Error has occured");
        }
    }

    // Returns the whole form. 
    // Returns true if form is valid
    // Returns  false if form has an error 
    validateForm() {
        let questionKeys = Object.keys(this.state.questions);
        let formValid = true;
        let qs = this.state.questions;
        // Evaluate individual questions
        questionKeys.map((key) => {
            qs[key] = this.validateQuestion(qs[key]) 
            if (qs[key].error){
                formValid = false;
            }
        });
        this.setQuestions(qs);
        return formValid;
    }

    validateQuestion(question){
        if ((!question.value || question.value == '')){
            question.error = true;
            question.errorMessage = 'Field is required!';
            question.touched = true;
        } else {
            question.error = false;
            question.errorMessage = '';
        }
        return question;
    }

    render() {
        return (<div className="container">
            <h2>Eligibility Questions</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                {this.renderQuestionSet()}
                <div className="row">
                    <div className="offset-md-11 col-md-1">
                        <button type="submit" className="btn btn-primary pull-right btn-lg">Next</button>
                    </div>
                </div>
            </form>
            <div className="row jumbotron">
                <h2>CURRENT STATE</h2>
                {JSON.stringify(this.state)}
            </div>
        </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        submission: state.submission
    }
}

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(EligibilityDetailPage);