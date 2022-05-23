import mongoose,{Document,Schema} from 'mongoose';

export interface IRestauracja{
    nazwa:string;
    adres:string;
    telefon:number;
    nip:number;
    email:string;
    www:string;
}
export interface IRestauracjaModel extends IRestauracja,Document{}

const RestauracjaSchema:Schema = new Schema(
    {
        nazwa:{type:String,required:true},
        adres:{type:String,required:true},
        telefon:{type:Number,required:true},
        nip:{type:Number,required:true},
        email:{type:String,required:true},
        www:{type:String,required:false}
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IRestauracjaModel>('Restauracja',RestauracjaSchema);