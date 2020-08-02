import React from 'react';
import axios from 'axios';
import { config } from '../config.js';
import '../css/list.css'

export default class LeagueList extends React.Component {

    constructor(props) {
        super(props);;
    }

    state = {
        leagues: [],
        sort: "leagueName",
        sortValue: 1,
        count: 0,
        currentPage: 1,
        perPage: 30,
        pagination: []
    };

    componentDidMount() {
        this.fetchList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.sort != prevState.sort || this.state.sortValue != prevState.sortValue || this.state.currentPage != prevState.currentPage) {
            this.fetchList();
        }
        if (this.state.count != prevState.count || this.state.currentPage != prevState.currentPage){
            this.generatePageNumbers();
        }

    }

    fetchList() {

        axios.get(`${config.apiUrl}/leagues?sort=${this.state.sort}&sortValue=${this.state.sortValue}&page=${this.state.currentPage - 1}&perPage=${this.state.perPage}`).then(res => {
            this.setState({ leagues: res.data[0], count: res.data[1] });
        })

    }

    changePage(pageNumber){
        console.log("change");
        this.setState({currentPage: pageNumber});
    }


    generatePageNumbers(){

        var pagesList = [];
        var totalPages = this.state.count / this.state.perPage;
        var skip = Math.floor( totalPages / 15 );
 
        for(var i = 1; i <= totalPages; i++){
            if(i == 1 || i == totalPages){
                pagesList.push(i);
            } else
                if(i <= this.state.currentPage + 4 && i >= this.state.currentPage - 4 ){
                pagesList.push(i);

            } else if(i % skip == 0){
                pagesList.push(i);
            }
        }

        this.setState({pagination: pagesList})
        
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
                <div id="pagination">
                    {this.state.pagination.map(page =>
                        

                        <span className={this.state.currentPage == page ? "activeLink link" : "link"} style={{padding: "5px"}}onClick={() => this.changePage(page)}>{page}</span>)}
                </div>
            </>
        )
    }

}