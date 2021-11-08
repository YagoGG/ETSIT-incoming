import React from 'react';
import {
	Modal,
} from 'react-bootstrap';

export default function SettingsModal(props) {
	const { show, onHide } = props;

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
		</Modal>
	);
}
