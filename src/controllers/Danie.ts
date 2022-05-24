import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Danie from '../models/Danie';

const createDanie = (req: Request, res: Response, next: NextFunction) => {
    const { nazwa,cena,kategoria } = req.body;

    const danie = new Danie({
        _id: new mongoose.Types.ObjectId(),
        nazwa,cena,kategoria
    });
    return danie
        .save()
        .then((danie) => res.status(201).json({ danie }))
        .catch((error) => res.status(500).json({ error }));
};

const readDanie = (req: Request, res: Response, next: NextFunction) => {
    const danieId = req.params.danieId;

    return Danie.findById(danieId)
        .then((danie) => (danie ? res.status(200).json({ danie }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Danie.find()
        .then((danie) => res.status(200).json({ danie }))
        .catch((error) => res.status(500).json({ error }));
};
const updateDanie = (req: Request, res: Response, next: NextFunction) => {
    const danieId = req.params.danieId;

    return Danie.findById(danieId)
        .then((danie) => {
            if (danie) {
                danie.set(req.body);

                return danie
                    .save()
                    .then((danie) => res.status(201).json({ danie }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteDanie = (req: Request, res: Response, next: NextFunction) => {
    const danieId = req.params.danieId;

    return Danie.findByIdAndDelete(danieId)
        .then((danie) => (danie ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createDanie, readDanie, readAll, updateDanie, deleteDanie };
