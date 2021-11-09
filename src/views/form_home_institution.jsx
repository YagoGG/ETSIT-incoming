import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import InstitutionTypeahead from './components/institution_typeahead';
import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormHomeInstitution(props) {
	const { application, institutions } = props;

	return (
		<>
			<PaginationBar activePage={Pages.HOME_INSTITUTION} />

			<Form action="/application/form/home-institution" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Home institution</h2></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Institution&apos;s name
						</Form.Label>
						<Col sm={10}>
							<InstitutionTypeahead
								name="homeInstitutionId"
								institutions={institutions}
								defaultValue={application.homeInstitutionId}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							School/Faculty
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="homeInstitutionSchool"
								type="input"
								defaultValue={application.homeInstitutionSchool}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Address
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="homeInstitutionAddress"
								type="input"
								defaultValue={application.homeInstitutionAddress}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Department coordinator
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="homeInstitutionCoordinatorName"
								type="input"
								placeholder="Full name"
								defaultValue={application.homeInstitutionCoordinatorName}
								required
							/>
						</Col>
					</Form.Group>

					<Row className="mb-4"><Col><h3>Contact person</h3></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Name
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="homeInstitutionContactName"
								type="input"
								defaultValue={application.homeInstitutionContactName}
								required
							/>
							<Form.Text className="text-muted">
								This is the person we should contact in your
								home institution regarding your mobility.
							</Form.Text>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Email
						</Form.Label>
						<Col sm={10}>
							<Form.Control
								name="homeInstitutionContactEmail"
								type="email"
								placeholder="contact@youruni.com"
								defaultValue={application.homeInstitutionContactEmail}
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
								name="homeInstitutionContactPhone"
								type="input"
								placeholder="+41 789 012 345"
								defaultValue={application.homeInstitutionContactPhone}
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
						<Button variant="secondary" href="/application/form/program">Back</Button>
					</Col>
					<Col md="auto">
						<Button variant="primary" type="submit">Save &amp; continue</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
