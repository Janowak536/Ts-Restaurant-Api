import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Stolik from '../models/Stolik';

const createStolik = (req: Request, res: Response, next: NextFunction) => {
    const { nazwa,iloscOsob,status } = req.body;

    const stolik = new Stolik({
        _id: new mongoose.Types.ObjectId(),
        nazwa,iloscOsob,status
    });
    return stolik
        .save()
        .then((stolik) => res.status(201).json({ stolik }))
        .catch((error) => res.status(500).json({ error }));
};

const readStolik = (req: Request, res: Response, next: NextFunction) => {
    const stolikId = req.params.stolikId;

    return Stolik.findById(stolikId)
        .then((stolik) => (stolik ? res.status(200).json({ stolik }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readWolneStoliki = (req: Request, res: Response, next: NextFunction) => {
    return Stolik.find({status:"Wolny"})
        .then((stoliki) => res.status(200).json({ stoliki }))
        .catch((error) => res.status(500).json({ error }));
};

const readWolneStolikiLiczbaOsob= (req: Request, res: Response, next: NextFunction) => {
    const iloscOsob = req.params.iloscOsob;
    return Stolik.find({status:"Wolny",iloscOsob:iloscOsob})
        .then((stoliki) => res.status(200).json({ stoliki }))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Stolik.find()
        .then((stoliki) => res.status(200).json({ stoliki }))
        .catch((error) => res.status(500).json({ error }));
};
const updateStolik = (req: Request, res: Response, next: NextFunction) => {
    const stolikId = req.params.stolikId;

    return Stolik.findById(stolikId)
        .then((stolik) => {
            if (stolik) {
                stolik.set(req.body);

                return stolik
                    .save()
                    .then((stolik) => res.status(201).json({ stolik }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteStolik = (req: Request, res: Response, next: NextFunction) => {
    const stolikId = req.params.stolikId;

    return Stolik.findByIdAndDelete(stolikId)
        .then((stolik) => (stolik ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createStolik, readStolik,readWolneStoliki,readWolneStolikiLiczbaOsob, readAll, updateStolik, deleteStolik };
