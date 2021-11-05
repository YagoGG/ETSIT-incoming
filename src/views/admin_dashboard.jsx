import React, { useState } from 'react';
import {
	Button, Col, Form, Modal, Row, Tab, Table, Tabs,
} from 'react-bootstrap';

export default function Index(props) {
	const {
		user, nominated, registered, admins,
	} = props;
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
			<p className="mb-5">
				Hello, {user.firstName}!
			</p>
			<Tabs defaultActiveKey="nominated" className="mb-3">
				<Tab eventKey="nominated" title="Nominated students">
					<Table hover>
						<thead>
							<tr>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{nominated.map((nominatedUser) => (
								<tr key={nominatedUser.id}>
									<td>{nominatedUser.email}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
				<Tab eventKey="registered" title="Registered students">
					<Table hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>University</th>
								<th>Period</th>
							</tr>
						</thead>
						<tbody>
							{registered.map((registeredUser) => (
								<tr key={registeredUser.id}>
									<td>
										{`${registeredUser.lastName}, ${registeredUser.firstName}`}
									</td>
									<td>
										{registeredUser.Application.homeSchool
											|| <em className="text-muted fst-italic">unknown</em>}
									</td>
									<td>
										{registeredUser.Application.AcademicPeriod.name
											|| <em className="text-muted fst-italic">unknown</em>}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
				<Tab eventKey="admins" title="Administrators">
					<Table hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{admins.map((adminUser) => (
								<tr key={adminUser.id}>
									<td>
										{`${adminUser.lastName}, ${adminUser.firstName}`}
									</td>
									<td>{adminUser.email}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Tab>
			</Tabs>
		</>
	);
}
