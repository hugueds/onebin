import React, { Component } from 'react';
import SocketService from '../../api/socket';
import './ConnStatus.css';

export default class ConnStatus extends Component {

    state = {
        ip: '10.8.66.100',
        connection: 'offline',
        tablet: 'TABLET'
    }

    componentDidMount() {
        SocketService.socket.on('connect', () => { 
            this.setState({connection: 'online'});
        });
        SocketService.socket.on('ip', (ip, tablet) => {
            let tabletName = tablet ? tablet.name : 'Não Cadastrado';
            this.setState({ip, tablet: tabletName})
        });
        SocketService.socket.on('disconnect', () => {
            this.setState({connection: 'offline', tablet: '', ip: 'DISCONNECTED'});
        });
        // SocketApi.socket.on('disconnect', () => console.log('deu ruim'))
    }
    

    render() {
        return (
            <div className="" style={{display: 'flex',  width: '30%'}}>
                <div style={{display: 'flex', alignContent: 'center', alignSelf: 'center', fontWeight: 'bold'}} >{this.state.ip}</div>
                <div style={{display: 'flex', flex: '1 1 auto'}} ></div>
                <div style={{display: 'flex', alignContent: 'center', alignSelf: 'center', fontWeight: 'bold'}} >{this.state.tablet}</div>
                <div className={"conn-status conn-status--" + this.state.connection} ></div>
            </div>
        )
    }
}
