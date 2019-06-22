import React from "react";
import { NavLink } from 'react-router-dom';

class QuotesPage extends React.Component {

    render() {
        return (
            <div className="container">
                <h3>Quotes</h3>
                <div className="row">
                    <div className="col-3 offset-md-9">
                        <NavLink to="/new-quote" className="nav-link btn btn-primary pull-right" >
                            <i className="fa fa-plus" />
                            {" New Quote"}
                        </NavLink>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Policy Number</th>
                                    <th scope="col">Account</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-active">
                                    <th scope="row">Active</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr>
                                    <th scope="row">Default</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>


                                <tr className="table-primary">
                                    <th scope="row">Primary</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-secondary">
                                    <th scope="row">Secondary</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-success">
                                    <th scope="row">Success</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-danger">
                                    <th scope="row">Danger</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-warning">
                                    <th scope="row">Warning</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-info">
                                    <th scope="row">Info</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-light">
                                    <th scope="row">Light</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                                <tr className="table-dark">
                                    <th scope="row">Dark</th>
                                    <td>Cell</td>
                                    <td>Cell</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuotesPage;
