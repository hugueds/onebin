import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class HomeContainer extends Component {
    render() {
        return (
            <Container>
                <TextField variant="outlined"></TextField>
                <Button color="primary" variant="contained">START</Button>
            </Container>
        )
    }
}
