const UserModel = require('../Models/User');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async(req , res)=>{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req , res)=> {
    //console.log(req.params);
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
UserModel.findById(req.params.id).select('-password')
.then(docs =>{
    if (!docs) {
        return res.status(404).send('User not found');
    }
    res.send(docs);
}) 
.catch(err =>{
    console.log('ID unknown : ' +err);
});
};

module.exports.updateUser = async (req , res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    
    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    firstName: req.body.firstName
                }
            },
            {
                new: true, // Retourne le document modifié plutôt que l'ancien
                upsert: true, // Crée un nouvel utilisateur si l'ID n'existe pas
                setDefaultsOnInsert: true // Applique les valeurs par défaut lors de l'insertion d'un nouvel utilisateur
            }
        ).exec(); // Utilisez exec() pour obtenir une promesse

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        return res.send(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ message: err });
    }
        
    };

    module.exports.deleteUser = async (req, res) => {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('ID unknown: ' + req.params.id);
        }
       
        try {
            const result = await UserModel.deleteOne({ _id: req.params.id }).exec();
    
            if (result.deletedCount === 0) {
                return res.status(404).send('User not found');
            }
    
            return res.status(200).json({ message: "Successfully deleted" });
        } catch (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ message: err });
        }
    }
    
    
