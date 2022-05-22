import mongoose,{Document,Schema} from 'mongoose';

export interface IPracownik{
    imie:string;
    nazwisko:string;
    stanowisko:string;
}

export interface IPracownikModel extends IPracownik, Document{}

const PracownikSchema: Schema = new Schema({
    imie:{type:String,required:true},
    nazwisko:{type:String,required:true},
    stanowisko:{type:String,required:true}
},
{
    timestamps:true
});

export default mongoose.model<IPracownikModel>('Pracownik',PracownikSchema);