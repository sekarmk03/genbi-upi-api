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
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visitors: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tag1: {
        type: Sequelize.STRING,
        allowNull: false
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
      search: {
        allowNull: true,
        type: Sequelize.TSVECTOR
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

    await queryInterface.sequelize.query(`
      UPDATE "post" SET
        "search" = setweight(to_tsvector('indonesian', "title"), 'A') || ' ' ||
        setweight(to_tsvector('english', "title"), 'B') || ' ' ||
        setweight(to_tsvector('indonesian', "content"), 'C') || ' ' ||
        setweight(to_tsvector('english', "content"), 'D') :: tsvector;
    `);

    await queryInterface.addIndex('post', {
      fields: ['search'],
      using: 'GIN',
      name: 'idx_search',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('post', 'idx_search');
    await queryInterface.dropTable('post');
  }
};