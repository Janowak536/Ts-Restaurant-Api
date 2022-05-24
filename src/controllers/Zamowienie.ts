import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Zamowienie from '../models/Zamowienie';

const createZamowienie = (req: Request, res: Response, next: NextFunction) => {
    const { pracownik,dania,status,stolik,kwota } = req.body;

    const zamowienie = new Zamowienie({
        _id: new mongoose.Types.ObjectId(),
        pracownik,dania,status,stolik,kwota
    });
    return zamowienie
        .save()
        .then((zamowienie) => res.status(201).json({ zamowienie }))
        .catch((error) => res.status(500).json({ error }));
};

const readZamowienie = (req: Request, res: Response, next: NextFunction) => {
    const zamowienieId = req.params.zamowienieId;

    return Zamowienie.findById(zamowienieId).populate(['pracownik','stolik'])
        .then((zamowienie) => (zamowienie ? res.status(200).json({ zamowienie }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Zamowienie.find().populate(['pracownik','stolik'])
        .then((zamowienie) => res.status(200).json({ zamowienie }))
        .catch((error) => res.status(500).json({ error }));
};
const updateZamowienie = (req: Request, res: Response, next: NextFunction) => {
    const zamowienieId = req.params.zamowienieId;

    return Zamowienie.findById(zamowienieId)
        .then((zamowienie) => {
            if (zamowienie) {
                zamowienie.set(req.body);

                return zamowienie
                    .save()
                    .then((zamowienie) => res.status(201).json({ zamowienie }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteZamowienie = (req: Request, res: Response, next: NextFunction) => {
    const zamowienieId = req.params.zamowienieId;

    return Zamowienie.findByIdAndDelete(zamowienieId)
        .then((zamowienie) => (zamowienie ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createZamowienie, readZamowienie, readAll, updateZamowienie, deleteZamowienie };
