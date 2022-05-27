import Joi, { ObjectSchema, string} from "joi";
import { NextFunction,Response,Request } from "express";
import Logging from '../library/Logging';
import {IPracownik} from '../models/Pracownik';
import { IDanie } from "../models/Danie";
import { IProdukt } from "../models/Produkt";
import { IRestauracja } from "../models/Restauracja";
import { IRezerwacja } from "../models/Rezerwacja";
import { IStolik } from "../models/Stolik";
import { IZamowienie } from "../models/Zamowienie";

export const ValidateSchema = (schema:ObjectSchema)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await schema.validateAsync(req.body);
            next();
        }catch(error){
            Logging.error(error);
            return res.status(422).json({error});
        }
    };
};

export const Schemas={
    rezerwacja:{
        create:Joi.object<IRezerwacja>({
            stolik:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            start:Joi.string().regex(/^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/),
            koniec:Joi.string().regex(/^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/),
            klient:Joi.string().required()
        }),
        update:Joi.object<IRezerwacja>({
            stolik:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            start:Joi.string().regex(/^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/),
            koniec:Joi.string().regex(/^(\d{4})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2})$/),
            klient:Joi.string().required()
        })
    },
    pracownik:{
        create:Joi.object<IPracownik>({
            imie:Joi.string().required(),
            nazwisko:Joi.string().required(),
            stanowisko:Joi.string().required()
        }),
        update:Joi.object<IPracownik>({
            imie:Joi.string().required(),
            nazwisko:Joi.string().required(),
            stanowisko:Joi.string().required()
        })
    },
    restauracja:{
        create:Joi.object<IRestauracja>({
            nazwa:Joi.string().required(),
            adres:Joi.string().required(),
            telefon:Joi.string().regex(/^[0-9]{9}$/),
            nip:Joi.string().regex(/^[0-9]{10}$/),
            email:Joi.string().regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/),
            www:Joi.string().regex(/([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        }),
        update:Joi.object<IRestauracja>({
            nazwa:Joi.string().required(),
            adres:Joi.string().required(),
            telefon:Joi.string().regex(/^[0-9]{9}$/),
            nip:Joi.string().regex(/^[0-9]{10}$/),
            email:Joi.string().regex(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/),
            www:Joi.string().regex(/([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
        })
    },
    danie:{
        create:Joi.object<IDanie>({
            nazwa:Joi.string().required(),
            cena:Joi.number().required(),
            kategoria:Joi.string()
        }),
        update:Joi.object<IDanie>({
            nazwa:Joi.string().required(),
            cena:Joi.number().required(),
            kategoria:Joi.string()
        })
    },
    produkt:{
        create:Joi.object<IProdukt>({
            nazwa:Joi.string().required(),
            cena:Joi.number().required(),
            ilosc:Joi.number().required(),
            jednostka:Joi.string()
        }),
        update:Joi.object<IProdukt>({
            nazwa:Joi.string().required(),
            cena:Joi.number().required(),
            ilosc:Joi.number().required(),
            jednostka:Joi.string()
        })
    },
    
    
    stolik:{
        create:Joi.object<IStolik>({
            nazwa:Joi.number().required(),
            iloscOsob:Joi.number().required(),
            status:Joi.string()
        }),
        update:Joi.object<IStolik>({
            nazwa:Joi.string().required(),
            iloscOsob:Joi.number().required(),
            status:Joi.string()
        })
    },
    zamowienie:{
        create:Joi.object<IZamowienie>({
            pracownik:Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            dania:Joi.required(),
            status:Joi.string().required(),
            stolik:Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            kwota:Joi.number().required(),
        }),
        update:Joi.object<IZamowienie>({
            pracownik:Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            dania:Joi.required(),
            status:Joi.string().required(),
            stolik:Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            kwota:Joi.number().required(),
        }),
    }

    
}