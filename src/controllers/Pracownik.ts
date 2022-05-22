import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Pracownik from '../models/Pracownik';

const createPracownik = (req: Request, res: Response, next: NextFunction) => {
    const { imie,nazwisko,stanowisko } = req.body;

    const pracownik = new Pracownik({
        _id: new mongoose.Types.ObjectId(),
        imie,nazwisko,stanowisko
    });
    return pracownik
        .save()
        .then((pracownik) => res.status(201).json({ pracownik }))
        .catch((error) => res.status(500).json({ error }));
};

const readPracownik = (req: Request, res: Response, next: NextFunction) => {
    const pracownikId = req.params.pracownikId;

    return Pracownik.findById(pracownikId)
        .then((pracownik) => (pracownik ? res.status(200).json({ pracownik }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Pracownik.find()
        .then((pracownicy) => res.status(200).json({ pracownicy }))
        .catch((error) => res.status(500).json({ error }));
};
const updatePracownik = (req: Request, res: Response, next: NextFunction) => {
    const pracownikId = req.params.pracownikId;

    return Pracownik.findById(pracownikId)
        .then((pracownik) => {
            if (pracownik) {
                pracownik.set(req.body);

                return pracownik
                    .save()
                    .then((pracownik) => res.status(201).json({ pracownik }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deletePracownik = (req: Request, res: Response, next: NextFunction) => {
    const pracownikId = req.params.pracownikId;

    return Pracownik.findByIdAndDelete(pracownikId)
        .then((pracownik) => (pracownik ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createPracownik, readPracownik, readAll, updatePracownik, deletePracownik };
