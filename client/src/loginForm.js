import React, { useState } from 'react';
import { Button, Col, Alert, Form, FormGroup, Container } from 'react-bootstrap';


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const doLogin = (event) => {
        event.preventDefault();

        setErrorMessage('')

        let valid = true;
        if (username === '' || password === '' || password.length < 6) {
            valid = false;
            setErrorMessage('At least one field is empty or password length is lower than 6');
            return;
        }
        
        if (valid) {
            props.doLogIn({ username, password });
        }
    }

    return (<Container>
        <Col>
            {errorMessage ? <Alert variant='warning'>{errorMessage}</Alert> : ''}
            <Form>
                <FormGroup>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </FormGroup>
                <Button variant="warning" type="submit" onClick={(event) => doLogin(event)}>Login</Button>
            </Form>
        </Col>
    </Container>);
}

export default LoginForm;