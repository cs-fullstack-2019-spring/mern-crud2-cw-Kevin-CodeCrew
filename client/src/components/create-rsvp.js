import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Redirect} from "react-router-dom";

export default class CreateRsvp extends Component {
    constructor(props) {
        super(props);

        this.onChangeRSVPPerson = this.onChangeRSVPPerson.bind(this);
        this.onChangeRSVPGoing = this.onChangeRSVPGoing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.targetHomePage = this.targetHomePage.bind(this);

        this.state = {
            rsvp_person: '',
            rsvp_going: false,
            toHomePage: false,
        };
    }

    onChangeRSVPPerson(e) {
        this.setState({
            rsvp_person: e.target.value
        })
    }


    onChangeRSVPGoing(e) {
        this.setState({
            rsvp_going: e.target.value
        });
        console.log(this.state.rsvp_going);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('Form Submitted!');
        console.log(`RSVP Person: ${this.state.rsvp_person}`);
        console.log(`RSVP Is Going: ${this.state.rsvp_going}`);

        let data = {
            rsvp_person: this.state.rsvp_person,
            rsvp_going: this.state.rsvp_going
        };

        return fetch('/rsvp', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "cors",
            body: JSON.stringify(data)
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
                <h3>Create RSVP</h3>
                <form onSubmit={this.onSubmit}>
                    <div className={"form-group"}>
                        <label>Person Invited:</label>
                        <input type="text" className="form-control" value={this.state.rsvp_person}
                               onChange={this.onChangeRSVPPerson} required autoFocus/>
                    </div>
                    {/*<div className={"form-group"}>*/}
                    {/*    <label>Has RSVPed?</label>*/}
                    {/*    <input type="text" className="form-control" value={this.state.rsvp_going}*/}
                    {/*           onChange={this.onChangeRSVPGoing} required/>*/}
                    {/*</div>*/}
                    <div className={"form-group"}>
                        <label>
                            Has RSVPed?
                        </label>
                        <select value={this.state.rsvp_going} onChange={this.onChangeRSVPGoing} className="form-control">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="btn-toolbar">
                        <div className="btn-group mr-2" role="group" aria-label="Basic example">
                            <input type="submit" value="Create RSVP" className="btn btn-success mr-2"/>
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