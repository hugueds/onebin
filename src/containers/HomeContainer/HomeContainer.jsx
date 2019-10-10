import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { save } from '../../api/ls';

const style = {
    textField: {
        width: '30%',
        fontSize: '5vh',
        textAlign: 'center',
        margin: '0 auto',
        display: 'flex',
        border: '1px solid black',
        marginTop: '5%',
        marginBottom: '5%'
    }
}

export default class HomeContainer extends Component {

    state = {
        login: {
            user: 'SSB',
            pass: ''
        }
    }

    componentDidMount() {
        save('user', '');
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const login = { ...this.state.login };
        login[name] = value.toUpperCase();
        this.setState({ login })
    }

    handleClick = (e) => {
        const login = {...this.state.login};        
        const reg = /^SSB\w{3}$/g
        if (reg.test(login.user)) {            
            window.location.hash = '#/';
            setTimeout(() => window.location.reload(), 100)
            save('user', login.user);
            return;
        } else {
            login['user'] = 'SSB';
            this.setState({ login })
            alert('Invalid User');
        }
    }

    render() {
        return (
            <Container>

                <Box style={{ marginTop: '2%' }}>

                    <Typography variant="h4"> USUÁRIO </Typography>

                    <TextField
                        id="user"
                        name="user"
                        style={style.textField}
                        value={this.state.login.user}
                        variant="outlined"
                        onChange={this.handleChange}
                    />

                    <Button onClick={this.handleClick} color="primary" variant="contained">START</Button>
                </Box>

            </Container>
        )
    }
}
