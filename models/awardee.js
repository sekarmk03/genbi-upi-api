'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Awardee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Awardee.belongsTo(models.User, {foreignKey: 'user_id', as: 'user_account'});
      Awardee.belongsTo(models.Photo, {foreignKey: 'photo_id', as: 'photo'});
      // Awardee.belongsTo(models.Department, {foreignKey: 'department_id', as: 'department'});
      // Awardee.belongsTo(models.Division, {foreignKey: 'division_id', as: 'division'});
      // Awardee.belongsTo(models.Position, {foreignKey: 'position_id', as: 'position'});
      Awardee.belongsTo(models.StudyProgram, {foreignKey: 'study_program_id', as: 'study_program'});
      Awardee.belongsTo(models.Document, {foreignKey: 'transcript_id', as: 'transcript'});
      Awardee.hasMany(models.AwardeeManagement, {foreignKey: 'awardee_id', as: 'awardee_managements'});
    }
  }
  Awardee.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    },
    linkedin_username: DataTypes.STRING,
    instagram_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telp: DataTypes.STRING,
    member_since: DataTypes.DATEONLY,
    scholarship: DataTypes.INTEGER,
    nim: DataTypes.STRING,
    study_program_id: DataTypes.INTEGER,
    year: DataTypes.STRING,
    smt1_ip: DataTypes.DECIMAL(4, 2),
    smt2_ip: DataTypes.DECIMAL(4, 2),
    smt3_ip: DataTypes.DECIMAL(4, 2),
    smt4_ip: DataTypes.DECIMAL(4, 2),
    smt5_ip: DataTypes.DECIMAL(4, 2),
    smt6_ip: DataTypes.DECIMAL(4, 2),
    smt7_ip: DataTypes.DECIMAL(4, 2),
    smt8_ip: DataTypes.DECIMAL(4, 2),
    smt1_ipk: DataTypes.DECIMAL(4, 2),
    smt2_ipk: DataTypes.DECIMAL(4, 2),
    smt3_ipk: DataTypes.DECIMAL(4, 2),
    smt4_ipk: DataTypes.DECIMAL(4, 2),
    smt5_ipk: DataTypes.DECIMAL(4, 2),
    smt6_ipk: DataTypes.DECIMAL(4, 2),
    smt7_ipk: DataTypes.DECIMAL(4, 2),
    smt8_ipk: DataTypes.DECIMAL(4, 2),
    transcript_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Awardee',
    tableName: 'awardee',
    underscored: true,
    timestamps: true
  });
  return Awardee;
};