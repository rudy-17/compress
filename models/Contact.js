var mongoose=require('mongoose');
const config=process.env.NODE_ENV;


const ContactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
        type: String,
        required: false
      },
  });
 

module.exports=mongoose.model('Contact',ContactSchema);