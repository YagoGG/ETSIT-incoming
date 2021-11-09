import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormPurposeOfStay(props) {
	const { application } = props;

	return (
		<>
			<PaginationBar activePage={Pages.PURPOSE_OF_STAY} />

			<Form action="/application/form/purpose-of-stay" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Purpose of stay</h2></Col></Row>

					<Form.Group as={Row}>
						<Col sm={10}>
							<Form.Check
								label="Undergraduate/Bachelor courses"
								name="purposeOfStayBachelorCourses"
								type="checkbox"
								defaultChecked={application.purposeOfStayBachelorCourses}
							/>
							<Form.Check
								label="Graduate/Master courses"
								name="purposeOfStayMasterCourses"
								type="checkbox"
								defaultChecked={application.purposeOfStayMasterCourses}
							/>
							<Form.Check
								label={(
									<>
										Bachelor or Master thesis
										<br />
										<Form.Text className="text-muted mt-0">
											A Bachelor thesis has a workload of
											12 ECTS, and a Master thesis has a workload
											of 30 ECTS.
										</Form.Text>
									</>
								)}
								name="purposeOfStayThesis"
								type="checkbox"
								defaultChecked={application.purposeOfStayThesis}
							/>
							<Form.Check
								label="Research project"
								name="purposeOfStayResearchProject"
								type="checkbox"
								defaultChecked={application.purposeOfStayResearchProject}
							/>
							<Form.Check
								label={(
									<div className="d-flex">
										Other:
										<Form.Control
											name="purposeOfStayOtherDetails"
											type="input"
											defaultValue={application.purposeOfStayOtherDetails}
											size="sm"
											className="ms-1"
										/>
									</div>
								)}
								name="purposeOfStayOther"
								type="checkbox"
								defaultChecked={application.purposeOfStayOther}
							/>
						</Col>
					</Form.Group>
				</div>

				<Row className="mt-5 justify-content-between">
					<Col md="auto">
						<Button variant="secondary" href="/application/form/home-institution">Back</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; finish</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
