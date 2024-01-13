'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('photo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      file_id: {
        type: Sequelize.INTEGER
      },
      alt: {
        type: Sequelize.STRING
      },
      caption: {
        type: Sequelize.TEXT
      },
      category: {
        type: Sequelize.ENUM('department_cover', 'user_photo', 'appreciation_cover', 'event_thumbnail', 'event_poster', 'event_banner')
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('photo');
  }
};