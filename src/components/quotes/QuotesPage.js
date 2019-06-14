import React from "react";
import { NavLink, BrowserRouter } from 'react-router-dom';

class QuotesPage extends React.Component {

    render() {
        return (
            <div class="page">
                <h3>Quotes</h3>
                <div class="row">
                    <div class="col-2">
                        <NavLink to="/new-quote" className="nav-link btn btn-primary" >
                            <i className="fa fa-plus" />
                            {" New Quote"}
                        </NavLink>

                    </div>

                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Policy Number</th>
                            <th scope="col">Account</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-active">
                            <th scope="row">Active</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr>
                            <th scope="row">Default</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>


                        <tr class="table-primary">
                            <th scope="row">Primary</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-secondary">
                            <th scope="row">Secondary</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-success">
                            <th scope="row">Success</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-danger">
                            <th scope="row">Danger</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-warning">
                            <th scope="row">Warning</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-info">
                            <th scope="row">Info</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-light">
                            <th scope="row">Light</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                        <tr class="table-dark">
                            <th scope="row">Dark</th>
                            <td>Cell</td>
                            <td>Cell</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}

export default QuotesPage;
