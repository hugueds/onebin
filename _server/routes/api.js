const router = require('express').Router();
const config = require('../config'); // Replace config to Database
const PartNumberApi = require('../api/PartNumber');


router.get('/', (req, res, next) => res.status(200).send('Welcome to API Page'));

router.get('/test', (req, res, next) => {
    const api = new PartNumberApi();
    const r = api.getByPopid();
    r.then(a => res.send(a))
});

// Lista os tablets disponíveis
router.get('/tablets', (req, res, next) => {
    res.send(config['instances']);
});

// Salva as informações de cada ação tomada pelo colaborador
router.post('/log', (req, res, next) => {
    res.send('Ok');
});

// Lista as instancias disponiveis
router.get('/instances', (req, res, next) => {
    res.send('ok');
});

// Lista as peças disponiveis em uma instancia
router.get('/instances/:instance', (req, res, next) => {
    const {
        instance: i
    } = req.params;
    const instances = config[instances]
    res.send(i);
});

// Reinicia o buffer
router.get('/reset/instance/:instance/partnumber/:partNumber', (req, res, next) => {
    const {
        instance,
        partNumber
    } = req.params;
    res.send(instance + partNumber);
});

// Adiciona uma peça ao Buffer
router.get('/add/instance/:instance/partnumber/:partNumber', (req, res, next) => {
    const {
        instance,
        partNumber
    } = req.params;
    res.send(instance + partNumber);
});

// Remove uma peça do Buffer
router.get('/dec/instance/:instance/partnumber/:partNumber', (req, res, next) => {
    const {
        instance,
        partNumber
    } = req.params;
    res.send(instance + partNumber);
});


module.exports = router;