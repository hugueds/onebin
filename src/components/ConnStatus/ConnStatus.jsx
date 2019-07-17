import React, { Component } from 'react';
import './ConnStatus.css';

export default class ConnStatus extends Component {

    state = {
        ip: '10.8.66.100',
    }
    

    render() {
        return (
            <div className="" style={{display: 'flex'}}>
                {/* <div style={{display: 'flex', alignContent: 'center', alignSelf: 'centern   '}} >{this.state.ip}</div> */}
                <div className="conn-status conn-status--online"></div>
            </div>
        )
    }
}
