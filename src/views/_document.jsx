import { Document, Head, Main } from '@react-ssr/express';
import React from 'react';

export default class extends Document {
	render() {
		return (
			<html lang="en">
				<Head>
					<title>ETSIT Erasmus Incoming</title>
				</Head>
				<body>
					<Main />
				</body>
			</html>
		);
	}
}
