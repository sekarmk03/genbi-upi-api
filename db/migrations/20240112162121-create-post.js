'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('article', 'press release', 'report', 'news'),
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      department_id: {
        type: Sequelize.INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER
      },
      featured: {
        type: Sequelize.BOOLEAN
      },
      visitors: {
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER
      },
      tag1: {
        type: Sequelize.STRING
      },
      tag2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag4: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tag5: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('post');
  }
};