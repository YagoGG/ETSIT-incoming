import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/styles.scss';
import { Alert, Container, Navbar } from 'react-bootstrap';

const ALERT_LEVEL_MAP = {
	error: 'danger',
	info: 'primary',
	warning: 'warning',
	success: 'success',
};

export default function App(props) {
	const { children, messages, ...rest } = props;
	const PageComponent = children;

	const alerts = Object.entries(messages).map(([type, values]) => (
		values.map((message, index) => (
			// eslint-disable-next-line react/no-array-index-key
			<Alert key={index} variant={ALERT_LEVEL_MAP[type]}>{message}</Alert>
		))
	)).flat();

	return (
		<>
			<header>
				<Container>
					<Navbar className="py-3">
						<Navbar.Brand href="/">
							<img
								alt="UPM logo"
								src="/static/images/logo_upm.gif"
								height="40"
								className="d-inline-block mt-2 align-top"
							/>
							<img
								alt="ETSIT-UPM logo"
								src="/static/images/logo_etsit.gif"
								height="40"
								className="d-inline-block align-top mt-2 mx-4"
							/>
							<div className="d-inline-block py-1">
								<span className="title d-block">
									Escuela Técnica Superior de Ingenieros de
									Telecomunicación
								</span>
								<span className="subtitle d-block">
									Universidad Politécnica de Madrid
								</span>
							</div>
						</Navbar.Brand>
					</Navbar>
				</Container>
			</header>
			<Container className="my-5">
				{alerts}
				<PageComponent {...rest} />
			</Container>
		</>
	);
}
