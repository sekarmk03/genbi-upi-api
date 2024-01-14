'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudyProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudyProgram.belongsTo(models.Faculty, {foreignKey: 'faculty_id', as: 'faculty'});
      StudyProgram.hasMany(models.Awardee, {foreignKey: 'study_program_id', as: 'awardees'});
    }
  }
  StudyProgram.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    faculty_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jenjang: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'StudyProgram',
    tableName: 'study_program',
    underscored: true,
    timestamps: true
  });
  return StudyProgram;
};