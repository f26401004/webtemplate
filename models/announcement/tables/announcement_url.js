/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_url', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		announcement_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'announcement_url',
		timestamps: false
	});
};
