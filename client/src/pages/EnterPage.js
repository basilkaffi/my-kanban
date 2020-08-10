import React from "react";
import { useState } from "react";
import logo from "../assets/kanban.png";
import { Form, Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { enterApps, enterViaGoogle } from '../store/actions/enterAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EnterPage() {
  const [enter, setEnter] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const dispatch = useDispatch()

  const submitValue = (e) => {
    e.preventDefault()
    let payload = {
      enter: enter,
      data: {
        email: email,
        password: password
      }
    }
    if(enter === 'register') payload.data.name = name
    dispatch(enterApps(payload)).then(() => {
      history.push('/dashboard')
    })
  };

  const responseGoogle = (response) => {
    const { id_token } = response.getAuthResponse();
    dispatch(enterViaGoogle(id_token)).then(() => {
      history.push('/dashboard')
    })
  };

  return (
    <div className="EnterPage background">
      <div className="logo">
        <img src={logo} alt={"logo wbsite"} />
        <div className="text">MY-KANBAN</div>
      </div>
      <div className="divider">
        <div>
          <div className="slogan">Managing Your Group Project</div>
        </div>
        <div>
          <div className="form-container">
            <Form onSubmit={submitValue}>
              <Form.Group className="button-container">
                {enter === "register" ? (
                  <>
                    <Button
                      variant="light"
                      onClick={() => setEnter("register")}
                    >
                      Sign Up
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEnter("login")}
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setEnter("register")}
                    >
                      Sign Up
                    </Button>
                    <Button variant="light" onClick={() => setEnter("login")}>
                      Sign In
                    </Button>
                  </>
                )}
              </Form.Group>
              <Form.Group className="form">
                {enter === "register" ? (
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                ) : null}
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="button-container2">
                  {enter === "register" ? (
                    <Button
                      variant="secondary"
                      as="input"
                      type="submit"
                      value="Register"
                    />
                  ) : (
                    <Button
                      variant="secondary"
                      as="input"
                      type="submit"
                      value="Login"
                    />
                  )}
                  <GoogleLogin
                    clientId="1042957079851-vfdt9uj25elvk11q6h5foh4k1o687sq1.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <Button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        {" "}
                        Google{" "}
                      </Button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </Form.Group>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterPage;
