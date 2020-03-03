const router = require('express').Router();
const config = require('../config'); // Replace config to Database
const PartNumberApi = require('../api/PartNumber');

const defaultInstances = require('../data/instances');
const Instance = require('../models/Instance');

router.get('/', (req, res, next) => res.status(200).send('Welcome to API Page'));

router.get('/t0', (req, res, next) => {
    const api = new PartNumberApi();
    const r = api.getByPopid();
    r.then(a => res.send(a))
});

// Cria uma instância padrão
router.get('/createinstance', async (req, res, next) => {
    const i = new Instance(defaultInstances[0]);
    await i.save();
    console.log('Default Instance Saved');
    next();
});

// Adicionando uma instância a um grupo por padrao
router.get('/addinstancetogroup', async (req, res, next) => {
    const i = await I.findOne({ number: 0 });
    const g = new G();
    g.name = 'Grupo 0';
    g.number = 0;
    g.instances.push(i);
    await g.save();
    console.log('Default Group Saved');
    next();
});


module.exports = router;