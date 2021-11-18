import React from 'react';
import {
	Button, Card, Col, Form, Row, Tab, Table, Tabs,
} from 'react-bootstrap';

export default function AdminSubjects(props) {
	const { subjects, studyPlans } = props;

	return (
		<>
			<Row className="justify-content-between">
				<Col>
					<h1>Subjects</h1>
				</Col>
				<Col md="auto">
					<Button variant="secondary" href="/admin">Back to the dashboard</Button>
				</Col>
			</Row>
			<Tabs defaultActiveKey="downloaded" className="mb-3">
				<Tab eventKey="downloaded" title="Already downloaded">
					<Form action="/admin/subjects" method="POST">
						<Card bg="light" className="mb-3">
							<Card.Body>
								<Row className="justify-content-between mb-0">
									<Col className="my-auto">
										Do not forget to save any changes you make before leaving!
									</Col>
									<Col md="auto">
										<Button variant="primary" type="submit">Save changes</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
						<Table hover>
							<thead>
								<tr>
									<th className="text-center">Enabled?</th>
									<th>Code</th>
									<th>Name (orig.)</th>
									<th>Name (EN)</th>
									<th className="text-center">ECTS</th>
								</tr>
							</thead>
							<tbody>
								{subjects.sort((a, b) => a.code - b.code).map((subject) => (
									<tr key={subject.code}>
										<td className="text-center">
											<Form.Check
												type="checkbox"
												defaultChecked={subject.active}
												name={subject.code.toString()}
											/>
										</td>
										<td>{subject.code}</td>
										<td>{subject.nameNative}</td>
										<td>{subject.nameEnglish}</td>
										<td className="text-center">{subject.ects}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Form>
				</Tab>
				<Tab eventKey="update" title="Update">
					<Form action="/admin/subjects/update" method="POST">
						<Card bg="light" className="mb-3">
							<Card.Body>
								<Row className="justify-content-between mb-0">
									<Col className="my-auto">
										<p>
											Click the button after selecting the
											study plans whose subjects you want
											to download. Once downloaded,
											subjects cannot be deleted, but they
											can be enabled or disabled in the
											other tab.
										</p>
										<p className="mb-0">
											Please note that downloading a study
											plan{' '}
											<b>overwrites its &quot;enabled&quot;</b>
											{' '}status.
										</p>
									</Col>
									<Col md="auto">
										<Button
											variant="primary"
											type="submit"
											className="mt-3 float-end"
										>
											Update
										</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
						<p>
							These are the study plans whose subjects are available for download:
						</p>
						<Table hover>
							<thead>
								<tr>
									<th className="text-center">Download?</th>
									<th>Code</th>
									<th>Name</th>
								</tr>
							</thead>
							<tbody>
								{studyPlans.map((studyPlan) => (
									<tr key={studyPlan.code}>
										<td className="text-center">
											<Form.Check
												type="checkbox"
												name={studyPlan.code}
											/>
										</td>
										<td className="text-muted">{studyPlan.code}</td>
										<td>{studyPlan.nameNative}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Form>
				</Tab>
			</Tabs>
		</>
	);
}
