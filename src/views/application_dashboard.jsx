import React from 'react';
import {
	Accordion, Button, Col, Row,
} from 'react-bootstrap';

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
			<p>Hello, {user.firstName}! This is the status of your application.</p>
			<Accordion id="dashboard-accordion" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						Application form
					</Accordion.Header>
					<Accordion.Body>
						<Button variant="link" className="d-flex p-0" href="/application/form">Go to the form</Button>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						Academic information
					</Accordion.Header>
					<Accordion.Body>
						Under development.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</>
	);
}
