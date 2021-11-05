import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormMobilityProgram(props) {
	const { application, academicPeriods, mobilityPrograms } = props;

	return (
		<>
			<PaginationBar activePage={Pages.MOBILITY_PROGRAM} />

			<Form action="/application/form/program" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Mobility program</h2></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Academic period
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="academicPeriodId"
								as="select"
								required
								defaultValue={application.academicPeriodId}
							>
								<option value="">Select one...</option>
								{academicPeriods.map((period) => (
									<option
										value={period.id}
										key={period.id}
									>{period.name}
									</option>
								))}
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Mobility program
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="mobilityProgramId"
								as="select"
								required
								defaultValue={application.mobilityProgramId}
							>
								<option value="">Select one...</option>
								{mobilityPrograms.map((program) => (
									<option
										value={program.id}
										key={program.id}
									>
										{program.name}
									</option>
								))}
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Field of study
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="fieldOfStudy"
								as="select"
								required
								defaultValue={application.fieldOfStudy}
							>
								<option value="">
									Select one...
								</option>
								<option value="electrical-engineering">
									Electrical Engineering
								</option>
								<option value="computer-science">
									Computer Science
								</option>
								<option value="biomedical-engineering">
									Biomedical Engineering
								</option>
							</Form.Control>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Col>
							<Form.Check
								name="seeksDoubleDegree"
								label="I am applying for a double degree at ETSIT-UPM."
								defaultChecked={application.seeksDoubleDegree}
							/>
						</Col>
					</Form.Group>
				</div>

				<Row className="mt-5 justify-content-between">
					<Col md="auto">
						<Button variant="secondary" href="/application/form/personal-info">Back</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; finish</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
