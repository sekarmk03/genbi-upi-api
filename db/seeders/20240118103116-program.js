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
   await queryInterface.bulkInsert('program', [
    {
      name: "GenBI Awarding",
      description: "Memberikan apresiasi best manager, best leader, best staff.",
      type: "Monthly",
      implementation_desc: "Tanggal 7 disetiap bulan selama 1 Periode (Januari - Oktober)",
      department_id: 2,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Birthday",
      description: "Mengucapkan hari ulang tahun warga GenBI UPI",
      type: "Monthly",
      implementation_desc: "1 Periode (Januari - Oktober) menyesuaikan tanggal lahir",
      department_id: 2,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Kabar GenBI",
      description: "Memberikan informasi hari besar dan kabar duka.",
      type: "Conditional",
      implementation_desc: "1 Periode (Januari - Oktober) menyesuaikan tanggal hari besar atau berita duka",
      department_id: 2,
      management_id: 1,
      date_start: '2023-12-01',
      date_end: '2024-11-30',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Website GenBI",
      description: "Membuat website sebagai sumber penyebaran informasi dari GenBI UPI.",
      type: "Weekly",
      implementation_desc: "1 Periode (Januari - Oktober)",
      department_id: 2,
      management_id: 1,
      date_start: '2024-01-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Info & Tips",
      description: "Memberikan informasi tips beasiswa dan tips tentang bank indonesia.",
      type: "Conditional",
      implementation_desc: "1 Periode (Januari - Oktober) menyesuaikan tanggal yang telah disepakati",
      department_id: 2,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Sharing",
      description: "Memberikan informasi tentang kegiatan GenBI UPI.",
      type: "Conditional",
      implementation_desc: "1 Periode (Januari - Oktober) menyesuaikan tanggal pelaksanaan acara atau kegiatan",
      department_id: 2,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Bangga",
      description: "Memberikan apresiasi terkait pencapaian warga genbi upi, misalnya juara lomba & graduation.",
      type: "Monthly",
      implementation_desc: "Tanggal 28 setiap bulan selama 1 Periode (Januari - Oktober)",
      department_id: 2,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pelatihan",
      description: "Mengadakan pelatihan graphic design & copywriting sekaligus perayaan hari desain grafis dunia.",
      type: "Annually",
      implementation_desc: "Tanggal 27 April 2024",
      department_id: 2,
      management_id: 1,
      date_start: '2024-04-27',
      date_end: '2024-04-27',
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
    await queryInterface.bulkDelete('program', null, {});
  }
};
