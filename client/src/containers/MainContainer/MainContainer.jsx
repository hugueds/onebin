import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import OBInstance from '../../components/OBInstance';
import EditPartDialog from '../../components/EditPartDialog';
import InstanceService from '../../api/instance';
import SocketService from '../../api/socket';
// import instances from '../../data/instances'; // DEBUG ONLY
export default class MainContainer extends Component {

    api = new InstanceService();

    state = {
        dialogOpen: false,
        partBox: '',
        popid: '',
        instanceId: 0,
        instances: []
    }

    componentDidMount() {
        setTimeout(() => this.getInstances(), 100);

        SocketService.socket.on('connect', (data) => {
            this.getInstances();
        });

        SocketService.socket.on('update', (data) => {
            this.getInstances();
        });
        SocketService.socket.on('new popid', (data) => {
            this.setState({ popid: data.popid })
            setTimeout(() => this.getInstances(), 100);
        });
    }

    getInstances() {
        // Grupo é adquirido conforme o numero do tablet
        // Fazer GET do serviço baseado no grupo -- Passar o grupo receber as instancias
        const group = 0; // Pegar o Grupo de acordo com o fornecido pelo componente Pai
        this.api.getByGroup(group).then(d => this.setState({ instances: d.instances }));
    }

    handleReload = (instanceId, box) => {
        this.api.reloadBox(instanceId, box);
    }

    handleSave = (instanceId, partBox) => {
        // Envia para a API sinal para recarregar quantidade
        // Guardar metodo offline
        // Faz GET do Grupo de novo
        // const instances = [...this.state.instances];        
        // const instanceIndex = instances.findIndex((i) => i._id === instanceId);
        // const boxIndex = instances[instanceIndex].boxes.findIndex(s => s.boxNumber === partBox.boxNumber);
        // instances[instanceIndex].boxes[boxIndex] = partBox;
        // this.setState({ instances });
        this.api.updateBox(instanceId, partBox);
        this.setState({ dialogOpen: false });
    }

    handleClose = () => {
        this.setState({ dialogOpen: false, partBox: {} });
    }

    handleOpenDialog = (instanceId, partBox) => {
        this.setState({ instanceId });
        this.setState({ partBox });
        this.setState({ dialogOpen: true });
    }

    render() {

        const { dialogOpen, partBox, instances, instanceId } = this.state;

        const OBInstances = () => {
            if (instances && instances.length > 0) {
                return instances.map((i, k) =>
                    <OBInstance key={k} instance={i} openDialog={this.handleOpenDialog} onReload={this.handleReload} />)
            } else {
                return <div style={{ fontSize: '4vh', marginTop: '5%' }}> TABLET NÃO POSSUI INSTANCIAS CADASTRADAS </div>
            }
        }

        return (
            <Container maxWidth="lg">
                <Box style={{ marginTop: '1%' }}>ULTIMO POPID LIDO: {this.state.popid}</Box>
                <EditPartDialog
                    open={dialogOpen}
                    instanceId={instanceId}
                    partBox={partBox}
                    handleClose={this.handleClose}
                    handleSave={this.handleSave} />
                <OBInstances />
            </Container>
        )
    }
}
