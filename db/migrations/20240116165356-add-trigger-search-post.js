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
      CREATE OR REPLACE FUNCTION update_search_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."search" = setweight(to_tsvector('indonesian', NEW."title"), 'A') || ' ' ||
                      setweight(to_tsvector('english', NEW."title"), 'B') || ' ' ||
                      setweight(to_tsvector('indonesian', NEW."content"), 'C') || ' ' ||
                      setweight(to_tsvector('english', NEW."content"), 'D') :: tsvector;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_search_trigger
      BEFORE INSERT ON "post"
      FOR EACH ROW
      EXECUTE FUNCTION update_search_column();
    `);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS update_search_trigger ON "post";
      DROP FUNCTION IF EXISTS update_search_column();
    `);
  }
};
