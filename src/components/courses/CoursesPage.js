import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";

class CoursesPage extends React.Component {
    state = { 
        course: {
            title: ''
        }
    }

    handleChange = (event) => {
        const course = { ...this.state.course, title: event.target.value }
        this.setState({ course: course });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch(courseActions.createCourse(this.state.course))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Courses</h2>
                    <h3> Add Course </h3>
                    <input type="text" value={this.state.course.title} onChange={this.handleChange.bind(this)} />
                    <input type="submit" value="Save" />
                </form>
                <div class="row">
                    <div class="col-12">
                      {
                          this.props.courses.map((course) => 
                            <li>{course.title}</li>
                          )
                      }
                    </div>
                </div>
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(CoursesPage);