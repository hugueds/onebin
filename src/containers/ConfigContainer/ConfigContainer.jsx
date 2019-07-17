import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import SwipeableViews  from 'react-swipeable-views';
import Tablet from '../../components/Tablet';

const tabs = {
    'tablet': 0,
    'instance': 1,
    'groups': 2
}

export default class ConfigContainer extends Component {

    state = {
        activeTab: 0
    }

    handleChange = (a) => {
        console.log(a)
    }

    render() {
        
        return (
            <Container>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.activeTab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab value={0} label="Tablets" />
                        <Tab value={1} label="Grupos" />
                        <Tab value={2} label="Instâncias" />
                    </Tabs>
                </AppBar>
                {this.state.activeTab === 0 && <Tablet /> }
                {this.state.activeTab === 1 && <Tablet /> }
                {this.state.activeTab === 2 && <Tablet /> }

                {/* <SwipeableViews
                    // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    
                </SwipeableViews> */}
            </Container>
            // Escolher qual item cadastrar a partir de abas
        )
    }
}
