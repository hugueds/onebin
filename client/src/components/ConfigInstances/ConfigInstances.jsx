import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import OneBinService from '../../api/onebin';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
});

// TODO: Mandar recarregar todos os tablets que contem as instâncias atualizadas

export default class ConfigInstances extends Component {


    api = new OneBinService('instance');
    sub = null;

    state = {
        instances: []
    }

    componentDidMount() {
        this.api.getAll().then((instances) => this.setState({ instances }));
    }

    componentWillUnmount() {

    }


    render() {

        const { instances } = this.state;

        return (

            <StylesProvider generateClassName={generateClassName}>
                <MaterialTable
                    title=""
                    columns={[
                        { title: 'Index', field: 'number', type: 'numeric' },
                        { title: 'Nome', field: 'name' },
                        { title: 'Descrição', field: 'description' }
                    ]}
                    data={instances}
                    onClick={(a, b) => console.log(a, b)}
                    detailPanel={inst => {
                        let { boxes } = inst;
                        return (
                            <MaterialTable
                                title="Caixas"
                                columns={[
                                    { title: 'Index', field: 'boxNumber', type: 'numeric' },
                                    { title: 'Peça', field: 'partNumber', type: 'numeric' },
                                    { title: 'Máxima', field: 'maxQuantity', type: 'numeric' },
                                    { title: 'Aviso', field: 'warning', type: 'numeric' },
                                    { title: 'Mínima', field: 'danger', type: 'numeric' },
                                    { title: 'Posição', field: 'order', type: 'numeric' }

                                ]}
                                data={boxes}
                                editable={{
                                    onRowAdd: newData =>
                                        new Promise((resolve, reject) => {
                                            const instances = [...this.state.instances];
                                            const index = instances.indexOf(inst);
                                            newData.quantity = newData.maxQuantity;
                                            inst.boxes.push(newData);
                                            setTimeout(() => {
                                                this.api.update(inst).then((res) => {
                                                    instances[index].boxes.push(newData);
                                                    this.setState({ instances }, () => resolve());
                                                });
                                                resolve()
                                            }, 1000)
                                        }),
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            const instances = [...this.state.instances];
                                            const index = instances.indexOf(inst);
                                            const indexBox = instances[index].boxes.indexOf(oldData)
                                            inst.boxes[indexBox] = newData;
                                            setTimeout(() => {
                                                this.api.update(inst).then((r) => {
                                                    instances[index].boxes[indexBox] = newData;
                                                    this.setState({ instances }, () => resolve());
                                                });
                                                resolve()
                                            }, 1000)
                                        }),
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            const instances = [...this.state.instances];
                                            const index = instances.indexOf(inst);
                                            const indexBox = instances[index].boxes.indexOf(oldData);
                                            inst.boxes.splice(indexBox, 1);
                                            setTimeout(() => {
                                                this.api.update(inst).then((data) => {
                                                    instances[index].boxes.splice(indexBox, 1);
                                                    this.setState({ instances }, () => resolve());
                                                });
                                                resolve()
                                            }, 1000)
                                        }),
                                }}
                            />
                        )
                    }}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.create(newData).then((res) => {
                                        const instances = this.state.instances;
                                        instances.push(newData);
                                        this.setState({ instances }, () => resolve());
                                    });
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.update(newData).then((r) => {
                                        const instances = this.state.instances;
                                        const index = instances.indexOf(oldData);
                                        instances[index] = newData;
                                        this.setState({ instances }, () => resolve());
                                    });
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.delete(oldData).then((data) => {
                                        let { instances } = this.state;
                                        const index = instances.indexOf(oldData);
                                        instances.splice(index, 1);
                                        this.setState({ instances }, () => resolve());
                                    });
                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </StylesProvider>



        )
    }
}
