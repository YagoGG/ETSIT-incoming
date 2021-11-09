import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Highlighter, Typeahead } from 'react-bootstrap-typeahead';

import languages from '../../static/languages.json';

import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function LanguageTypeahead(props) {
	const {
		defaultValue, name, required, ...typeaheadProps
	} = props;
	const [selectedLanguages, setSelectedLanguages] = useState(
		languages.filter((language) => language.name === defaultValue),
	);

	return (
		<>
			<Form.Control
				type="hidden"
				value={selectedLanguages[0] ? selectedLanguages[0].name : ''}
				name={name}
				required={required}
			/>
			<Typeahead
				id={`${name}-language-typeahead`}
				labelKey={(language) => `${language.name} (${language.native})`}
				onChange={setSelectedLanguages}
				options={languages}
				selected={selectedLanguages}
				inputProps={{ required }}
				placeholder="Choose a language..."
				highlightOnlyResult
				renderMenuItemChildren={(language, { text }) => (
					<>
						<Highlighter search={text}>{language.name}</Highlighter>
						<div><small>{language.native}</small></div>
					</>
				)}
				{...typeaheadProps}
			/>
		</>
	);
}
