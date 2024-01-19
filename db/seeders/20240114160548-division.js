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
   await queryInterface.bulkInsert('division', [
    {
      name: "CEO",
      department_id: 1,
      description: "",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Administration",
      department_id: 1,
      description: "",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Finance",
      department_id: 1,
      description: "",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Creative",
      department_id: 2,
      description: "Divisi yang bertugas untuk mengelola sosial media dan website GenBi UPI",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "ABC",
      department_id: 2,
      description: "Divisi yang bertugas membuat konten yang diperlukan untuk publikasi di sosial media dan website GenBi UPI",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Business",
      department_id: 3,
      description: "Divisi yang berfokus pada wirausaha atau melakukan penjualan di bidang F&B.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Event",
      department_id: 3,
      description: "Divisi yang berfokus untuk mengadakan rangkaian kegiatan yang berfokus pada investasi, ekonomi dan wirausaha.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Physical Health",
      department_id: 4,
      description: "berfokus pada kesehatan fisik",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Mental Health",
      department_id: 4,
      description: "berfokus pada kesehatan mental",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Internal",
      department_id: 5,
      description: "Menjalin komunikasi internal yang persuasif dan interaktif di lingkungan GENBI UPI.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "External",
      department_id: 5,
      description: "Membangun awareness dan menjalin komunikasi yang positif dengan para stakeholder eksternal GENBI UPI.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Research & Development",
      department_id: 6,
      description: "Divisi yang berfokus pada penilaian dan monitoring anggota GenBI UPI.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Event",
      department_id: 6,
      description: "Divisi yang berfokus  untuk membuat acara kegiatan yang berfokus pada bonding anggota.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "EduAction",
      department_id: 7,
      description: "Divisi ini berfokus kepada gerak nyata untuk mengedukasi masyarakat luas dengan berbagai program yang dijalankannya.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "EduContent",
      department_id: 7,
      description: "Divisi ini berfokus kepada penyajian konten edukasi melalui berbagai media, dari sosial media hingga webinar dengan tujuan pencerdasan.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Social",
      department_id: 8,
      description: "Divisi yang mengutamakan kegiatan sosial yang lebih fokus dan peka terhadap masyarakat tedekat atau sekitar yang mana akan memberikan dampak atau bantuan yang bermakna.",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Environment",
      department_id: 8,
      description: "Divisi yang akan selalu sadar dengan lingkungan sekitar dan bisa membawa perubahan untuk membantu menjaganya agar tetap lestari dan indah.",
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
     * await queryInterface.bulkDelete('People', "", {});
     */
    await queryInterface.bulkDelete('division', "", {});
  }
};
