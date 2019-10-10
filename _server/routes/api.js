const router = require('express').Router();

const tabletController = require('../controllers/tabletController');
const instanceController = require('../controllers/instanceController');
const groupController = require('../controllers/groupController');
const plcController = require('../controllers/plcController');

router.get('/', (req, res, next) => res.status(200).send('Welcome to API Page'));

// Tablet
router.get('/tablets?/', tabletController.get);
router.get('/tablet/:id', tabletController.getById);
router.post('/tablet', tabletController.post);
router.put('/tablet', tabletController.put);
router.delete('/tablet/:id', tabletController.delete);

// Instances
router.get('/instances?/', instanceController.get);
router.get('/instance/:id/reloadAll', instanceController.reloadAll);
router.get('/instance/:id', instanceController.getById);
router.post('/instance', instanceController.post);
router.put('/instance', instanceController.put);
router.put('/instance/:id/updateBox', instanceController.updateBox);
router.put('/instance/:id/reload', instanceController.reload);
router.put('/instance/:id/decrease', instanceController.decrease);
router.delete('/instance/:id', instanceController.delete);

// Groups
router.get('/groups?/', groupController.get);
router.get('/group/:id', groupController.getById);
router.post('/group', groupController.post);
router.put('/group', groupController.put);
router.delete('/group', groupController.delete);

// Commands
router.get('/command/reload-screen/all');
router.get('/command/reload-screen/:ip');
router.get('/command/activate-plc/:ip');
router.get('/command/deactivate-plc/:ip');
router.get('/command/reload-plc/:ip');


// Salva as informações de cada ação tomada pelo colaborador
router.get('/log'); // Passar parâmetro de quantidade de logs
router.post('/log', (req, res, next) => {
    res.send('Ok');
});

module.exports = router;