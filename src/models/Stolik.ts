import mongoose,{Document,Schema} from 'mongoose';

export interface IStolik{
    nazwa:number;
    iloscOsob:number;
    status:boolean;
}
export interface IStolikModel extends IStolik,Document{}

const StolikSchema:Schema = new Schema(
    {
        nazwa:{type:Number,required:true},
        iloscOsob:{type:Number,required:false},
        status:{type:String,enum:["Wolny","Zajęty"],default:"Wolny"}
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IStolikModel>('Stolik',StolikSchema);