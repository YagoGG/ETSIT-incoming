/**
 * @jest-environment node
 */
import request from 'supertest';
import app from '../../app';
import { User } from '../../models';
import sequelize from '../../models/db';
import { ErrorMessage } from '../../utils/message';
import { interceptJSXRenderProps } from '../utils';

describe('auth controller', () => {
	interceptJSXRenderProps(app);
	const agent = request.agent(app);
	const USER = {
		email: 'user1@domain.com',
		name: 'John Doe',
		password: 's3cr3t',
	};

	beforeAll(async () => {
		await sequelize.sync({ force: true });
		await User.create(USER);
	});

	it('should redirect to /login when visiting / unauthenticated', async () => {
		await agent
			.get('/')
			.expect(302)
			.expect('Location', '/login');
	});

	it('should reject missing credentials with matching message', async () => {
		await agent
			.post('/login')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Missing credentials'));
			});

		await agent
			.post('/login')
			.send('email=')
			.send('password=')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Missing credentials'));
			});

		await agent
			.post('/login')
			.send('email=')
			.send('password=bar')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Missing credentials'));
			});

		await agent
			.post('/login')
			.send('email=foo@example.com')
			.send('password=')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Missing credentials'));
			});
	});

	it('should reject invalid emails with matching message', async () => {
		await agent
			.post('/login')
			.send('email=foo@example.com')
			.send('password=bar')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Incorrect email'));
			});
	});

	it('should reject invalid passwords with matching message', async () => {
		await agent
			.post('/login')
			.send(`email=${USER.email}`)
			.send('password=bar')
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages).toHaveLength(1);
				expect(messages[0]).toEqual(new ErrorMessage('Incorrect password'));
			});
	});

	it('should accept valid credentials', async () => {
		await agent
			.post('/login')
			.send(`email=${USER.email}`)
			.send(`password=${USER.password}`)
			.expect(302)
			.expect('Location', '/');
	});

	afterAll(async () => {
		await sequelize.close();
	});
});
