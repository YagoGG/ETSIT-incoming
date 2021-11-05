import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import CountryTypeahead from './components/country_typeahead';
import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormPersonalInfo(props) {
	const { application } = props;

	return (
		<>
			<PaginationBar activePage={Pages.PERSONAL_INFO} />

			<Form action="/application/form/personal-info" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Personal details</h2></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Date of birth
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="dateOfBirth"
								type="date"
								defaultValue={application.dateOfBirth}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Place of birth
						</Form.Label>
						<Col sm={10}>
							<CountryTypeahead
								name="placeOfBirth"
								defaultValue={application.placeOfBirth}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Nationality
						</Form.Label>
						<Col sm={10}>
							<CountryTypeahead
								name="nationality"
								defaultValue={application.nationality}
								required
							/>
							<Form.Text className="text-muted">
								If you have multiple nationalities, choose
								one of them.
							</Form.Text>
						</Col>
					</Form.Group>
					<fieldset>
						<Form.Group as={Row}>
							<Form.Label as="legend" column sm={2}>
								Sex
							</Form.Label>
							<Col sm={10}>
								<Form.Check
									type="radio"
									label="Male"
									value="male"
									name="sex"
									defaultChecked={application.sex === 'male'}
								/>
								<Form.Check
									type="radio"
									label="Female"
									value="female"
									name="sex"
									defaultChecked={application.sex === 'female'}
								/>
								<Form.Check
									type="radio"
									label="Other"
									value="other"
									name="sex"
									defaultChecked={application.sex === 'other'}
								/>
							</Col>
						</Form.Group>
					</fieldset>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Residence
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="residenceAddress"
								type="input"
								defaultValue={application.residenceAddress}
								placeholder="Address (street &amp; number)"
								required
							/>
							<Form.Text className="text-muted">
								This should be where you usually live in your home country.
							</Form.Text>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ offset: 2, span: 3 }}>
							<Form.Control
								name="residenceState"
								type="input"
								defaultValue={application.residenceState}
								placeholder="State/Region"
								required
							/>
						</Col>
						<Col sm={3}>
							<Form.Control
								name="residenceZipCode"
								type="input"
								defaultValue={application.residenceZipCode}
								placeholder="ZIP code"
								required
							/>
						</Col>
						<Col sm={4}>
							<CountryTypeahead
								name="residenceCountry"
								placeholder="Country"
								defaultValue={application.residenceCountry}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Phone number
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="phoneNumber"
								type="input"
								defaultValue={application.phoneNumber}
								placeholder="+34 612 345 678"
								required
							/>
							<Form.Text className="text-muted">
								Please include the country code as +XX at the beginning.
							</Form.Text>
						</Col>
					</Form.Group>
				</div>

				<Row className="mt-5 justify-content-between">
					<Col md="auto">
						<Button variant="secondary" href="/application">Back to the dashboard</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; finish</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
