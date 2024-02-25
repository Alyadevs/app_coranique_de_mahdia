const UserModel= require('../Models/User');
const jwt = require('jsonwebtoken');
const {signUpErrors,signInErrors}= require('../utils/errors.utils')
const maxAge = 3 * 24 * 60 * 60;;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};
module.exports.signUp = async(req , res) =>{
    console.log(req.body);
    const {name ,mobile, email , password} = req.body
    try{
        const user = await UserModel.create({name , mobile  , email , password});
        res.status(201).json({ user: user._id });
    }
    catch(err){
      const errors = signUpErrors(err)
        res.status(200).send({errors});
    }
}
module.exports.signUpEleve = async(req , res) =>{
  console.log(req.body);
  const {name,mobile ,email,password,nom_pere,date_naissance,lieu,genre,group,niveau_etude,etablissement} = req.body
  try{
      const eleve = await EleveModel.create({name,mobile,email,password,nom_pere,date_naissance,lieu,genre,group,niveau_etude,etablissement});
      res.status(201).json({ eleve: eleve._id });
  }
  catch(err){
    const errors = signUpErrors(err)
      res.status(200).send({errors});
  }
}

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signInErrors(err)
    res.status(400).json({ errors });
  }
};
module.exports.signInEleve = async (req, res) => {
  const { email, password } = req.body;

  try {
    const eleve = await EleveModel.login(email, password);
    const token = createToken(eleve._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ eleve: eleve._id });
  } catch (err) {
    const errors = signInErrors(err)
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); 
  res.redirect('/');
};