import React from 'react';
import axios from 'axios';
import { config } from '../config.js';
import '../css/list.css'

export default class LeagueDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        leagueData: {
            leagueName: ""
        }
    };


    componentDidMount() {
        this.getLeagueDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.leagueId != this.props.leagueId) {
            this.getLeagueDetails();
        }
        console.log(prevProps);

    }


    getLeagueDetails() {
        if (this.props.leagueId) {
            axios.get(`${config.apiUrl}/singleLeague?id=${this.props.leagueId}`).then(res => {
                if (res.data && res.data[0]) {
                    this.setState({ leagueData: res.data[0] });
                    console.log(res.data[0]);
                }

            })
        }
    }

    render() {
        return (
            <>
                <p>League Name: {this.state.leagueData.leagueName}</p>
                <p>Location: {this.state.leagueData.city}, {this.state.leagueData.region}, {this.state.leagueData.country}</p>
        <p>Website: <a href={this.state.leagueData.websiteUrl} target="_new">{this.state.leagueData.websiteUrl}</a></p>
            </>
        )
    }

}