import React, { useState } from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import CountryTypeahead from './components/country_typeahead';
import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormWorkExperience(props) {
	const { application } = props;

	const [hasWorkExperience, setHasWorkExperience] = useState(
		application.hasWorkExperience || false,
	);

	return (
		<>
			<PaginationBar activePage={Pages.WORK_EXPERIENCE} />

			<Form action="/application/form/work-experience" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Work experience</h2></Col></Row>

					<Form.Group as={Row}>
						<Col>
							<Form.Check
								label="I have work experience related to my current studies."
								name="hasWorkExperience"
								checked={hasWorkExperience}
								onChange={() => setHasWorkExperience((prevState) => !prevState)}
							/>
						</Col>
					</Form.Group>

					<fieldset disabled={!hasWorkExperience}>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Role
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									name="workExperienceRole"
									type="input"
									placeholder="Software Developer"
									defaultValue={application.workExperienceRole}
									required={hasWorkExperience}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Employer
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									name="workExperienceEmployer"
									type="input"
									placeholder="ACME Corp."
									defaultValue={application.workExperienceEmployer}
									required={hasWorkExperience}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Location
							</Form.Label>
							<Col sm={10}>
								<CountryTypeahead
									name="workExperienceLocation"
									defaultValue={application.workExperienceLocation}
									required={hasWorkExperience}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Start date
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									name="workExperienceStartDate"
									type="date"
									defaultValue={application.workExperienceStartDate}
									required={hasWorkExperience}
								/>
							</Col>

							<Form.Label column sm={2}>
								End date
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									name="workExperienceEndDate"
									type="date"
									defaultValue={application.workExperienceEndDate}
									required={hasWorkExperience}
								/>
							</Col>
						</Form.Group>
					</fieldset>
				</div>

				<Row className="mt-5 justify-content-between">
					<Col md="auto">
						<Button variant="secondary" href="/application/form/languages">Back</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; continue</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
