const mongoose = require("mongoose");
const NotesSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true});

module.exports = mongoose.model("Notes",NotesSchema);
