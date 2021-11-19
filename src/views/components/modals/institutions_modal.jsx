import React from 'react';
import {
	Button, Form, Modal,
} from 'react-bootstrap';

export default function InstitutionsModal(props) {
	const { show, onHide } = props;

	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header closeButton>
				<Modal.Title>Partner institutions</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form action="/admin/institutions" method="POST">
					<Form.Group>
						<Form.Text>
							<p>
								Enter the list of partner institutions to upload in
								CSV format.
							</p>
							<p>
								Each institution should be <b>on its own line</b>,
								composed of the <b>institution&apos;s code</b> followed
								by a <b>comma</b> and the <b>institution&apos;s name</b>,
								both quoted. Example:
							</p>
							<pre className="ms-3">
								&quot;CH LAUSANN 06&quot;,&quot;École Polytechnique Fédérale de Lausanne&quot;<br />
								&quot;I TORINO 02&quot;,&quot;Politecnico di Torino&quot;
							</pre>
						</Form.Text>
						<Form.Control
							required
							as="textarea"
							name="institutions"
							aria-label="Institutions"
							className="mt-3"
						/>
					</Form.Group>
					<Button variant="primary" type="submit" className="mt-3">Update</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
