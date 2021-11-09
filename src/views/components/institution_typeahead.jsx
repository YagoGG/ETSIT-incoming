import React, { useState } from 'react';
import {
	Form,
} from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function InstitutionTypeahead(props) {
	const {
		defaultValue, name, required, institutions, ...typeaheadProps
	} = props;
	const [selectedInstitutions, setSelectedInstitutions] = useState(
		institutions.filter((institution) => institution.id === defaultValue),
	);

	return (
		<>
			<Form.Control
				type="hidden"
				value={selectedInstitutions[0] ? selectedInstitutions[0].id : ''}
				name={name}
				required={required}
			/>
			<Typeahead
				id={`${name}-institution-typeahead`}
				labelKey="name"
				onChange={setSelectedInstitutions}
				options={institutions}
				selected={selectedInstitutions}
				inputProps={{ required }}
				placeholder="Choose an institution..."
				highlightOnlyResult
				renderMenuItemChildren={(institution, { text }) => (
					<>
						<Highlighter search={text}>{institution.name}</Highlighter>
						<div><small>{institution.code}</small></div>
					</>
				)}
				{...typeaheadProps}
			/>
		</>
	);
}
