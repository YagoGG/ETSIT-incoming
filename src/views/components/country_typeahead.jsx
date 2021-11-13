import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

import countries from '../../static/countries.json';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function CountryTypeahead(props) {
	const {
		defaultValue, name, required, ...typeaheadProps
	} = props;
	const [selectedCountries, setSelectedCountries] = useState(
		countries.filter((country) => country.name === defaultValue),
	);

	return (
		<>
			<Form.Control
				type="hidden"
				value={selectedCountries[0] ? selectedCountries[0].name : ''}
				name={name}
				required={required}
			/>
			<Typeahead
				id={`${name}-country-typeahead`}
				labelKey={(country) => `${country.name} (${country.native})`}
				onChange={setSelectedCountries}
				options={countries}
				selected={selectedCountries}
				inputProps={{ required }}
				placeholder="Choose a country..."
				highlightOnlyResult
				renderMenuItemChildren={(country, { text }) => (
					<>
						<span className="mr-2">{country.emoji}</span>
						<Highlighter search={text}>{country.name}</Highlighter>
						<div><small>{country.native}</small></div>
					</>
				)}
				{...typeaheadProps}
			/>
		</>
	);
}
