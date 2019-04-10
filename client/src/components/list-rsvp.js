import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom";

const Rsvp = props => (
    <tr>
        <td>{props.rsvp.rsvp_person}</td>
        <td>{props.rsvp.rsvp_going?'Yes':'No'}</td>
        <td>
            <Link to={"/edit/" + props.rsvp._id} className='btn btn-dark btn-sm'>Edit</Link> <Link to={"/delete/" + props.rsvp._id}  className='btn btn-dark btn-sm'>Delete</Link>
        </td>
    </tr>
);

export default class ListRsvp extends Component {
    constructor(props) {
        super(props);
        this.state = {rsvps: []};
    }

    componentDidMount() {
        console.log("Refresh Data!");
        fetch('/rsvp')
            .then(data => data.json())
            .then(returnedData => this.setState({rsvps: returnedData}))

    }

    rsvpList() {
        return (
            this.state.rsvps && this.state.rsvps.map(function (currentRsvp, i) {
                return <Rsvp rsvp={currentRsvp} key={i}/>;
            }))
    }


    render() {
        return (
            <div>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Person Invited</th>
                        <th>Responded?</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.rsvpList()}
                    </tbody>
                </table>
            </div>
        )
    }
}