import mongoose,{Document,Schema} from 'mongoose';

export interface IRezerwacja{
    stolik:string,
    start:string,
    koniec:string,
    klient:string
}
export interface IRezerwacjaModel extends IRezerwacja,Document{}

const RezerwacjaSchema:Schema = new Schema(
    {
        stolik:{type:Schema.Types.ObjectId,required:true,ref:'Stolik'},
        start:{ type: String, required: true },
        koniec:{ type: String, required: true },
        klient:{ type: String, required: true }
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IRezerwacjaModel>('Rezerwacja',RezerwacjaSchema);