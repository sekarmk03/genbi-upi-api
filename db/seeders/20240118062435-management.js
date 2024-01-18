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
   await queryInterface.bulkInsert('management', [
    {
      name: 'GenBI UPI 2023-2024',
      photo_id: 26,
      video_id: 25,
      description: `<p>GenBI UPI merupakan komunitas penerima beasiswa Bank Indonesia di Universitas Pendidikan Indonesia yang telah aktif sejak 2019. Dalam menjalankan tugas dan kewajiban, kepengurusan GenBI UPI terbagi kedalam kepengurusan yang terdiri dari Executive Officer dan Departement. Adapun departement di GenBI UPI 23.24 adalah sebagai berikut :</p>
      <ol>
        <li>Departement Marketing</li>
        <li>Departement Economic</li>
        <li>Departement Healthcare</li>
        <li>Departement Public Relation</li>
        <li>Departement Human Resource</li>
        <li>Departement Education</li>
      </ol>
      <p>GenBI UPI berkomitmen untuk mencakup beragam bidang seperti ekonomi, pendidikan, kesehatan, sosial, dan lingkungan dengan mengadakan berbagai program kerja sesuai dengan bidang setiap depertement.</p>
      `,
      vision: 'GenBI sebagai wadah eksplorasi diri serta menjadi mediator BI untuk menyebarkan kebermanfaatan kepada masyarakat.',
      mission: ['Menciptakan lingkungan GenBI yang supportif terhadap gagasan baru.', 'Mempererat hubungan antar anggota.', 'Bergerak adaptif dan optimal dalam memanfaatkan potensi perkembangan zaman.', 'Siap dan selaras menyuarakan kebijakan Bank Indonesia kepada masyarakat.'],
      period_year: '23.24',
      period_start_date: new Date(),
      period_end_date: new Date(),
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('management', null, {});
  }
};
