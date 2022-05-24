import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Rezerwacja from '../models/Rezerwacja';

const createRezerwacja = (req: Request, res: Response, next: NextFunction) => {
    const { stolik,start,koniec,klient } = req.body;
    
    const rezerwacja = new Rezerwacja({
        _id: new mongoose.Types.ObjectId(),
        stolik,
        start,
        koniec,
        klient
    });
    return rezerwacja
        .save()
        .then((rezerwacja) => res.status(201).json({ rezerwacja }))
        .catch((error) => res.status(500).json({ error }));
};

const readRezerwacja = (req: Request, res: Response, next: NextFunction) => {
    const rezerwacjaId = req.params.rezerwacjaId;

    return Rezerwacja.findById(rezerwacjaId).populate('stolik')
        .then((rezerwacja) => (rezerwacja ? res.status(200).json({ rezerwacja }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Rezerwacja.find().populate('stolik')
        .then((rezerwacja) => res.status(200).json({ rezerwacja }))
        .catch((error) => res.status(500).json({ error }));
};
const updateRezerwacja = (req: Request, res: Response, next: NextFunction) => {
    const rezerwacjaId = req.params.rezerwacjaId;

    return Rezerwacja.findById(rezerwacjaId)
        .then((rezerwacja) => {
            if (rezerwacja) {
                rezerwacja.set(req.body);

                return rezerwacja
                    .save()
                    .then((rezerwacja) => res.status(201).json({ rezerwacja }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteRezerwacja = (req: Request, res: Response, next: NextFunction) => {
    const rezerwacjaId = req.params.rezerwacjaId;

    return Rezerwacja.findByIdAndDelete(rezerwacjaId)
        .then((rezerwacja) => (rezerwacja ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createRezerwacja, readRezerwacja, readAll, updateRezerwacja, deleteRezerwacja };
