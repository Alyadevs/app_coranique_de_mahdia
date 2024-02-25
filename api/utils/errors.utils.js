module.exports.signUpErrors = (err)=>{
 let errors = {mobile:'',picture:'',email:'' ,password:''}
 if(err.message.includes('mobile'))
 errors.mobile='existe déja';
 if(err.message.includes('picture'))
 errors.picture='picture existe';
 if(err.message.includes('email'))
 errors.email='Email incorrect';
if(err.message.includes('password'))
errors.password='le mot de passe doit faire 6 caractères minimum';
if(err.code ===11000 && Object.keys(err.keyValue)[0].includes("email"))
errors.email='Cet email est déjà enregistré';

return errors
};

module.exports.signInErrors = (err) => {
    let errors = {email:'',password:''}

    if(err.message.includes("email"))
    errors.email="Email inconnu";
if(err.message.includes("password"))
errors.password= "le mot de passe ne correspond pas "

return errors

}