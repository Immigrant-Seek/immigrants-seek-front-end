import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";
import React from "react";
import Button from "../components/elements/Button";
import { ButtonGroup } from "react-bootstrap";

// This is where you render the Login Form component you created
function Login() {
  const [userInfo, setUserInfo] = React.useState({});
  const context = React.useContext(Context);
  const navigate = useNavigate();

  // when a user submits the form, we want to grab all the data from the form and update the state of the userInfo
  const handleSubmit = (event) => {
    event.preventDefault();
    const userEmail = event.target.email.value;
    const userPassword = event.target.passwrd.value;
    console.log(userEmail, userPassword);

    setUserInfo({
      email: userEmail,
      password: userPassword,
    });
  };

  const loginAttempt = async (userData) => {
    const response = await fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  };

  React.useEffect(() => {
    // only run this effect is userInfo has an email (prevents running on initial load)
    if(!userInfo.email) return;

    loginAttempt(userInfo).then((data) => {
      console.log(data);

      // Update the context state
      context.updateToken(data.token);
      context.updateVerifiedUser(data);

      console.log(context.verifiedUser.userInfo);

      // Use the 'data' variable directly for immediate navigation decisions
      if (data.userInfo !== undefined) {
        context.updateLoggedIn(true);

        if(data.userInfo.is_lawyer){
          navigate("/Connect-with-a-client")
        } else {
          navigate("/Connect-with-a-lawyer")
        }

        console.error("Login failed:", data.message);
      }
    });
  }, [userInfo]);

  return (
    <div className="form-centered">
      <Form onSubmit={handleSubmit} className="user-form">
        <ButtonGroup className="form-btns-container">
          <Button className="form-btns login-v1">
            <Link to="/login">
              <h2 className="h2-hover">Sign In</h2>
            </Link>
          </Button>
          <Button className="form-btns signup-v2">
            <Link to="/signup">
              <h2 className="h2-hover">Sign Up</h2>
            </Link>
          </Button>
        </ButtonGroup>
        <div className="margin-auto">
          <>
            <Form.Group className="mb-3 login-input" controlId="formBasicEmail">
              <Form.Label className="input-deets">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                className="lawyer-input input-width"
              />
            </Form.Group>
          </>
          <>
            <Form.Group
              className="mb-3 login-input"
              controlId="formBasicPassword"
            >
              <Form.Label className="input-deets">Password</Form.Label>
              <Form.Control
                name="passwrd"
                type="password"
                placeholder="Password"
                className="lawyer-input input-width"
              />
            </Form.Group>
          </>
        </div>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
