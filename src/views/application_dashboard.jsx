import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

import { User } from '../models';

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
			<div>Hello, {user.name}!</div>
			<p>
				You user has the {user.role === User.ADMIN_ROLE ? 'administrator' : 'student'} role.
			</p>
		</>
	);
}
