import MainContainer from '../containers/MainContainer';
import ConfigContainer from '../containers/ConfigContainer';
import HomeContainer from '../containers/HomeContainer';
import StatusContainer from '../containers/StatusContainer';
import TestsContainer from '../containers/TestsContainer';

const routes = [
    {
        path: '/',
        icon: '',
        component: MainContainer
    },
    {
        path: '/home',
        icon: '',
        component: HomeContainer
    },
    {
        path: '/config',
        icon: '',
        component: ConfigContainer
    },
    {
        path: '/status',
        icon: '',
        component: StatusContainer
    },
    {
        path: '/tests',
        icon: '',
        component: TestsContainer
    }

];

export default routes;