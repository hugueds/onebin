import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

export default class EditPartDialog extends Component {


    handleChange = (e) => {

    }

    render() {
        const { open, handleClose, handleSave } = this.props;
        return (
            <Dialog
                open={open}
                maxWidth="xs"
            >
                <DialogTitle>EDITAR</DialogTitle>
                <DialogContent dividers >                  
                {/* <DialogContentText style={{margin: '5% 0 15% 0'}}>
                    Ajuste a quantidade de Peças dentro da caixa
                </DialogContentText> */}
                    <Slider                    
                        style={{margin: '27.5% 0 0% 0'}}
                        aria-label="Ajustar"
                        defaultValue={30} // box quantity                        
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="on"
                        step={1}                        
                        min={1}
                        max={20} // box maxquantity
                        onChangeCommitted={this.handleChange}
                    />                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit" >FECHAR</Button>
                    <Button onClick={handleSave} color="primary" >SALVAR</Button>
                </DialogActions>
            </Dialog>
        )
    }
}
