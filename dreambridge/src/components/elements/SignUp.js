import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import Button from './Button';

function SignUp(){
    // state to keep track of the user that signs up, initailzied to object with values of empty strings
    const [userInfo, setUserInfo] = React.useState({})
    const context = React.useContext(Context);

    // when a user submits the form, we want to grab all the data from the form and update the state of the userInfo
    const handleSubmit = (event) => {
        event.preventDefault();
        const userFirstName = event.target.firstName.value;
        // console.log(userFirstName)
        const userLastName = event.target.lastName.value;
        const userEmail = event.target.email.value;
        const userPassword = event.target.passwrd.value;
        console.log(userFirstName, userLastName, userEmail, userPassword);

        setUserInfo({
            firstName : userFirstName,
            lastName : userLastName,
            email : userEmail,
            password : userPassword
        })
    }
    
    const postNewUser = async (userData) => {
        const response = await fetch("http://localhost:3030/signup", {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(userData)
        })
        const data = await response.json()
        return data;
    }

    React.useEffect(() => {
        postNewUser(userInfo).then(newUserData => {
            console.log(newUserData);
            context.updateToken(newUserData.token)
        })
    }, [userInfo])

    let navigate = useNavigate();

    return (
        <div className='form-centered'>
        <Form onSubmit = {handleSubmit} className="user-form">
        <ButtonGroup className="form-btns-container">
            <Button className="form-btns">
                <Link to="/login"><h2>Sign In</h2></Link>
            </Button>
            <Button className="form-btns signup-v1">
                <Link to="/signup"><h2>Sign Up</h2></Link>
            </Button>
        </ButtonGroup>
            <Form.Group className="mb-3 login-input" controlId="formBasicFirstName">
                <Form.Label className="input-deets">First Name</Form.Label>
                <Form.Control name ="firstName" type="text" placeholder="Enter your first name" />
            </Form.Group>
            <Form.Group className="mb-3 login-input" controlId="formBasicLastName">
                <Form.Label className="input-deets">Last Name</Form.Label>
                <Form.Control name ="lastName" type="text" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group className="mb-3 login-input" controlId="formBasicEmail">
                <Form.Label className="input-deets">Email address</Form.Label>
                <Form.Control name ="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3 login-input" controlId="formBasicPassword">
                <Form.Label className="input-deets">Password</Form.Label>
                <Form.Control name ="passwrd" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-btn">
                Submit
            </Button>
        </Form>
        {/* <span>Already have an account? Click <Link to="/login">here</Link> to sign in </span> */}
        {/* This is a temp link */}
        {/* <Link to="/Connect-with-a-lawyer">Click to go to main page</Link> */}
    </div>
    )
}

export default SignUp;