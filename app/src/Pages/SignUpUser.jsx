import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios'; // Make sure axios is installed and imported
import Background from '../assets/signin.jpg';
import '../Styles/SignIn.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function SignUpUser() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const[picture, setPicture] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const  handleRegister= async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post("/api/user/register", {
                name, 
                mobile,
                email,
                password
             });

            if (data) {
                navigate("/login");
                console.log("Register successful:",data);
            } else {0
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                const errorFields = Object.keys(error.response.data.errors);
                setErrorMessage(`Invalid ${errorFields.join(", ")}: ${error.message}`);
            } else {
                setErrorMessage("Error signing up");
            }
        }
       
    
    };



    return (

        <Container >
            <Row>
            <div style={{ backgroundColor: "#ffffff" }}>
                <div className="limiter">

                    <div className="wrap-login100">
                        <Col>
                        <form className="login100-form validate-form"  >
                            <div className="d-flex flex-column align-items-center justify-content-start" style={{marginBottom: 24}}>
                                <span className="login100-form-title p-b-43">
                                    <h2 className="text-5xl">تسجيل الدخول</h2>
                                </span>
                                <p className="text-xl">مرحبا بكم</p>
                            </div>

                            <div className="form-group">

                              
                                <div className="form-wrapper">
                                    <label for="" className="styleLabel2">ادخل البريد الالكتروني</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />

                                </div>
                                <div className="form-wrapper">
                                    <label for="" className="styleLabel1">ادخل اسمك الكامل</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                                </div>
                            </div>



                            <div className="form-group">

                           
                                <div className="form-wrapper">
                                    <label for="" className="styleLabel4" >كلمة العبور</label>
                                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                </div>
                                <div className="form-wrapper">
                                <label for="" className="styleLabel3">ادخل  هاتف الولي</label>
                                <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" />
                            </div>
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="submit" className="login100-form-btn" onClick={handleRegister}>
                                    تسجيل الدخول
                                </button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <p>هل أنت جديد في الشعار؟ سجل هنا</p>
                            </div>
                        </form>
                        </Col>
                        <Col>
                        <div className="login100-more" style={sectionStyle}></div>
                        </Col>
                    </div>
                </div>
            </div>
            </Row>
        </Container>

    );
};  

var sectionStyle = {
    height: "620px",
    width: "600px",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
};

export default SignUpUser;
