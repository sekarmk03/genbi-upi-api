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
      Event.belongsTo(models.Photo, {foreignKey: 'thumbnail_id', as: 'thumbnail'});
      Event.belongsTo(models.Photo, {foreignKey: 'poster_id', as: 'poster'});
      Event.belongsTo(models.Photo, {foreignKey: 'banner_id', as: 'banner'});
      Event.belongsTo(models.Program, {foreignKey: 'program_id', as: 'program'});
      Event.hasMany(models.Post, {foreignKey: 'event_id', as: 'posts'});
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
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
    start_reg_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_reg_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
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