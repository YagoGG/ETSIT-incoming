import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

export default function Registration() {
	return (
		<>
			<h1>Registration</h1>
			<p>
				You have been nominated by your Home University for a mobility
				program at ETSIT-UPM. Congratulations!
			</p>
			<p>
				We need you to complete the following information to start your
				application.
			</p>
			<p><b>All fields are required.</b></p>
			<Form action="/register" method="POST" className="mt-5">
				<div className="mt-5 subcontainer">
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Full name
						</Form.Label>
						<Col sm={5}>
							<Form.Control name="firstName" type="input" placeholder="First name" required />
						</Col>
						<Col sm={5}>
							<Form.Control name="lastName" type="input" placeholder="Last name" required />
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Email
						</Form.Label>
						<Col sm={10}>
							<Form.Control name="email" type="email" placeholder="maxwell@example.com" required />
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Form.Label column sm={2}>
							Password
						</Form.Label>
						<Col sm={10}>
							<Form.Control name="password" type="password" minLength={8} required />
						</Col>
					</Form.Group>
				</div>

				<Form.Group as={Row} className="mt-5">
					<Col>
						<Form.Check label="I have read and accept the Privacy Policy." required />
					</Col>
				</Form.Group>

				<Form.Group as={Row}>
					<Col>
						<Button type="submit">Submit</Button>
					</Col>
				</Form.Group>
			</Form>
		</>
	);
}
