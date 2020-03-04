// TODO: MUDAR O SERVIÇO PARA RETORNAR O NUMERO DAS INSTANCIAS ASSOCIADAS
// TODO: CRIAR A TELA DE INTERFACE PARA A EDIÇÃO DOS GRUPOS NAS INSTÂNCIAS

import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
// import GroupService from '../../api/group';
import OneBinService from '../../api/onebin';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
});

export default class ConfigGroup extends Component {

    api = new OneBinService('group', 'http://10.8.66.81/kanban');   

    state = {
        groups: []
    }

    componentDidMount() {
        // const { groups } = this.state;
        this.api.getAll().then((groups) => {
            groups = [...groups, ...groups, ...groups, ...groups, ...groups, ...groups]
            this.setState({ groups })
        });
    }

    componentWillUnmount() {

    }


    render() {

        const { groups } = this.state;        
        console.log(groups)

        return (

            <div>
                {/* <h1> { groups.map(g => g.name) } </h1> */}
                {
                    groups.map(g=> {
                        return (<h1> {g.instances} </h1>)
                    })
                }
            </div>
            // <StylesProvider generateClassName={generateClassName}>
            //     <MaterialTable
            //         title="Grupos"
            //         columns={[
            //             { title: "Numero", field: "number" },
            //             { title: "Nome", field: "name" },
            //             { title: "Instances", field: "instances"}
            //         ]}
            //         data={ groups }
            //         editable={{
            //             onRowAdd: newData =>
            //                 new Promise((resolve, reject) => {
            //                     setTimeout(() => {
            //                         this.api.create(newData).then((res) => {
            //                             const groups = this.state.groups;
            //                             groups.push(newData);
            //                             this.setState({ groups }, () => resolve());
            //                         });
            //                         resolve()
            //                     }, 1000)
            //                 }),
            //             onRowUpdate: (newData, oldData) =>
            //                 new Promise((resolve, reject) => {
            //                     setTimeout(() => {
            //                         this.api.update(newData).then((r) => {
            //                             const groups = this.state.groups;
            //                             const index = groups.indexOf(oldData);
            //                             groups[index] = newData;
            //                             this.setState({ groups }, () => resolve());
            //                         });
            //                         resolve()
            //                     }, 1000)
            //                 }),
            //             onRowDelete: oldData =>
            //                 new Promise((resolve, reject) => {
            //                     setTimeout(() => {
            //                         this.api.delete().then((data) => {
            //                             let { groups } = this.state;
            //                             const index = groups.indexOf(oldData);
            //                             groups.splice(index, 1);
            //                             this.setState({ groups }, () => resolve());
            //                         });
            //                         resolve()
            //                     }, 1000)
            //                 }),
            //         }}
            //     />
            // </StylesProvider>



        )
    }
}
