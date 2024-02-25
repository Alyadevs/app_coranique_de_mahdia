const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
var eleveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
   email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
    },
    // picture: {
    //     type: String,
    //     required: true,
    //     default: " ./uploads/profil/user.png"

    // },
    date_naissance: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },

    nom_pere: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    lieu: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    Genre: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    Group: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    niveau_etude: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    etablissement: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
},
    {
        timestamps: true,
    }


);

eleveSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
eleveSchema.statics.login = async function (email, password) {
    const eleve = await this.findOne({ email });
    if (eleve) {
        const auth = await bcrypt.compare(password, eleve.password);
        if (auth) {
            return eleve;
        }
        throw new Error('Incorrect password');
    }
    throw new Error('Incorrect email');
};


module.exports = mongoose.model('Eleve', eleveSchema);