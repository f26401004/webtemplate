/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_i18n', {
		announcement_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		language: {
			type: DataTypes.CHAR(50),
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		}
	}, {
		tableName: 'announcement_i18n',
		timestamps: false
	});
};
