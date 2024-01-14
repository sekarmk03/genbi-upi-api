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
   await queryInterface.bulkInsert('department', [
    {
      name: "CEO",
      cover_id: null,
      description: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Administration",
      cover_id: null,
      description: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Finance",
      cover_id: null,
      description: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Marketing",
      cover_id: null,
      description: "Membangun citra positif organisasi melalui pengelolaan media sosial GenBi UPI sebagai media informasi dan komunikasi. Terdiri dari 2 divisi, yaitu Creative Division dan ABC Division.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Economic",
      cover_id: null,
      description: "Departemen Ekonomic GenBI UPI merupakan departemen yang berperan dalam memfasilitasi internal GenBI UPI maupun masyarakat umum dalam hal-hal yang berkaitan dengan bidang ekonomi, seperti investasi, bisnis UKM dan berita-berita ekonomi lainnya.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Healthcare",
      cover_id: null,
      description: "Healthcare department merupakan departemen yang berfokus pada bidang kesehatan. Healthcare departemen bertanggung jawab untuk menyelenggarakan program yang berhubungan dengan kesehatan fisik dan kesejahteraan mental para anggota GenBI UPI",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Public Relation",
      cover_id: null,
      description: "Membangun awareness dan menjembatani komunikasi asertif dengan para pihak internal dan eksternal GenBI UPI.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Human Resources",
      cover_id: null,
      description: "Departemen Human Resources adalah departemen yang berfokus pada pengembangan internal anggota GenBI UPI.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Education",
      cover_id: null,
      description: "Education Department merupakan departemen yang berfokus kepada edukasi, baik mengenai BI maupun mengenai pengetahuan umum kepada anggota genBI dan masyarakat luas. Selain, itu Education juga berperan dalam menumbuhkan kepedulian anggota genBI terhadap peranan pendidikan.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Social & Environment",
      cover_id: null,
      description: "SOCEN merupakan departemen yang melaksanakan aksi-aksi atau kegiatan yang berhubungan dengan sosial masyarakat dan lingkungan.",
      created_at: new Date(),
      updated_at: new Date(),
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
    await queryInterface.bulkDelete('department', null, {});
  }
};
