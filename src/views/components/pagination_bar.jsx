import React from 'react';
import { Pagination } from 'react-bootstrap';

export const Pages = Object.freeze({
	PERSONAL_INFO: 'personal_info',
	MOBILITY_PROGRAM: 'mobility_program',
	HOME_INSTITUTION: 'home_institution',
	PURPOSE_OF_STAY: 'purpose_of_stay',
	LANGUAGES: 'languages',
});

const items = {
	[Pages.PERSONAL_INFO]: ['/application/form/personal-info', 'Personal details'],
	[Pages.MOBILITY_PROGRAM]: ['/application/form/program', 'Mobility program'],
	[Pages.HOME_INSTITUTION]: ['/application/form/home-institution', 'Home institution'],
	[Pages.PURPOSE_OF_STAY]: ['/application/form/purpose-of-stay', 'Purpose of stay'],
	[Pages.LANGUAGES]: ['/application/form/languages', 'Languages'],
};

export default function PaginationBar(props) {
	const { activePage } = props;

	const entries = Object.values(Pages).map((page) => {
		const [href, name] = items[page];

		return (
			<Pagination.Item
				className="flex-fill"
				href={href}
				key={page}
				active={page === activePage}
			>
				{name}
			</Pagination.Item>
		);
	});

	return (
		<Pagination className="d-flex mb-4">{entries}</Pagination>
	);
}
