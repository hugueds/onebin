import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/styles';


const SSlider = withStyles({
    root: {
        width: '100%',
        margin: '0% 0 0% 0',
        padding: '0 0 0% 0',
        height: 4
    },
    rail: {
        color: 'red'
    },
    active: {
        color: 'green'
    }
})(Slider);

export default class EditPartDialog extends Component {

    state = {
        partBox: ''
    }

    componentWillReceiveProps(a, b) {
        this.setState({ partBox: a['partBox'] })
    }

    handleChange = (event, value) => {
        const partBox = { ...this.state.partBox };
        partBox.quantity = value;
        this.setState({ partBox });
    }

    handleChangeOrder = (event, value) => {
        const partBox = { ...this.state.partBox };
        if (partBox.quantity === 0 && value) {
            return;
        }
        partBox.currentOrder = value;
        this.setState({ partBox });
    }

    render() {
        const { open, handleClose, handleSave, instanceId } = this.props;
        const { partBox } = this.state;

        return (

            <Dialog open={open} fullWidth >
                <DialogTitle>EDITAR PEÇA {partBox.partNumber} - CAIXA {partBox.order + 1} </DialogTitle>
                <DialogContent dividers >
                    <DialogContentText style={{ display: 'flex', flexWrap: 'wrap', margin: '0% 0 10% 0' }}>
                        <Typography style={{ display: 'flex', flex: '1 1 100%' }} variant="caption">Atual: {partBox.quantity} </Typography>
                        <Typography style={{ display: 'flex', flex: '1 1 auto' }} variant="caption">Alerta: {partBox.warning} </Typography>
                        <Typography style={{ display: 'flex', flex: '1 1 auto' }} variant="caption">Crítico: {partBox.danger} </Typography>
                        <Typography style={{ display: 'flex', flex: '1 1 auto' }} variant="caption">ATIVA: {partBox.currentOrder ? 'SIM' : 'NÃO'} </Typography>
                    </DialogContentText>
                    <SSlider
                        aria-label="Ajustar"
                        component="div"
                        defaultValue={partBox.quantity} // box quantity                        
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        marks
                        min={0}
                        max={partBox.maxQuantity} // box maxquantity
                        onChangeCommitted={this.handleChange}
                    />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox checked={partBox.currentOrder} onChange={this.handleChangeOrder} value={partBox.currentOrder} />
                            }
                            label="ORDEM HABILITADA"
                        />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" >FECHAR</Button>
                    <Button onClick={() => handleSave(instanceId, partBox)} color="primary" >SALVAR</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
