import React from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="container">
                <div className="col-12">
                    <div className="question-text">
                        Congrats! You are eligible for following products -  
                    </div>
                </div>

                <div className="col">
                    <div className="col">
                        <NavLink to="/business" className="btn product-icon text-primary" >
                            <i className="far fa-building" />
                        </NavLink>
                        <h4>BOP</h4>
                    </div>
                    <div className="col">
                        <button className="btn product-icon text-third">
                            <i className="fas fa-truck-moving"></i>
                        </button>
                    </div>
                    <div className="col">
                        <button className="btn product-icon text-default">
                            <i className="fas fa-umbrella"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        submission: state.submission
    }
}

const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(ProductsPage);