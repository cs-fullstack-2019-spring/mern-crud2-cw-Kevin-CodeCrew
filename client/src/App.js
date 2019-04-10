import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import CreateRsvp from './components/create-rsvp';
import DeleteRsvp from './components/delete-rsvp';
import EditRsvp from './components/edit-rsvp';
import ListRsvp from './components/list-rsvp';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link to="/" className="navbar-brand">RSVPManager</Link>
                        <div>
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">RSVPs</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">New RSVP</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path="/" exact component={ListRsvp}/>
                    <Route path="/create" component={CreateRsvp}/>
                    <Route path="/edit/:id" component={EditRsvp}/>
                    <Route path="/delete/:id" component={DeleteRsvp}/>
                </div>
            </Router>
        );
    }
}

export default App;
