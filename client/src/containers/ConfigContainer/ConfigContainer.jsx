import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import ConfigTablet from '../../components/ConfigTablet';
import ConfigInstances from '../../components/ConfigInstances';
import ConfigGroup from '../../components/ConfigGroup';

export default class ConfigContainer extends Component {

    state = {
        activeTab: 0
    }

    handleChange = (event, value) => {
        this.setState({ activeTab: value })
    }

    handleChangeIndex = (index) => {
        this.setState({ activeTab: index })
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
                        <Tab value={1} label="Instâncias" />
                        {/* TO IMPLEMENT */}
                        <Tab value={2} label="Grupos" /> 
                    </Tabs>
                </AppBar>

                <SwipeableViews
                    
                    index={this.state.activeTab}
                    onChangeIndex={this.handleChangeIndex}
                >

                    <ConfigTablet />
                    <ConfigInstances />
                    {/* TO IMPLEMENT */}
                    <ConfigGroup />

                </SwipeableViews>
            </Container>            
        )
    }
}
