import React from 'react';
import axios from 'axios';
import { config } from '../config.js';

export default class LeagueList extends React.Component {

    constructor(props) {
        super(props);;
    }

    state = {
        leagues: [],
        sort: "leagueName",
        sortValue: 1,
        count: 0
    };

    componentDidMount() {
        this.fetchList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.sort != prevState.sort || this.state.sortValue != prevState.sortValue) {
            this.fetchList();
        }

    }

    fetchList() {

        axios.get(`${config.apiUrl}/leagues?sort=${this.state.sort}&sortValue=${this.state.sortValue}`).then(res => {
            this.setState({ leagues: res.data[0], count: res.data[1] });
        })

    }

    sort(sortKey) {

        //TODO: Set this to actually sort by different keys.
        if (this.state.sort == sortKey) {
            this.setState((prevState) => ({
                sortValue: prevState.sortValue * -1
            }))
        } else {
            this.setState({
                sort: sortKey,
                sortValue: 1
            })
        }
    }

    render() {
        return (
            <>
                <table>
                    <tr>
                        <td>
                            <div onClick={() => this.sort("leagueName")}>League Name
                            <span>
                                    {this.state.sort == "leagueName" ?
                                        this.state.sortValue === 1 ?
                                            '\u25B2' : '\u25BC'
                                        :
                                        null
                                    }
                                </span>
                            </div>
                        </td>
                        <td>
                            <div onClick={() => this.sort("country")}>League Country
                            <span>
                                    {this.state.sort == "country" ?
                                        this.state.sortValue === 1 ?
                                            '\u25B2' : '\u25BC'
                                        :
                                        null
                                    }
                                </span>
                            </div>
                        </td>

                    </tr>
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