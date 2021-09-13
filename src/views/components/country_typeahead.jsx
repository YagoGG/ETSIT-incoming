import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

import countries from '../../static/countries.json';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function CountryTypeahead(props) {
	const {
		defaultValue, name, required, ...typeaheadProps
	} = props;
	const [selectedCountry, setSelectedCountry] = useState(defaultValue);

	return (
		<>
			<Form.Control type="hidden" value={selectedCountry} name={name} />
			<Typeahead
				id={`${name}-country-typeahead`}
				labelKey={(country) => `${country.name} (${country.native})`}
				onChange={(value) => setSelectedCountry(value[0].name)}
				options={countries}
				defaultInputValue={defaultValue}
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
