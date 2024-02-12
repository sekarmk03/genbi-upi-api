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
    {
      name: "Gemil",
      description: "Melakukan penjualan atau berwirausaha di bidang F&B",
      type: "Biweekly",
      implementation_desc: "Setiap 2 minggu sekali",
      department_id: 3,
      management_id: 1,
      date_start: '2024-03-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Isu Ekonomi",
      description: "Mengkaji isu ekonomi untuk postingan & event ekonomi terkait isu ekonomi",
      type: "Monthly",
      implementation_desc: "Postingan per bulan dan event 26 April 2024",
      department_id: 3,
      management_id: 1,
      date_start: '2024-03-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Investment School",
      description: "Mengadakan seminar terkait bagaimana cara berinvestasi",
      type: "Annually",
      implementation_desc: "Bulan Juni 2024",
      department_id: 3,
      management_id: 1,
      date_start: '2024-06-01',
      date_end: '2024-06-30',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Go Entrepreneur",
      description: "Mengadakan pelatihan terkait bagaimana cara berwirausaha",
      type: "Annually",
      implementation_desc: "Bulan Juni 2024",
      department_id: 3,
      management_id: 1,
      date_start: '2024-06-01',
      date_end: '2024-06-30',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "KESATRIA (Kesehatan Trivia)",
      description: "Memberikan informasi mengenai kesehatan fisik dan mental melalui media sosial GenBI UPI",
      type: "Monthly",
      implementation_desc: "1 kali dalam satu bulan (setiap tanggal 20)",
      department_id: 4,
      management_id: 1,
      date_start: '2024-01-20',
      date_end: '2024-10-20',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Healthcare Talk",
      description: "Podcast kesehatan bersama narasumber di Youtube GenBI",
      type: "Annually",
      implementation_desc: "2 kali dalam satu periode (September dan Oktober)",
      department_id: 4,
      management_id: 1,
      date_start: '2024-09-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Healthcare Talkshow",
      description: "Seminar Kesehatan offline sekaligus mengadakan pemeriksaan kesehatan gratis",
      type: "Annually",
      implementation_desc: "1 kali dalam satu periode (Jadwal disesuaikan dengan program GT GenBI UPI 2024)",
      department_id: 4,
      management_id: 1,
      date_start: '2024-07-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Sportif",
      description: "Olahraga bersama anggota GenBI UPI",
      type: "Monthly",
      implementation_desc: "2 bulan 1 kali",
      department_id: 4,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "HECOM (Healthcare Competition)",
      description: "Kompetisi menulis Essay online dengan tema kesehatan",
      type: "Annually",
      implementation_desc: "1 kali dalam satu periode (Bulan Agustus 2024)",
      department_id: 4,
      management_id: 1,
      date_start: '2024-08-01',
      date_end: '2024-08-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "SAPA GenBI",
      description: "Salam aspirasi GenBI UPI melalui konten interaktif di Instastory.",
      type: "Monthly",
      implementation_desc: "Februari - Agustus 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-03-01',
      date_end: '2024-08-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Parade PR",
      description: "Kegiatan pelatihan diri dan pengembangan karir bagi internal GenBI UPI.",
      type: "Annually",
      implementation_desc: "Maret - Agustus 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-03-01',
      date_end: '2024-08-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Connection",
      description: "Membangun brand awareness dan memperluas koneksi melalui optimalisasi Linkedin Genbi UPI.",
      type: "Monthly",
      implementation_desc: "Februari - Oktober 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Press Release",
      description: "Mempublikasikan kegiatan GENBI UPI dalam bentuk berita yang bernilai tinggi.",
      type: "Conditional",
      implementation_desc: "Februari - Oktober 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "BIS Goes To Campus",
      description: "Sosialisasi Beasiswa Bank Indonesia kepada para mahasiswa UPI.",
      type: "Annually",
      implementation_desc: "Februari - Mei 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-05-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "PROVINSI",
      description: "PR Visit National Company atau Kunjungan ke perusahaan yang bermitra dengan GENBI UPI.",
      type: "Annually",
      implementation_desc: "Juni 2024",
      department_id: 5,
      management_id: 1,
      date_start: '2024-06-01',
      date_end: '2024-06-30',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Studi Banding",
      description: "Silaturahmi serta belajar bersama Genbi Komisariat lain",
      type: "Annually",
      implementation_desc: "1x dalam 1 kepengurusan",
      department_id: 6,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Sport Day",
      description: "Olahraga bersama anggota GenBI UPI",
      type: "Monthly",
      implementation_desc: "2 bulan sekali",
      department_id: 6,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Mengedukasi",
      description: "Memberikan pengalaman belajar  menyenangkan literasi dan numerasi bagi anak jalanan",
      type: "Annually",
      implementation_desc: "1 kali dalam periode (27 April 2024)",
      department_id: 7,
      management_id: 1,
      date_start: '2024-04-27',
      date_end: '2024-04-27',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "SOFEL (Socialization of Financial Literation)",
      description: "Mengedukasi masyarakat umum mengenai literasi keuangan dan implementasinya dalam kehidupan sehari-hari",
      type: "Annually",
      implementation_desc: "1 kali dalam periode (6 Juli 2024)",
      department_id: 7,
      management_id: 1,
      date_start: '2024-07-06',
      date_end: '2024-07-06',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "SharEdu",
      description: "Memberikan informasi seputar pendidikan melalui akun instagram genBI",
      type: "Monthly",
      implementation_desc: "Minggu ke-3 setiap bulan",
      department_id: 7,
      management_id: 1,
      date_start: '2024-02-01',
      date_end: '2024-10-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "BI Talk",
      description: "Edukasi mengenai kebijakan BI, karir di BI, dan juga lomba poster terkait kebijakan tersebut.",
      type: "Annually",
      implementation_desc: "1 kali dalam periode (31 Agustus 2024)",
      department_id: 7,
      management_id: 1,
      date_start: '2024-08-31',
      date_end: '2024-08-31',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Go Green Tote Trade",
      description: "Edukasi dan Penukaran Santong plastik dengan Totebag atau Tumblr",
      type: "Annually",
      implementation_desc: "25 Februari 2024",
      department_id: 8,
      management_id: 1,
      date_start: '2024-02-25',
      date_end: '2024-02-25',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Clean Up Day",
      description: "Kegiatan membersihkan lingkungan yang tercemar oleh sampah",
      type: "Annually",
      implementation_desc: "1 Juni 2024",
      department_id: 8,
      management_id: 1,
      date_start: '2024-06-01',
      date_end: '2024-06-01',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Growth Together",
      description: "Pengabdian Kepada Masyarakat untuk membantu desa yang tertinggal agar desa tersebut dapat berkembang.",
      type: "Annually",
      implementation_desc: "26 - 28 Juli 2024",
      department_id: 8,
      management_id: 1,
      date_start: '2024-07-26',
      date_end: '2024-07-28',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Peduli",
      description: "Membantu masyarakat yang terkena bencana alam",
      type: "Conditional",
      implementation_desc: "Menyesuaikan tanggal bila ada bencana alam",
      department_id: 8,
      management_id: 1,
      date_start: '2024-01-01',
      date_end: '2024-11-30',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GenBI Berbagi",
      description: "Kegiatan membagikan makanan/sembako kepada masyarakat yang membutuhkan",
      type: "Annually",
      implementation_desc: "23 Maret 2024",
      department_id: 8,
      management_id: 1,
      date_start: '2024-03-23',
      date_end: '2024-03-23',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "GENTANI",
      description: "Kegiatan penanaman pohon untuk kawasan yang rawan longsor",
      type: "Annually",
      implementation_desc: "21 April 2024",
      department_id: 8,
      management_id: 1,
      date_start: '2024-04-21',
      date_end: '2024-04-21',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: "Bakti Sosial GenBI",
      description: "Bakti sosial kepada panti asuhan sekaligus memberikan edukasi pembelajaran",
      type: "Annually",
      implementation_desc: "Periode (Januari - November)",
      department_id: 8,
      management_id: 1,
      date_start: '2024-01-01',
      date_end: '2024-11-30',
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
