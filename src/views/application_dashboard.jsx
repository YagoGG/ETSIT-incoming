import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export default function Index(props) {
	const { user } = props;

	return (
		<>
			<Row className="justify-content-between">
				<Col>
					<h1>Your application</h1>
				</Col>
				<Col md="auto">
					<Button variant="outline-primary" href="/logout">Log out</Button>
				</Col>
			</Row>
			<div>Hello, {user.firstName}!</div>
		</>
	);
}
