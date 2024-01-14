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
   await queryInterface.bulkInsert('study_program', [
    { // 1
      name: "Administrasi Pendidikan",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Bimbingan dan Konseling",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Masyarakat",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Khusus",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Teknologi Pendidikan",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Guru Sekolah Dasar",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Guru Pendidikan Anak Usia Dini",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Perpustakaan dan Sains Informasi",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Psikologi",
      faculty_id: 1,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa dan Sastra Indonesia",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 11
      name: "Pendidikan Bahasa Sunda",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Inggris",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Arab",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Jepang",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Jerman",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Perancis",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Bahasa Korea",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Bahasa dan Sastra Inggris",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Bahasa dan Sastra Indonesia",
      faculty_id: 2,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Akuntansi",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 21
      name: "Pendidikan Bisnis",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Manajemen Perkantoran",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Ekonomi",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Manajemen",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Akuntansi",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Ilmu Ekonomi dan Keuangan Islam",
      faculty_id: 3,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Kewarganegaraan",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Sejarah",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Geografi",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 31
      name: "Ilmu Pendidikan Agama Islam",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Ilmu Pengetahuan Sosial",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Sosiologi",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Pariwisata",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Manajemen Resort dan Leisure",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Manajemen Pemasaran Pariwisata",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Manajemen Industri Katering",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Sains Informasi Geografi",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Ilmu Komunikasi",
      faculty_id: 4,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Matematika",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 41
      name: "Pendidikan Fisika",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Biologi",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Kimia",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Ilmu Komputer",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Matematika",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Fisika",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Biologi",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Kimia",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Ilmu Komputer",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "International Program on Science Education",
      faculty_id: 5,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 51
      name: "Pendidikan Kepelatihan Olahraga",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Jasmani, Kesehatan, dan Rekreasi",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Guru Sekolah Dasar Pendidikan Jasmani",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Ilmu Keolahragaan",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Keperawatan dan Pendidikan Profesi Ners",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Kepelatihan Fisik Olahraga",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Gizi",
      faculty_id: 6,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Seni Rupa",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Seni Tari",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Seni Musik",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 61
      name: "Desain Komunikasi Visual",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Film dan Televisi",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Musik",
      faculty_id: 7,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknik Arsitektur",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Arsitektur",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknik Bangunan",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknik Elektro",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Teknik Elektro",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Teknik Sipil",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Teknik Logistik",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    { // 71
      name: "Pendidikan Teknik Mesin",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Kesejahteraan Keluarga",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Tata Boga",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Tata Busana",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknologi Agroindustri",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknik Otomotif",
      faculty_id: 8,
      jenjang: "S1",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Pendidikan Teknik Otomasi Industri dan Robotika",
      faculty_id: 8,
      jenjang: "S1",
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
    await queryInterface.bulkDelete('study_program', null, {});
  }
};
