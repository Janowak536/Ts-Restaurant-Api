import mongoose,{Document,Schema} from 'mongoose';

export interface IDanie{
    nazwa:string;
    cena:string;
    kategoria:string;
}
export interface IDanieModel extends IDanie,Document{}

const DanieSchema:Schema = new Schema(
    {
        nazwa:{ type: String, required: true },
        cena:{type:Number, required:true},
        kategoria:{type:String,enum:["Przystawka","Zupa","Danie główne","Deser"],default:"Danie główne"}
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IDanieModel>('danie',DanieSchema);