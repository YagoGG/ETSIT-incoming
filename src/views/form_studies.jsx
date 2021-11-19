import React, { useState } from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import CountryTypeahead from './components/country_typeahead';
import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormStudies(props) {
	const { application } = props;

	const [hasStudiedAbroad, setHasStudiedAbroad] = useState(application.hasStudiedAbroad || false);

	return (
		<>
			<PaginationBar activePage={Pages.STUDIES} />

			<Form action="/application/form/studies" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Studies</h2></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Name of current studies
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="currentStudiesName"
								type="input"
								defaultValue={application.currentStudiesName}
								required
							/>
							<Form.Text className="text-muted">
								The degree/diploma you are currently studying.
							</Form.Text>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Year
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="currentStudiesYear"
								type="number"
								defaultValue={application.currentStudiesYear}
								required
							/>
							<Form.Text className="text-muted">
								How many years have you been studying this degree,
								including the current one.
							</Form.Text>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Area of specialisation
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="currentStudiesSpecialisation"
								type="input"
								defaultValue={application.currentStudiesSpecialisation}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Col>
							<Form.Check
								label="I have studied abroad before."
								name="hasStudiedAbroad"
								checked={hasStudiedAbroad}
								onChange={() => setHasStudiedAbroad((prevState) => !prevState)}
							/>
						</Col>
					</Form.Group>

					<fieldset disabled={!hasStudiedAbroad}>
						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Institution
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									name="abroadStudiesInstitution"
									type="input"
									defaultValue={application.abroadStudiesInstitution}
									required={hasStudiedAbroad}
								/>
							</Col>
						</Form.Group>

						<Form.Group as={Row}>
							<Form.Label column sm={2}>
								Location
							</Form.Label>
							<Col sm={10}>
								<CountryTypeahead
									name="abroadStudiesLocation"
									defaultValue={application.abroadStudiesLocation}
									required={hasStudiedAbroad}
								/>
							</Col>
						</Form.Group>
					</fieldset>
				</div>

				<Row className="mt-5 justify-content-between">
					<Col md="auto">
						<Button variant="secondary" href="/application/form/work-experience">Back</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; finish</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
