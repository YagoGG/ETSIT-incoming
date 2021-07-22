/**
 * @jest-environment node
 */
import request from 'supertest';

import app from '../../app';
import { User } from '../../models';
import sequelize from '../../models/db';
import interceptJSXRenderProps from '../prop_interceptor';

describe('auth controller', () => {
	interceptJSXRenderProps(app);
	const agent = request.agent(app).set('Referer', '/login');
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
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'"email" is required',
					'"password" is required',
				]);
			});

		await agent
			.post('/login')
			.send('email=')
			.send('password=')
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'"email" is not allowed to be empty',
					'"password" is not allowed to be empty',
				]);
			});

		await agent
			.post('/login')
			.send('email=')
			.send('password=bar')
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'"email" is not allowed to be empty',
				]);
			});

		await agent
			.post('/login')
			.send('email=foo@example.com')
			.send('password=')
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'"password" is not allowed to be empty',
				]);
			});
	});

	it('should reject invalid emails with matching message', async () => {
		await agent
			.post('/login')
			.send('email=foo@example.com')
			.send('password=bar')
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'Incorrect email/password combination',
				]);
			});
	});

	it('should reject invalid passwords with matching message', async () => {
		await agent
			.post('/login')
			.send(`email=${USER.email}`)
			.send('password=bar')
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					'Incorrect email/password combination',
				]);
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

	it('should reject logins for users not yet registered', async () => {
		const UNREGISTERED_USER = {
			email: 'unreg@domain.com',
			password: '123e4567-e89b-12d3-a456-426614174000',
			temporaryPassword: true,
		};

		await User.create(UNREGISTERED_USER);

		await agent
			.post('/login')
			.send(`email=${UNREGISTERED_USER.email}`)
			.send(`password=${UNREGISTERED_USER.password}`)
			.redirects()
			.expect(200)
			.expect((res) => {
				const { messages } = res.body.props;
				expect(res.body.view).toEqual('login');
				expect(messages.error).toEqual([
					`This user has not registered yet. Please check
                    your email for the registration link`,
				]);
			});
	});

	afterAll(async () => {
		await sequelize.close();
	});
});
