import React from 'react';
import {
	Button, Col, Form, Row,
} from 'react-bootstrap';

import LanguageTypeahead from './components/language_typeahead';
import PaginationBar, { Pages } from './components/pagination_bar';

export default function FormLanguages(props) {
	const { application } = props;

	return (
		<>
			<PaginationBar activePage={Pages.LANGUAGES} />

			<Form action="/application/form/languages" method="POST">
				<div className="subcontainer">
					<Row className="mb-4"><Col><h2>Languages</h2></Col></Row>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Mother tongue
						</Form.Label>
						<Col sm={10}>
							<LanguageTypeahead
								name="motherTongue"
								defaultValue={application.motherTongue}
								required
							/>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Home instruction language
						</Form.Label>
						<Col sm={10}>
							<LanguageTypeahead
								name="instructionLang"
								defaultValue={application.instructionLang}
								required
							/>
							<Form.Text className="text-muted">
								The main language for your lectures at your home
								institution.
							</Form.Text>
						</Col>
					</Form.Group>

					<Row className="mb-4"><Col><h3>Other languages</h3></Col></Row>

					<p>
						These fields are optional, fill as many rows as you need.
					</p>

					{[...Array(5)].map((x, i) => (
						// eslint-disable-next-line react/no-array-index-key
						<Form.Group as={Row} key={i}>
							<Col sm={3}>
								<LanguageTypeahead
									name={`otherLang${i + 1}Name`}
									defaultValue={application[`otherLang${i + 1}Name`]}
								/>
							</Col>
							<Col sm={9} className="d-flex justify-content-around">
								<Form.Check
									inline
									label="Currently studying"
									name={`otherLang${i + 1}CurrentlyStudying`}
									defaultChecked={application[`otherLang${i + 1}CurrentlyStudying`]}
								/>
								<Form.Check
									inline
									label="Able to follow lectures"
									name={`otherLang${i + 1}CanFollow`}
									defaultChecked={application[`otherLang${i + 1}CanFollow`]}
								/>
								<Form.Check
									inline
									label="Able to follow lectures with extra preparation"
									name={`otherLang${i + 1}CanFollowExtraPrep`}
									defaultChecked={application[`otherLang${i + 1}CanFollowExtraPrep`]}
								/>
							</Col>
						</Form.Group>
					))}
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
