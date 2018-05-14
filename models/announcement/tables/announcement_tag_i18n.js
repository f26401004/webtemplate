/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_tag_i18n', {
		tag_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		language: {
			type: DataTypes.CHAR(50),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.CHAR(50),
			allowNull: false
		}
	}, {
		tableName: 'announcement_tag_i18n',
		timestamps: false
	});
};
