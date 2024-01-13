'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Post, {foreignKey: 'event_id', as: 'posts'});
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'Offline', 'Hybrid'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Coming Soon', 'Open Registration', 'Closed Registration', 'Ongoing', 'Finished'),
      allowNull: false
    },
    thumbnail_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    poster_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    banner_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_url: DataTypes.STRING,
    registration_link: DataTypes.STRING,
    contact: DataTypes.STRING,
    tag1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING,
    tag4: DataTypes.STRING,
    tag5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'event',
    underscored: true,
    timestamps: true
  });
  return Event;
};