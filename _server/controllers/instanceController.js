const mongoose = require('mongoose');
const Instance = require('../models/Instance');
const socketServer = require('../socket/socketServer');
const Log = require('../models/Log');

exports.get = async (req, res) => {
    try {
        const data = await Instance.find();
        return res.send(data);
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
}

exports.getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Instance.findById(id);
        return res.send(data);
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
};

exports.getByGroup = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await Instance.findById(id);
        return res.send(data);
    } catch (error) {
        console.error(error);
        return res.send(error);
    }
};

exports.post = async (req, res, next) => {
    const instance = new Instance(req.body.instance);
    const log = new Log();
    try {
        const data = await Instance.collection.insertOne(instance);
        console.log('[Instance Created]', instance);
        log.message = 'Instance created' + JSON.stringify(instance);
        await log.save();
        return res.send(data);
    } catch (error) {
        log.error = true;
        await log.save();
        console.error(error);
        return res.send(error);
    }
};

exports.put = async (req, res, next) => {
    const { instance } = req.body;
    const log = new Log();
    if (mongoose.Types.ObjectId.isValid(instance._id)) {
        try {
            const id = instance._id;
            delete instance._id;
            const data = await Instance.findByIdAndUpdate({_id: id}, instance, { new: true, upsert: true, useFindAndModify: false });
            console.log('Instance %s Updated', instance._id);
            return res.send(data);
        } catch (error) {
            log.error = true;
            await log.save();
            console.error(error);
            return res.send(error);
        }
    } else {
        console.error('ID NOT FOUND');
        return res.send('ID NOT FOUND');
    }
};

exports.delete = async (req, res, next) => {
    const { id } = req.params;
    const log = new Log();
    try {
        const data = await Instance.remove({_id: id});
        console.log('[Instance Deleted] ID:%s', id);
        log.message = 'Instance Deleted' + id;
        return res.send(data);
    } catch (err) {
        log.error = true;
        log.message = err;
        await log.save();
        console.error(err);
        return res.send(err);
    }
};

exports.updateBox = async (req, res, next) => {

    const { id } = req.params;
    const { box } = req.body;
    const log = new Log();

    try {

        const o = await Instance.findById(id);
        const i = o.toObject();

        const selectedBox = i.boxes.map(b => {
            if (b.partNumber === box.partNumber && b.order === box.order) {
                if (b.currentOrder !== box.currentOrder) {
                    let d = i.boxes.find(c => c.partNumber === b.partNumber && c.order !== b.order);
                    if (d) {
                        d.currentOrder = !d.currentOrder;
                    }
                }
                b.quantity = box.quantity;
                b.currentOrder = box.currentOrder;
            }
            return b;
        });

        delete i._id;

        await Instance.findByIdAndUpdate(id, i, { new: true, upsert: true, useFindAndModify: false });
        socketServer.emit('update', { instance: i.number });
        console.log('[Box Quantity Updated] Instance:%s, Box %s', i.number, box.boxNumber);
        return res.send(i);

    } catch (e) {
        console.error(e);
        log.error = true;
        await log.save();
        return res.send(e);
    }

}

exports.reload = async (req, res, next) => {

    const { id } = req.params;
    const { box } = req.body;
    const log = new Log();
    try {
        const o = await Instance.findById(id);
        const i = o.toObject();
        const selectedBox = i.boxes.map(b => {
            if (b.partNumber === box.partNumber && b.order === box.order) {
                b.quantity = b.maxQuantity;
            }
        });
        delete i._id;
        await Instance.findByIdAndUpdate(id, i, { new: true, upsert: true, useFindAndModify: false });
        socketServer.emit('update', { instance: i });
        console.log('[Box Reloaded] Instance:%s, Box %s', i.number, box.boxNumber);
        return res.send(i);
    } catch (e) {
        console.error(e)
        log.error = true;
        log.message = e;
        await log.save();
        return res.send(e);
    }
}

exports.reloadAll = async (req, res, next) => {

    const { id } = req.params;
    const log = new Log();

    try {
        const i = await Instance.findById(id);
        i.boxes.map(b => b.quantity = b.maxQuantity);
        await Instance.findByIdAndUpdate(i._id, i, { new: true, upsert: true, useFindAndModify: false });
        socketServer.emit('update', { instance: i });
        console.log('[Boxes Reloaded]', i._id);
        return res.send(i);
    } catch (e) {
        log.error = true;
        await log.save();
        return res.send(e);
    }

}

exports.decrease = async (req, res) => {
    const { id } = req.params;
    const { box } = req.body;
    const log = new Log();
    try {
        const i = await Instance.findById(id);
        const selectedBox = i.boxes.map(b => {
            // Decrescer da segunda caixa quando primeira sofrer alteração?         
            if (b.partNumber === box.partNumber && b.order === box.order && b.quantity > 0) {
                b.quantity -= 1;
            }
            return b;
        });
        await Instance.findByIdAndUpdate(i._id, i, { new: true, upsert: true, useFindAndModify: false });
        socketServer.emit('update', { instance: i });
        console.log('[Box Decreased]', i._id);
        return res.send(i);
    } catch (e) {
        log.error = true;
        await log.save();
        return res.send(e);
    }
}