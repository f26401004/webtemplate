/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('announcement_tag', {
		announcement_id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		tag_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'announcement_tag_i18n',
				key: 'tag_id'
			}
		}
	}, {
		tableName: 'announcement_tag',
		timestamps: false
	});
};
