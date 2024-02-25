const EleveModel = require('../Models/eleve');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllEleves = async(req , res)=>{
    const eleves = await EleveModel.find().select('-password');
    res.status(200).json(eleves);
}

module.exports.eleveInfo = (req , res)=> {
    //console.log(req.params);
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
EleveModel.findById(req.params.id).select('-password')
.then(docs =>{
    if (!docs) {
        return res.status(404).send('eleve not found');
    }
    res.send(docs);
}) 
.catch(err =>{
    console.log('ID unknown : ' +err);
});
};

module.exports.updateEleve = async (req , res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
    
    try {
        const updatedEleve = await EleveModel.findOneAndUpdate(
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

        if (!updatedEleve) {
            return res.status(404).send('Eleve not found');
        }

        return res.send(updatedEleve);
    } catch (err) {
        console.error('Error updating eleve:', err);
        return res.status(500).json({ message: err });
    }
        
    };

    module.exports.deleteEleve = async (req, res) => {
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).send('ID unknown: ' + req.params.id);
        }
       
        try {
            const result = await EleveModel.deleteOne({ _id: req.params.id }).exec();
    
            if (result.deletedCount === 0) {
                return res.status(404).send('Eleve not found');
            }
    
            return res.status(200).json({ message: "Successfully deleted" });
        } catch (err) {
            console.error('Error deleting eleve:', err);
            return res.status(500).json({ message: err });
        }
    }
    
    
