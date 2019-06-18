import React from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';


class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-12 d-flex justify-content-center">
                    <div className="question-text">
                        Select a product to get a quote...
                    </div>
                </div>

                <div className="col-12">
                    <NavLink to="/business" className="btn product-icon text-primary" >
                        <i className="far fa-building" />
                    </NavLink>
                    <button className="btn product-icon text-third">
                        <i className="fas fa-truck-moving"></i>
                    </button>
                    <button className="btn product-icon text-default">
                        <i className="fas fa-umbrella"></i>
                    </button>

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