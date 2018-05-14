/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_image_i18n', {
		announcement_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'announcement',
				key: 'announcement_id'
			}
		},
		language: {
			type: DataTypes.CHAR(50),
			allowNull: false,
			primaryKey: true
		},
		image_path: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true
		}
	}, {
		tableName: 'announcement_image_i18n',
		timestamps: false
	});
};
