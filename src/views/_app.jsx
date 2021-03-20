import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export default function App(props) {
	const { children, ...rest } = props;
	const PageComponent = children;

	return (
		<Container>
			<h1>ETSIT Incoming</h1>
			<PageComponent {...rest} />
		</Container>
	);
}
