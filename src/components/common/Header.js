import React from "react";
import { connect } from "react-redux";
import { NavLink, BrowserRouter } from 'react-router-dom';

class Header extends React.Component {
    headerLinks() {
        return (
            <div class="row pull-right w-100">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <NavLink to="/quotes" className="nav-link" activeClassName="active">Quotes</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/policies" className="nav-link" activeClassName="active">Policies</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/account" className="nav-link" activeClassName="active">Accounts</NavLink>
                        </li>

                    </ul>
                </div>

                <div class="pull-right">
                    <NavLink to="/new-quote" className="nav-link btn btn-primary" >
                        <i class="fa fa-plus" />
                        {" New Quote"}
                    </NavLink>
                </div>
            </div>
        );
    }

    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-dark mb-4">
                <a class="navbar-brand" href="#">
                    ACME
                <span class="text-primary"> Insurance </span>
                </a>
                { !this.props.app.QuoteInProgress && this.headerLinks() }
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