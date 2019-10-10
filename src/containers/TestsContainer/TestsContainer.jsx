import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SocketService from '../../api/socket';
export default class TestsContainer extends Component {

    state = {
        socket: {
            topic: '',
            message: ''
        }
    }

    handleChange = (el, obj) => {
        const { value } = el.target;
        const socket = { ...this.state.socket };
        socket[obj] = value;
        this.setState({ socket });
    }

    sendMessage = () => {
        const { topic, message } = this.state.socket;
        console.log(topic, message)
        SocketService.socket.emit(topic, message);
    }

    render() {
        return (
            <Container>
                <div>TESTS CONTAINER</div>
                <ul>
                    <li>Novo popid</li>
                    <li>Recarregar</li>
                </ul>

                <Box>
 
                    <TextField
                        id="topic"
                        name="topic"
                        label="topic"
                        value={this.state.socket.topic}
                        onChange={(el) => this.handleChange(el, 'topic')}
                        margin="normal"
                    />

                    <TextField
                        id="message"
                        name="message"
                        label="message"
                        value={this.state.socket.message}
                        onChange={(el) => this.handleChange(el, 'message')}
                        margin="normal"
                    />

                    <Button onClick={this.sendMessage} variant="outlined">ENVIAR</Button>

                </Box>

            </Container>
        )
    }
}
