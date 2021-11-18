import React from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';

export default function Index(props) {
	const { user } = props;

	return (
		<>
			<Stack direction="horizontal" className="mb-4" gap={2}>
				<h1 className="me-auto mb-0">Your application</h1>
				<Button variant="outline-primary" href="/logout">Log out</Button>
			</Stack>
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
