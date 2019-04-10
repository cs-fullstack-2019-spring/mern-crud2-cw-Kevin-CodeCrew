import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Redirect} from "react-router-dom";

export default class DeleteRsvp extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.targetHomePage = this.targetHomePage.bind(this);

        this.state = {
            rsvp_id:'',
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false,
        };
    }

    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp/' + this.props.match.params.id)
            .then(data => data.json())
            .then(response => {
                this.setState({
                    rsvp_id: response._id,
                    rsvp_person: response.rsvp_person,
                    rsvp_going: response.rsvp_going
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Form Submitted!');
        console.log(`RSVP Person: ${this.state.rsvp_person}`);
        console.log(`RSVP Is Going: ${this.state.rsvp_going}`);

        return fetch('/rsvp/'+this.state.rsvp_id, {
            method: 'DELETE'
        })
            .then(res => res.text()) // OR res.json()
            .then(res => console.log(res))
            .then(() => {
                    this.targetHomePage()
                }
            );
    }

    targetHomePage() {
        this.setState({toHomePage: true})
    }

    render() {
        if (this.state.toHomePage === true) {
            return <Redirect to={'/'}/>
        }
        return (
            <div style={{marginTop: 20}}>
                <h3>Delete RSVP</h3>
                <form onSubmit={this.onSubmit}>
                    <div className={"form-group"}>
                        <label>Person Invited: {this.state.rsvp_person}</label>
                    </div>
                    <div className={"form-group"}>
                        <label>Has RSVPed: {this.state.rsvp_going?'Yes':'No'}</label>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group" aria-label="Basic example">
                            <input type="submit" value="Delete RSVP" className="btn btn-danger mr-2"/>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button className="btn btn-secondary mr-2" onClick={this.targetHomePage}>Cancel</button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}