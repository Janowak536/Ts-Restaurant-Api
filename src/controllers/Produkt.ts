import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Produkt from '../models/Produkt';

const createProdukt = (req: Request, res: Response, next: NextFunction) => {
    const { nazwa,cena,jednostka,ilosc } = req.body;

    const produkt = new Produkt({
        _id: new mongoose.Types.ObjectId(),
        nazwa,cena,jednostka,ilosc
    });
    return produkt
        .save()
        .then((produkt) => res.status(201).json({ produkt }))
        .catch((error) => res.status(500).json({ error }));
};

const readProdukt = (req: Request, res: Response, next: NextFunction) => {
    const produktId = req.params.produktId;

    return Produkt.findById(produktId)
        .then((produkt) => (produkt ? res.status(200).json({ produkt }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Produkt.find()
        .then((produkt) => res.status(200).json({ produkt }))
        .catch((error) => res.status(500).json({ error }));
};
const updateProdukt = (req: Request, res: Response, next: NextFunction) => {
    const produktId = req.params.produktId;

    return Produkt.findById(produktId)
        .then((produkt) => {
            if (produkt) {
                produkt.set(req.body);

                return produkt
                    .save()
                    .then((produkt) => res.status(201).json({ produkt }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteProdukt = (req: Request, res: Response, next: NextFunction) => {
    const produktId = req.params.produktId;

    return Produkt.findByIdAndDelete(produktId)
        .then((produkt) => (produkt ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProdukt, readProdukt, readAll, updateProdukt, deleteProdukt };
