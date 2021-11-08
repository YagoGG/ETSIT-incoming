import React, { useState } from 'react';
import {
	Button, Col, Modal, Row,
} from 'react-bootstrap';

import InstitutionsModal from './institutions_modal';

export default function SettingsModal(props) {
	const { show, onHide } = props;
	const [showInstitutionsModal, setInstitutionsModal] = useState(false);

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className="mb-3">
					<Col sm={4} className="fw-bold">Partner institutions</Col>
					<Col sm={8}>
						<Button
							variant="primary"
							onClick={() => setInstitutionsModal(true)}
						>Update list
						</Button>
					</Col>
					<InstitutionsModal
						show={showInstitutionsModal}
						onHide={() => setInstitutionsModal(false)}
					/>
				</Row>
			</Modal.Body>
		</Modal>
	);
}
