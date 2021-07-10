import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

export default function Index(props) {
	const { user } = props;

	return (
		<>
			<Row>
				<Col className="d-flex justify-content-end">
					<Button variant="outline-primary" href="/logout">Log out</Button>
				</Col>
			</Row>
			<h1>Your application</h1>
			<div>Hello, {user.firstName}!</div>
		</>
	);
}
