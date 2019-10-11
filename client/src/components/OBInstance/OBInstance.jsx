import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PartBox from '../../components/PartBox/PartBox';

const styles = {
    container: {
        border: '3px solid lightgray',
        borderRadius: '3rem',
        padding: '1rem',
        margin: '1.5% 0 0 0'
    },
    title: {
        margin: '-0.5rem 0 0.5rem 0'
    }
}

export default class OBInstance extends Component {

    componentDidMount() {

    }

    openDialog = (partNumber) => {
        this.props.openDialog(partNumber)
    }

    render() {

        const { instance } = this.props;

        const boxes1 = instance.boxes.filter((b) => b.order === 0);
        const boxes2 = instance.boxes.filter((b) => b.order === 1);

        const Boxes1 = () => boxes1.map((b, i) => {
            return (
                <PartBox key={i} box={b} onReload={() => this.props.onReload(instance._id, b)} openDialog={() => this.props.openDialog(instance._id, b)} />
            );
        });

        const Boxes2 = () => boxes2.map((b, i) => {
            return (
                <PartBox key={i} box={b} onReload={() => this.props.onReload(instance._id, b)} openDialog={() => this.props.openDialog(instance._id, b)} />
            );
        });

        return (
            <Grid direction="row" container style={styles.container}>
                <Grid item xs={12} style={styles.title}>
                    <Typography variant="h4" >{instance.description}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Boxes1 />
                </Grid>
                <Grid item xs={6}>
                    <Boxes2 />
                </Grid>
            </Grid>
        )
    }
}


