import Application from './application';
import User from './user';

User.Application = User.hasOne(Application, {
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: 'userId',
});
Application.belongsTo(User, { foreignKey: 'userId' });

export { Application, User };
