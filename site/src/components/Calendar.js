import React from "react"
import { config } from '../config.js';

export default class Calendar extends React.Component {
  state = {}
  componentDidMount() {

    //TV guide calendar ID: bWY3bGo3dDI0ajY4azJpYmdrNHZzMjIyMGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ

    var calKey = "bWY3bGo3dDI0ajY4azJpYmdrNHZzMjIyMGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ";
    var current = new Date();
    
    //TODO: Set time min to today; allow 'view past entries' or something.

    //TODO: Recurring events needs to be handled in a separate parser.

    var calURL = "https://www.googleapis.com/calendar/v3/calendars/mf7lj7t24j68k2ibgk4vs2220g@group.calendar.google.com/events?key=" + config.calKey + "&timeMin=" + current.getFullYear() + "-01-01T00:00:00-07:00";
    var request = new XMLHttpRequest();
    const setState = this.setState.bind(this);
    request.open('GET', calURL, true);
    request.onload = function (e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var json_obj = (JSON.parse(request.responseText))['items']
          setState(json_obj)
          console.log(json_obj)
        } else {
          console.error(request.statusText);
        }
      }

    }
    request.send();

  }

  eventFilter(data) {


    console.log(data);

    var holdArr = [];
    var resultsArray = [];
    var date, team, place, linkText;

    for (var i = 0; i <= Object.keys(data).length; i++) {
      if (data && data[i] && data[i]['start']) {

        var parsedDate = new Date(data[i]['start']['dateTime']);
        //create the date string in mm/dd format

        var mm = parsedDate.getMonth() + 1;
        var dd = parsedDate.getDate();
        var yy = String(parsedDate.getFullYear()).substring(2,4);
        var hh = String(parsedDate.getHours());
        var min = String(parsedDate.getMinutes());
        if(hh.length < 2){
          hh = "0" + hh;
        }
        if(min.length < 2){
          min = "0" + min;
        }

        date = mm + "/" + dd + "/" + yy + " " + hh + ":" + min;
        var title = data[i]['summary'];

        holdArr = [title, date, parsedDate, i];
        resultsArray.push(holdArr);

      }
    }
    //On return - sort items by date
    return resultsArray.sort(function compare(a, b) {
      var dateA = new Date(a[2]);
      var dateB = new Date(b[2]);
      return dateA - dateB;
    });

  }



  render() {
    return (
      <div>
        <h4>Streaming calendar by NERDerby. Not quite done. See actual calendar <a href="https://t.co/TeSW3nCMV0?amp=1" target="_blank">here.</a> Recurring events aren't handled correctly yet.</h4>
        <table className="events-table">
          <thead >
            <tr>
              <td className="table-header" style={{paddingLeft: "15px", paddingRight: "15px"}}>Title</td>
              <td className="table-header" style={{paddingLeft: "15px", paddingRight: "15px"}}>Date</td>
            </tr>
          </thead>
          <tbody>
            {!this.state ? <div>Loading Events</div>
              :
              <>{(this.eventFilter(this.state)).map((event) =>
                <tr key={event[8]}>
                  <td key={event[0]} style={{paddingLeft: "15px", paddingRight: "15px"}}>{event[0]}</td>
                  <td key={event[1]} style={{paddingLeft: "15px", paddingRight: "15px"}}>{event[1]}</td>
                </tr>
              )}</>
            }
          </tbody>
        </table>
      </div>
    );
  }
}
