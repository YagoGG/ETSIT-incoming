import Application from './application';
import MobilityProgram from './mobility_program';
import User from './user';

User.Application = User.hasOne(Application, {
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: 'userId',
});
Application.belongsTo(User, { foreignKey: 'userId' });
Application.MobilityProgram = Application.belongsTo(MobilityProgram, {
	onDelete: 'RESTRICT',
	onUpdate: 'RESTRICT',
	foreignKey: 'mobilityProgramId',
});
MobilityProgram.hasMany(Application, { foreignKey: 'mobilityProgramId' });

export {
	Application, MobilityProgram, User,
};
