'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Document.belongsTo(models.File, {foreignKey: 'file_id', as: 'file'});
      Document.belongsTo(models.Post, {foreignKey: 'post_id', as: 'post', allowNull: true});
      Document.hasOne(models.User, {foreignKey: 'transcript_id', as: 'user_transcript'});
    }
  }
  Document.init({
    category: {
      type: DataTypes.ENUM('user_transcript', 'post_attachment'),
      allowNull: false
    },
    file_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Document',
    tableName: 'document',
    underscored: true,
    timestamps: true
  });
  return Document;
};