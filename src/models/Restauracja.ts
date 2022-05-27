import mongoose,{Document,Schema} from 'mongoose';

export interface IRestauracja{
    nazwa:string;
    adres:string;
    telefon:string;
    nip:string;
    email:string;
    www:string;
}
export interface IRestauracjaModel extends IRestauracja,Document{}

const RestauracjaSchema:Schema = new Schema(
    {
        nazwa:{type:String,required:true},
        adres:{type:String,required:true},
        telefon:{type:String,required:true},
        nip:{type:String,required:true},
        email:{type:String,required:true},
        www:{type:String,required:false}
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IRestauracjaModel>('Restauracja',RestauracjaSchema);