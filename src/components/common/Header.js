import React from "react";
import { connect } from "react-redux";
import { NavLink, BrowserRouter } from 'react-router-dom';

class Header extends React.Component {
    headerLinks() {
        return (
            <div className="row w-100 ml-1">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/quotes" className="nav-link" activeClassName="active">Quotes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/policies" className="nav-link" activeClassName="active">Policies</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/account" className="nav-link" activeClassName="active">Accounts</NavLink>
                        </li>

                    </ul>
                </div>

            </div>
        );
    }

    helpLinks(){
        return (
            <span className="help-link pull-right">
                <button className="btn btn-primary">
                   <i className="fa fa-phone" aria-hidden="true"></i>
                </button>
            </span>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark mb-4">
                <div className="row w-100">
                    <div className="col-2 text-primary brand pull-left">
                        ACME
                    </div>
                    <div className="col-9">
                        { !this.props.app.QuoteInProgress && this.headerLinks() }
                    </div>
                    <div className="col-1 pull-right">
                        { this.helpLinks()}
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}
const connectedStateAndProps = connect(mapStateToProps);
export default connectedStateAndProps(Header);