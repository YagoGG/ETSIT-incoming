import Sequelize from 'sequelize';

import { User } from '../../models';
import sequelize from '../../models/db';

const { SequelizeValidationError } = Sequelize;

describe('User model - creation', () => {
	beforeAll(async () => {
		await sequelize.sync({ force: true });
	});

	it('should succeed when correct data is passed', async () => {
		const user = await User.create({
			email: 'foo@example.com',
			password: 'p@ssw0rd',
		});
		await expect(user).toBeInstanceOf(User);
		await expect(user).toHaveProperty('role', User.STUDENT_ROLE);
		await expect(user).toHaveProperty('temporaryPassword', false);
	});

	it('should throw a SequelizeValidationError if the email is not unique', async () => {
		const userData = {
			email: 'someuser@example.com',
			password: 'p@ssw0rd',
		};
		await expect(User.create(userData)).resolves.toBeInstanceOf(User);
		await expect(User.create(userData)).rejects.toThrow(SequelizeValidationError);
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
