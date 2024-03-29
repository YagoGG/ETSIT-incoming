import React from 'react';
import {
	Button, Form, Modal,
} from 'react-bootstrap';

export default function NominationModal(props) {
	const { show, onHide } = props;

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Nominate students</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form action="/admin/nominate" method="POST">
					<Form.Group>
						<Form.Text>
							Enter the email addresses of the students to nominate.
							Each address should be <b>on its own line</b>,
							or <b>separated by a comma</b>.
						</Form.Text>
						<Form.Control
							required
							as="textarea"
							name="emails"
							aria-label="Emails"
							className="mt-3"
						/>
					</Form.Group>
					<Button variant="primary" type="submit" className="mt-3">Send nomination</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
