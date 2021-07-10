import React, { useState } from 'react';
import {
	Button, Col, Form, Modal, Row,
} from 'react-bootstrap';

export default function Index(props) {
	const { user } = props;
	const [showNominationModal, setNominationModal] = useState(false);

	return (
		<>
			<Row className="justify-content-between">
				<Col>
					<h1>Administration dashboard</h1>
				</Col>
				<Col md="auto">
					<Button
						variant="primary"
						className="mx-2"
						onClick={() => setNominationModal(true)}
					>
						Nominate students
					</Button>
					<Button variant="outline-primary" href="/logout">Log out</Button>
				</Col>
			</Row>
			<div>Hello, {user.firstName}!</div>
			<Modal show={showNominationModal} onHide={() => setNominationModal(false)} centered>
				<Modal.Header closeButton>
					<Modal.Title>Nominate students</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form action="/admin/nominate" method="POST">
						<Form.Group>
							<Form.Text className="mb-3">
								Enter the email addresses of the students to nominate.
								Each address should be <b>on its own line</b>,
								or <b>separated by a comma</b>.
							</Form.Text>
							<Form.Control required as="textarea" name="emails" aria-label="Emails" />
						</Form.Group>
						<Button variant="primary" type="submit">Send nomination</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
