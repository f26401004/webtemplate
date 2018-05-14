/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement', {
		announcement_id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		time: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		author_account: {
			type: DataTypes.CHAR(50),
			allowNull: false
		},
		hit: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		}
	}, {
		tableName: 'announcement',
		timestamps: false
	});
};
