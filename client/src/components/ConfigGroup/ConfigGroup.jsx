import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import GroupService from '../../api/group';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
});

export default class Tablet extends Component {

    api = new GroupService();
    sub = null;

    state = {
        tablets: []
    }

    componentDidMount() {
        this.api.getAll().then((tablets) => this.setState({ tablets }));
    }

    componentWillUnmount() {

    }


    render() {

        const { tablets } = this.state;

        return (

            <StylesProvider generateClassName={generateClassName}>
                <MaterialTable
                    title="Grupos"
                    columns={[
                        { title: "Nome", field: "name" },
                        { title: "IP", field: "ip" },
                        { title: "Grupo", field: "group", type: "numeric" }
                    ]}
                    data={tablets}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.create(newData).then((res) => {
                                        const tablets = this.state.tablets;
                                        tablets.push(newData);
                                        this.setState({ tablets }, () => resolve());
                                    });
                                    resolve()
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.update(newData).then((r) => {
                                        const tablets = this.state.tablets;
                                        const index = tablets.indexOf(oldData);
                                        tablets[index] = newData;
                                        this.setState({ tablets }, () => resolve());
                                    });
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.api.delete().then((data) => {
                                        let { tablets } = this.state;
                                        const index = tablets.indexOf(oldData);
                                        tablets.splice(index, 1);
                                        this.setState({ tablets }, () => resolve());
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
