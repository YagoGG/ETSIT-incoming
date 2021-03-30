import { Button, Col, Row } from 'react-bootstrap';
import React from 'react';

export default function Index(props) {
	const { user } = props;

	return (
		<>
			<Row>
				<Col className="d-flex justify-content-end">
					<Button variant="outline-primary" href="/logout">Log out</Button>
				</Col>
			</Row>
			<div>Hello, {user.name}!</div>
		</>
	);
}
