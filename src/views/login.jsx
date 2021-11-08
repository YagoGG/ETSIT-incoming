import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

export default function Login() {
	return (
		<>
			<h1 className="mb-4">Log in</h1>
			<Row className="align-items-center">
				<Col sm className="border-end ms-1 pe-5">
					<Form action="/login" method="post">
						<Form.Group controlId="email" className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" name="email" placeholder="you@uni.edu" />
						</Form.Group>

						<Form.Group controlId="password" className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" name="password" placeholder="Your password" />
						</Form.Group>
						<Button variant="outline-primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
				<Col sm className="p-5">
					<p className="align-middle">
						In order to access the application, you need to be
						nominated from your Home University (
						<a href="http://www.etsit.upm.es/de/international-office/studying-at-etsit-upm/how-to-apply.html">
							nomination process
						</a>). If you have been nominated, you will
						receive an email from ETSIT with a registration link.
						Check your inbox and your spam folder.
					</p>
				</Col>
			</Row>
		</>
	);
}
