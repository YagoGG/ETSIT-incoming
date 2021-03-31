/**
 * @jest-environment node
 */
const request = require('supertest');
const app = require('../../app');
const { sequelize, User } = require('../../models');
const { ErrorMessage } = require('../../utils/message');
const { interceptJSXRenderProps } = require('../utils');

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
			.expect(200)
			.expect((res) => {
				expect(res.body.view).toEqual('index');
				expect(res.body.props).not.toHaveProperty('messages');
			});
	});

	afterAll(async () => {
		await sequelize.close();
	});
});
