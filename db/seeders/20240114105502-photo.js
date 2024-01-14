'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('photo', [
    {
      file_id: 1,
      alt: 'avatar-default1.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 2,
      alt: 'avatar-default2.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 3,
      alt: 'avatar-default3.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_id: 4,
      alt: 'avatar-default4.jpg',
      caption: null,
      category: 'awardee_photo',
      featured: false,
      post_id: null,
      created_at: new Date(),
      updated_at: new Date()
    },
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('photo', null, {});
  }
};
