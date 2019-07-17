import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import OBInstance from '../../components/OBInstance';
import EditPartDialog from '../../components/EditPartDialog';
import instances from '../../data/instances'; // DEBUG


// function OBInstances()  {
//     return instances.map((i, k) => <OBInstance key={k} instance={i} />)
// }

export default class MainContainer extends Component {

    state = {
        dialogOpen: false,
        partBox: ""
    }

    handleReload = () => {

    }

    handleSave = (partBox) => {
        console.log('handlesave', partBox);
        this.setState({dialogOpen: false});
    }

    handleClose = () => {
        this.setState({ dialogOpen: false, partBox: {} });
    }

    handleOpenDialog = (partBox) => {
        console.log(partBox.target);
        this.setState({ dialogOpen: true });
    }

    render() {
        /*
            Para cada processo, carregar um quadrado que o representa
            Para cada partNumber no processo, criar uma nova linha
        */
        const { dialogOpen, partBox } = this.state;

        const OBInstances = () => instances.map((i, k) => <OBInstance key={k} instance={i} openDialog={this.handleOpenDialog} />)

        return (
            <Container maxWidth="lg">
                <EditPartDialog open={dialogOpen} partBox={partBox} handleClose={this.handleClose} handleSave={this.handleSave} />
                <OBInstances />
            </Container>
        )
    }
}
