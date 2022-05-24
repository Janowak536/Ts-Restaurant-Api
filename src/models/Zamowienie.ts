import mongoose,{Document,Schema} from 'mongoose';

export interface IZamowienie{
    pracownik:string,
    dania:string,
    status:string,
    stolik:string,
    kwota:string
}
export interface IZamowienieModel extends IZamowienie,Document{}

const ZamowienieSchema:Schema = new Schema(
    {
        pracownik:{type:Schema.Types.ObjectId,required:true,ref:'Pracownik'},
        dania:[{type:Schema.Types.ObjectId,required:true,ref:'Danie'}],
        status:{type:String,enum:["Złożone","W realizacji","Zrealizowane","Rachunek"],default:"Wolny"},
        stolik:{type:Schema.Types.ObjectId,required:true,ref:'Stolik'},
        kwota:{ type: Number, required: true }
    },
    {
        versionKey:false
    }
);

export default mongoose.model<IZamowienieModel>('Zamowienie',ZamowienieSchema);