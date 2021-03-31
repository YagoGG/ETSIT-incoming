const { SequelizeValidationError } = require('sequelize');
const { sequelize, User } = require('../../models');

describe('User model - creation', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	it('should succeed when correct data is passed', async () => {
		await expect(User.create({
			email: 'foo@example.com',
			password: 'p@ssw0rd',
		})).resolves.toBeInstanceOf(User);
	});

	it('should throw a SequelizeValidationError when no email is passed', async () => {
		await expect(User.create({
			password: 'p@ssw0rd',
		})).rejects.toThrow(SequelizeValidationError);
	});

	it('should throw a SequelizeValidationError when an invalid email is passed', async () => {
		await expect(User.create({
			email: 'foobar',
		})).rejects.toThrow(SequelizeValidationError);
	});

	it('should throw a SequelizeValidationError when no password is passed', async () => {
		await expect(User.create({
			email: 'foo@example.com',
		})).rejects.toThrow(SequelizeValidationError);
	});

	afterAll(async () => {
		await sequelize.close();
	});
});
