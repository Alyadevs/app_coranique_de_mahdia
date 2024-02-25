const mongoose = require('mongoose'); 
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim: true
    },
    
    email:{
        type:String,
        required:true,
        validate:[isEmail],
        lowercase:true,
        unique:true,
        trim: true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minlength:6
    },
    // picture:{
    //     type:String,
    //     required:true,
    //     default:" ./uploads/profil/user.png"

    // },
},
    {
        timestamps: true,
      }


);

userSchema.pre("save" , async function(next){
    const salt= await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    next();
});
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new Error('Incorrect password');
    }
    throw new Error('Incorrect email');
};


module.exports = mongoose.model('User', userSchema);