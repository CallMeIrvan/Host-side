export const SOAL_MISA = [
  { q: "Siapakah nama murid Yesus yang sering disebut sebagai 'Yakobus Besar'?", n: "YAKOBUS", type: "text", img: "/yakobus.jpg", emoji: "📜" },
  { q: "Paus (Pope) yang dikenal sebagai pemimpin agama Katolik dalam daftar tersebut adalah...", n: "PAUS LEO XIII", type: "text", img: "/popeleo.jpg", emoji: "⛪" },
  { q: "Siapakah tokoh wanita yang sangat terkenal karena kasihnya melayani orang miskin dan sakit?", n: "MOTHER TERESA", type: "text", img: "/mothertheresia.jpg", emoji: "🕊️" },
  { q: "Saat kita berdoa mengenang perjalanan Yesus memanggul salib, kita sedang melakukan ibadat...", n: "C", type: "choice", img: "/jalansalib.jpg", emoji: "🙏", opts: ["Makan Bersama", "Ibadat Sabda", "Jalan Salib", "Doa Pagi"] },
  { q: "Siapakah yang bertugas membaptis Yesus di sungai Yordan?", n: "B", type: "choice", img: "/yohanespembaptis.jpg", emoji: "🌊", opts: ["Petrus", "Yohanes Pembaptis", "Musa", "Gabriel"] },
  { q: "Malaikat yang datang menemui Maria untuk memberi kabar bahwa ia akan mengandung disebut...", n: "C", type: "choice", img: "/gabriel.jpg", emoji: "👼", opts: ["Malaikat Rafael", "Malaikat Kegelapan", "Malaikat Gabriel", "Malaikat Mikael"] },
  { q: "Yesus sangat menyayangi ibu-Nya yang bernama...", n: "D", type: "choice", img: "/bundamaria.jpg", emoji: "👩", opts: ["Magdalena", "Marta", "Elisabet", "Bunda Maria"] },
  { q: "Pemimpin utama umat Katolik di wilayah Bali dan sekitarnya disebut...", n: "D", type: "choice", img: "/uskupagung.jpg", emoji: "🏛️", opts: ["Suster", "Frater", "Romo", "Uskup"] },
  { q: "Siapakah yang memimpin perayaan misa pada hari ini?", n: "C", type: "choice", img: "/romo.jpeg", emoji: "⛪", opts: ["Umat", "Frater", "Romo", "Diakon"] },
  { q: "Tokoh yang membawa bangsa Israel keluar dari Mesir dan membelah laut adalah...", n: "D", type: "choice", img: "/Musa.jpeg", emoji: "🌊", opts: ["Daud", "Adam", "Yusuf", "Musa"] }
];

export const SOAL_IBADAH = [
  // 3 Soal Gambar (Visual Revelation)
  { q: "Dalam sebuah makan malam spesial, suasana tiba-tiba menjadi tegang karena Yesus mengatakan bahwa salah satu sahabat-Nya akan menghianati Dia. Nama acara ini diawali dengan kata ‘Perjamuan’. Apa nama lengkap peristiwa tersebut?", n: "PERJAMUAN MALAM TERAKHIR", type: "text", img: "/perjamuan.jpeg", emoji: "🍞" },
  { q: "Pada zaman dahulu, ada sekelompok orang yang merasa sangat hebat dan ingin membangun menara yang sangat tinggi untuk menyamai Tuhan. Namun, akibatnya mereka tidak bisa saling memahami karena bahasa mereka dibuat berbeda-beda. Apa nama menara tersebut?", n: "MENARA BABEL", type: "text", img: "/babel.jpeg", emoji: "🗼" },
  { q: "Yesus berjalan jauh sambil memikul salib yang berat hingga sampai di sebuah bukit. Di tempat itulah Ia wafat demi keselamatan manusia. Apa nama bukit tersebut?", n: "BUKIT KALVARI", type: "text", img: "/kalvari.jpeg", emoji: "✝️" },
  
  // 1 Soal Ayat Acak (The Living Word)
  { q: "Susun kata berikut: AKU - JALAN - HIDUP - DAN - KEBENARAN. Berasal dari ayat manakah ini? Perwakilan dari masing-masing kelompok ceritakan sedikit pengalaman tentang ayat tersebut!", n: "YOHANES 14:6", type: "text", emoji: "📖", noTimer: true },

  // 2 Soal Audio (Sound of Heaven)
  { q: "Tebak judul lagu dari potongan intro ini!", n: "GOODNESS OF GOD", type: "audio", audio: "/goodness of god.mpeg", emoji: "🎵" },
  { q: "Tebak judul lagu dari potongan intro ini!", n: "SEJUTA RASA", type: "audio", audio: "/sejuta rasa.mpeg", emoji: "🎵" }
];
