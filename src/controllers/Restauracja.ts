import { NextFunction,Request,Response } from "express";
import mongoose from "mongoose";
import Restauracja from "../models/Restauracja";

const createRestauracja = (req:Request,res:Response,next:NextFunction)=>{
    const{nazwa,adres,telefon,nip,email,www} = req.body;

    const restauracja = new Restauracja({
        _id: new mongoose.Types.ObjectId(),
        nazwa,
        adres,
        telefon,
        nip,
        email,
        www
    });

    return restauracja
        .save()
        .then((restauracja) => res.status(201).json({ restauracja }))
        .catch((error) => res.status(500).json({ error }));
};
const readRestauracja = (req:Request,res:Response,next:NextFunction)=>{
    const restauracjaId=req.params.restauracjaId;

    return Restauracja.findById(restauracjaId)
        .populate('restauracja')
        .then((restauracja) => (restauracja ? res.status(200).json({ restauracja }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllRestauracja = (req:Request,res:Response,next:NextFunction)=>{
    return Restauracja.find()
        .then((restauracje) => res.status(200).json({ restauracje }))
        .catch((error) => res.status(500).json({ error }));
};
const updateRestauracja = (req:Request,res:Response,next:NextFunction)=>{
     const restauracjaId = req.params.restauracjaId;

     return Restauracja.findById(restauracjaId)
        .then((restauracja) => {
            if (restauracja) {
                restauracja.set(req.body);

                return restauracja
                    .save()
                    .then((restauracja) => res.status(201).json({ restauracja }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteRestauracja = (req:Request,res:Response,next:NextFunction)=>{
    const restauracjaId = req.params.restauracjaId;

    return Restauracja.findByIdAndDelete(restauracjaId)
        .then((restauracja) => (restauracja ? res.status(201).json({ restauracja, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {createRestauracja,readRestauracja,readAllRestauracja,updateRestauracja,deleteRestauracja}