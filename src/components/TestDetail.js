import React from 'react';

class MiniFormik extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        values: this.props.initialValues || {},
        touched: {},
        errors: {}
    };
    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        e.persist();
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            }
        }));
        //        console.log("Target: " + target);
        //        console.log("Value: "  + target.value);
        //        console.log("name: " + target.name);
    }

    handleBlur = (e) => {

    }

    render() {
        return this.props.children({
            ...this.state,
            handleChange: this.handleChange,
            handleBlur: this.handleBlur
        })
    };

}

class TestDetailPage extends React.Component {
        render() {
        return (<MiniFormik initialValues={{email: 'awes@awes.com', name: 'john doe'}}>
            {(props)=>{return(<form>
                    <div>
                        Email: <input type="email" name="email" onChange={props.handleChange} value={props.values.email}
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <div>
                        Name: <input type="name" name="name" onChange={props.handleChange} value={props.values.name}
                            onBlur={this.handleBlur}
                        />
                    </div>
                    <pre>{JSON.stringify(props, null, 2)}</pre>
                </form>
            )}
            }
        </MiniFormik>
        );
    };
};

export default TestDetailPage;