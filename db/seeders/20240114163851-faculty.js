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
   await queryInterface.bulkInsert('faculty', [
    {
      name: "Fakultas Ilmu Pendidikan",
      abbr: "FIP",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Bahasa dan Sastra",
      abbr: "FPBS",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Ekonomi dan Bisnis",
      abbr: "FPEB",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Ilmu Pengetahuan Sosial",
      abbr: "FPIPS",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam",
      abbr: "FPMIPA",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Olahraga dan Kesehatan",
      abbr: "FPOK",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Seni dan Desain",
      abbr: "FPSD",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fakultas Pendidikan Teknologi dan Kejuruan",
      abbr: "FPTK",
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
    await queryInterface.bulkDelete('faculty', null, {});
  }
};
