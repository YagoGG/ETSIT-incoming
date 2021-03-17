import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Head } from '@react-ssr/express';
import React from 'react';

export default function App() {
	return (
		<>
			<Head>
				<title>ETSIT Erasmus Incoming</title>
			</Head>
			<Container>
				<h1>Home</h1>
			</Container>
		</>
	);
}
