import React, { Component } from 'react';
import Box from '@material-ui/core/Box';

// Debug tablet tests
const tablets = [
    {
        name: 'TABLET01',
        ip: '10.8.75.221',
        group: 1
    },
    {
        name: 'TABLET02',
        ip: '10.8.75.222',
        group: 2
    },
    {
        name: 'TABLET01',
        ip: '10.8.75.223',
        group: 3
    }
]

export default class Tablet extends Component {

    // Fazer Get dos tablets cadastrados
    // Cadastrar novos tablets
    // Remover Tablets
    // Atualizar tablets



    render() {
        return (
            <Box>
                {
                    tablets.map((t,i) => console.log(t))
                }
            </Box>
        )
    }
}
