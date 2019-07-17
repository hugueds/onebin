import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';

const styles = {
    buttonEdit: {
        background: '#e1a93e'
    },
    buttonReload: {
        background: '#005d6d'
    },
};

const bStt = {
    ok: {
        background: '#60e266',
        padding: '0.7rem'
    },
    warning: {
        background: '#ffec00',
        padding: '0.7rem'
    },
    danger: {
        background: '#D6001C',
        padding: '0.7rem'
    }
}

export default class PartBox extends Component {

    state = {
        box: ""
    }

    componentDidMount() {
        this.setState({ box: this.props.box })
    }

    update = (o) => {
        console.log(o.target)
    }

    render() {

        const { box } = this.state;

        const boxStatus = getBoxStatus(box);

        return (
            <Box style={{ fontSize: '0.75rem', margin: '0.2rem', border: '1px solid black', padding: '0.2rem' }}>
                <Grid container direction="row" justify="space-between" alignItems="center" spacing={0}>
                    <Grid item xs={1} > &zwnj; {box.boxNumber + 1} </Grid>
                    <Grid item xs={1} >CX{box.order + 1} </Grid>
                    <Grid item xs={2} >{box.partNumber}</Grid>
                    <Grid item xs={2} className="partNumber__quantity--ok" style={bStt[boxStatus]}>{box.quantity}</Grid>
                    <Grid item xs={2} >
                        <Fab size="small" color="primary" className="button--edit" style={styles.buttonEdit} onClick={this.props.openDialog} >
                            <Icon>edit</Icon>
                        </Fab>
                    </Grid>
                    <Grid item xs={2} >
                        <Fab size="small" color="secondary" className="button--reload" style={styles.buttonReload} onClick={this.update} >
                            <Icon>replay</Icon>
                        </Fab>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

PartBox.propTypes = {
    box: PropTypes.object
}

function getBoxStatus(box) {
    if (box.quantity <= 1)
        return 'danger';
    else if (box.quantity <= box.warning)
        return 'warning';
    else  
        return 'ok';
    
}