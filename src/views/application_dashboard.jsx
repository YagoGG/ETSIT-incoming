import React from 'react';
import {
	Accordion, Button, Card, Col, Row,
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
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						Application form
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<Button variant="link" className="d-flex p-0" href="/application/form">Go to the form</Button>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
}
