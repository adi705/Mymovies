import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({

    category: {
    type: String,
    },   
    rating: {
    type: String,
    },   
    isBookmarked: {
    type: Boolean,
    default: false,
    },  
    title: {
    type: String,
    }, 
  
    isTrending: { type: Boolean,},  

    year:{type: Number},
 
    thumbnail: {

    trending:{
        small:{type:String,},
        large:{type:String,},
    },
    regular:{
        small:{type:String,},
        medium:{type:String,},
        large:{type:String,},
    },
      
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    
  

  }, { timestamps: true } )
  
  export default mongoose.model('Movie', MovieSchema);
  
  
