import mongoose,{Document,Schema} from 'mongoose';

export interface IProdukt{
    nazwa:string;
    cena:string;
    jednostka:string;
    ilosc:string;
}
export interface IProduktModel extends IProdukt,Document{}

const ProduktSchema:Schema = new Schema(
    {
        nazwa:{ type: String, required: true },
        cena:{type:Number, required:true},
        jednostka:{type:String,enum:["kg","g","szt"],default:"kg"},
        ilosc:{type:Number,required:true}
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IProduktModel>('produkt',ProduktSchema);