'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventParticipant.belongsTo(models.Event, {foreignKey: 'event_id', as: 'event'});
    }
  }
  EventParticipant.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    institution: DataTypes.STRING,
    role: DataTypes.STRING,
    field: DataTypes.STRING,
    telp: DataTypes.STRING,
    city: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'EventParticipant',
    tableName: 'event_participant',
    underscored: true,
    timestamps: true
  });
  return EventParticipant;
};