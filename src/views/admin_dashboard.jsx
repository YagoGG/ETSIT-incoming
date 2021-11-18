import React, { useState } from 'react';
import {
	Button, Stack, Tab, Table, Tabs,
} from 'react-bootstrap';

import NominationModal from './components/modals/nomination_modal';
import SettingsModal from './components/modals/settings_modal';

export default function Index(props) {
	const {
		user, nominated, registered, admins,
	} = props;
	const [showNominationModal, setNominationModal] = useState(false);
	const [showSettingsModal, setSettingsModal] = useState(false);

	return (
		<>
			<Stack direction="horizontal" className="mb-4" gap={2}>
				<h1 className="me-auto mb-0">Administration dashboard</h1>
				<Button variant="primary" onClick={() => setNominationModal(true)}>
					Nominate students
				</Button>
				<Button variant="primary" onClick={() => setSettingsModal(true)}>
					Settings
				</Button>
				<Button variant="outline-primary" href="/logout">
					Log out
				</Button>
			</Stack>
			<NominationModal show={showNominationModal} onHide={() => setNominationModal(false)} />
			<SettingsModal show={showSettingsModal} onHide={() => setSettingsModal(false)} />
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
										{(registeredUser.Application.HomeInstitution
											&& registeredUser.Application.HomeInstitution.name)
											|| <em className="text-muted fst-italic">unknown</em>}
									</td>
									<td>
										{(registeredUser.Application.AcademicPeriod
											&& registeredUser.Application.AcademicPeriod.name)
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
