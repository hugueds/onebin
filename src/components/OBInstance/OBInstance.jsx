import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PartBox from '../../components/PartBox/PartBox';


export default class OBInstance extends Component {

    componentDidMount() {

    }

    openDialog = (partNumber) => {
        this.props.openDialog(partNumber)
    }

    render() {

        const { instance } = this.props;
        const Boxes = () => instance.boxes.map((b, i) => {
            return (
                <Grid item xs={6} key={i}>
                    <PartBox box={b} onReload={this.handleReload} openDialog={this.openDialog} />
                </Grid>
            )
        })

        return (
            <Grid container style={{ border: '3px solid lightgray', borderRadius: '3rem', padding: '1rem', margin: '1.5% 0 0 0' }}>
                <Grid item xs={12}>
                    <Typography variant="h4" >{instance.description}</Typography>
                </Grid>
                <Boxes />
            </Grid>
        )
    }
}
