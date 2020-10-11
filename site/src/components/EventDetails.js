import React from 'react';
import '../css/list.css'

export default class EventDetails extends React.Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {
       
    }

    componentDidUpdate(prevProps) {

    }

        
  stopProp = (e) => {
    e.stopPropagation();
  }


    render() {
        return (
            <>
                <div className="modalWrapper" onClick={() => this.props.closeDetails()}>
                    <div className="modalInner" onClick={this.stopProp}>
                        
                    </div>

                </div>
            </>
        )
    }

}