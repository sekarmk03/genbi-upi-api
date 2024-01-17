'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
      UPDATE "post" SET
        "search" = setweight(to_tsvector('indonesian', "title"), 'A') || ' ' ||
        setweight(to_tsvector('english', "title"), 'B') || ' ' ||
        setweight(to_tsvector('indonesian', "content"), 'C') || ' ' ||
        setweight(to_tsvector('english', "content"), 'D') :: tsvector;
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
