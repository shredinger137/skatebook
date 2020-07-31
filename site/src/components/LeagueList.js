import React from 'react';
import axios from 'axios';
import { config } from '../config.js';

export default class LeagueList extends React.Component {

    constructor(props) {
        super(props);;
    }

    state = {
        leagues: []
    };

    componentDidMount() {
        this.fetchList();
    }

    componentDidUpdate() {

    }

    fetchList() {
        axios.get(`${config.apiUrl}/leagues`).then(res => {
            this.setState({ leagues: res.data });
        })

    }

    render() {
        return (
            <>
                <table>
                    {this.state.leagues.map(league => 
                    
                        <tr>
                            <td>{league.leagueName}</td>
                            <td>{league.country}</td>
                        </tr>
                    
                    )}

                </table>
            </>
        )
    }

}