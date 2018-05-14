/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_file_i18n', {
		announcement_id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		language: {
			type: DataTypes.STRING(45),
			allowNull: false,
			primaryKey: true
		},
		file_path: {
			type: DataTypes.STRING(45),
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'announcement_file_i18n',
		timestamps: false
	});
};
