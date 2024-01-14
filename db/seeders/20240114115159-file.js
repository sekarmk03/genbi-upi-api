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
   await queryInterface.bulkInsert('file', [
    {
      file_name: "avatar1.jpg",
      imagekit_id: "65a3c26988c257da33ca9458",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar1.jpg",
      imagekit_path: "/genbi_upi/avatar1.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar3.jpg",
      imagekit_id: "65a3c26988c257da33ca952c",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar3.jpg",
      imagekit_path: "/genbi_upi/avatar3.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar2.jpg",
      imagekit_id: "65a3c26988c257da33ca945d",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar2.jpg",
      imagekit_path: "/genbi_upi/avatar2.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "avatar4.jpg",
      imagekit_id: "65a3c26988c257da33ca94f5",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/avatar4.jpg",
      imagekit_path: "/genbi_upi/avatar4.jpg",
      mimetype: "image/jpeg",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "sample1.pdf",
      imagekit_id: "65a3c2a588c257da33cb95e0",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/sample1.pdf",
      imagekit_path: "/genbi_upi/sample1.pdf",
      mimetype: "application/pdf",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      file_name: "sample2.pdf",
      imagekit_id: "65a3c32088c257da33cc996e",
      imagekit_url: "https://ik.imagekit.io/sekarmadu/genbi_upi/sample2.pdf",
      imagekit_path: "/genbi_upi/sample2.pdf",
      mimetype: "application/pdf",
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
    await queryInterface.bulkDelete('file', null, {});
  }
};
