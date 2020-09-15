import React from 'react';
import axios from 'axios';
import { config } from '../config.js';
import '../css/list.css'
import LeagueDetails from '../components/LeagueDetails';
import '../css/modal.css'

export default class LeagueList extends React.Component {

    constructor(props) {
        super(props);;
    }

    state = {
        searchString: "Search doesn't work yet",
        selectedLeague: false,
        showDetails: false,
        leagues: [],
        sort: "leagueName",
        sortValue: 1,
        count: 0,
        currentPage: 1,
        perPage: 30,
        pagination: [],
        totalPages: 0
    };

    componentDidMount() {
        this.fetchList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.sort != prevState.sort || this.state.sortValue != prevState.sortValue || this.state.currentPage != prevState.currentPage) {
            this.fetchList();
        }
        if (this.state.count != prevState.count || this.state.currentPage != prevState.currentPage) {
            this.generatePageNumbers();
        }

    }

    fetchList() {

        axios.get(`${config.apiUrl}/leagues?sort=${this.state.sort}&sortValue=${this.state.sortValue}&page=${this.state.currentPage - 1}&perPage=${this.state.perPage}`).then(res => {
            this.setState({ leagues: res.data[0], count: res.data[1] });
        })

    }

    changePage(pageNumber) {
        console.log("change");
        this.setState({ currentPage: pageNumber });
    }

    closeDetails(){
        this.setState({
            showDetails: false
        });
    }


    generatePageNumbers() {

        var pagesList = [];
        var totalPages = this.state.count / this.state.perPage;
        this.setState({ totalPages: totalPages });
        var skip = Math.floor(totalPages / 15);

        for (var i = 1; i <= totalPages; i++) {
            if (i == 1 || i == totalPages) {
                pagesList.push(i);
            } else
                if (i <= this.state.currentPage + 4 && i >= this.state.currentPage - 4) {
                    pagesList.push(i);

                } else if (i % skip == 0) {
                    pagesList.push(i);
                }
        }

        this.setState({ pagination: pagesList })

    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
        }
    }

    nextPage() {
        if (this.state.currentPage < this.state.totalPages) {
            this.setState({ currentPage: this.state.currentPage + 1 });
        }
    }

    sort(sortKey) {
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

    showDetails(id) {
        this.setState({
            selectedLeague: id,
            showDetails: true
        });
        console.log(this.state);
    }

    
  stopProp = (e) => {
    e.stopPropagation();
  }

    render() {
        return (
            <>
                {this.state.showDetails ?
                    <div className="modalWrapper" onClick={() => this.closeDetails()}>
                        <div className="modalInner" onClick={this.stopProp}>
                            <LeagueDetails leagueId={this.state.selectedLeague}></LeagueDetails>
                        </div>

                    </div>


                    :

                    null
                }

                <input type="text" value={this.state.searchString}></input>
                <br /><br />
                <table>
                    <tr>
                        <td style={{ width: "20em" }}>
                            <div onClick={() => this.sort("leagueName")}><b>League Name</b>
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
                            <b>City</b>
                        </td>
                        <td>
                            <b>Region</b>
                        </td>
                        <td>
                            <div style={{ width: "12rem" }} onClick={() => this.sort("country")}><b>Country</b>
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

                            <td onClick={() => this.showDetails(league.leagueId)}>{league.leagueName}</td>
                            <td>{league.city}</td>
                            <td>{league.region}</td>
                            <td>{league.country}</td>
                        </tr>

                    )}

                </table>
                <div id="pagination">
                    <span className=
                        {this.state.currentPage > 1 ? "link" : null} onClick={() => this.prevPage()}>{'\u003C'}
                    </span>
                    {
                        this.state.pagination.map(page =>
                            <span className={this.state.currentPage == page ? "activeLink link" : "link"} style={{ padding: "5px" }} onClick={() => this.changePage(page)}>{page}
                            </span>)
                    }

                    <span className=
                        {this.state.currentPage < this.state.totalPages ? "link" : null} onClick={() => this.nextPage()}>{'\u003E'}
                    </span>
                </div>
            </>
        )
    }

}