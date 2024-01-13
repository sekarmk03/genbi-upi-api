'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Photo, {foreignKey: 'photo_id', as: 'photo'});
      User.belongsTo(models.Division, {foreignKey: 'division_id', as: 'division'});
      User.belongsTo(models.Position, {foreignKey: 'position_id', as: 'position'});
      User.belongsTo(models.StudyProgram, {foreignKey: 'study_program_id', as: 'study_program'});
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    linkedin_username: DataTypes.STRING,
    instagram_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telp: DataTypes.STRING,
    member_since: DataTypes.DATEONLY,
    division_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scholarship: DataTypes.INTEGER,
    nim: DataTypes.STRING,
    study_program_id: DataTypes.INTEGER,
    year: DataTypes.STRING,
    smt1_grade: DataTypes.DECIMAL(4, 2),
    smt2_grade: DataTypes.DECIMAL(4, 2),
    smt3_grade: DataTypes.DECIMAL(4, 2),
    smt4_grade: DataTypes.DECIMAL(4, 2),
    smt5_grade: DataTypes.DECIMAL(4, 2),
    smt6_grade: DataTypes.DECIMAL(4, 2),
    smt7_grade: DataTypes.DECIMAL(4, 2),
    smt8_grade: DataTypes.DECIMAL(4, 2),
    transcript_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    underscored: true,
    timestamps: true
  });
  return User;
};