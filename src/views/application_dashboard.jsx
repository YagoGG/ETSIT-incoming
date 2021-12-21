import React from 'react';
import {
	Accordion, Button, Card, Col, Form, InputGroup, Row, Stack, Table,
} from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

export default class ApplicationDashboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			typeaheadSubjects: [],
			laSubjects: props.laSubjects || [],
		};

		this.handleAddSubject = this.handleAddSubject.bind(this);
	}

	handleAddSubject() {
		this.setState((prevState) => ({
			laSubjects: [...prevState.laSubjects, ...prevState.typeaheadSubjects],
			typeaheadSubjects: [],
		}));
	}

	render() {
		const { user, enabledSubjects } = this.props;
		const { laSubjects, typeaheadSubjects } = this.state;

		const laSubjectCodes = laSubjects.map((subject) => subject.code);
		const availableSubjects = enabledSubjects.filter(
			(subject) => !laSubjectCodes.includes(subject.code),
		);

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
							Learning agreement
						</Accordion.Header>
						<Accordion.Body>
							<Form action="/application/learning-agreement" method="POST">
								{laSubjectCodes.map((code, idx) => (
									<input
										name={`subjects[${idx}]`}
										type="hidden"
										key={code}
										value={code}
									/>
								))}
								<Card bg="light" className="mb-3">
									<Card.Body>
										<Row className="justify-content-between mb-0">
											<Col className="my-auto">
												Do not forget to save any changes!
											</Col>
											<Col md="auto">
												<Button variant="primary" type="submit">Save</Button>
											</Col>
										</Row>
									</Card.Body>
								</Card>
							</Form>
							<Table hover>
								<thead>
									<tr>
										<th>Code</th>
										<th>Name</th>
										<th>ECTS</th>
									</tr>
								</thead>
								<tbody>
									{laSubjects.map((subject) => (
										<tr key={subject.code}>
											<td>{subject.code}</td>
											<td>{subject.nameEnglish}</td>
											<td>{subject.ects}</td>
										</tr>
									))}
								</tbody>
							</Table>
							<InputGroup style={{ width: '100%' }}>
								<Typeahead
									id="subject-typeahead"
									className="flex-fill"
									labelKey={(subject) => `${subject.nameEnglish} (${subject.code})`}
									onChange={(v) => this.setState({ typeaheadSubjects: v })}
									options={availableSubjects}
									selected={typeaheadSubjects}
									placeholder="Search a subject..."
									highlightOnlyResult
									renderMenuItemChildren={(subject, { text }) => (
										<>
											<Highlighter search={text}>{subject.nameEnglish}</Highlighter>
											<div>
												<small className="me-2">{subject.code}</small>
												<small className="text-muted">{subject.ects} ECTS</small>
											</div>
										</>
									)}
								/>
								<Button
									variant="primary"
									onClick={this.handleAddSubject}
								>Add
								</Button>
							</InputGroup>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</>
		);
	}
}
