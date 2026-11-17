# TASKLY – Aplikasi Web Manajemen Tugas (To-Do List)

Aplikasi frontend manajemen tugas (To-Do List) modern dengan gaya desain **Neo-Brutalism**, dibangun menggunakan **React JS**, **Vite**, **Pure CSS3**, **React Router**, **Axios**, dan **Lucide React**.

---

## 🎨 Sistem Desain Neo-Brutalism

Aplikasi ini mengadopsi prinsip desain Neo-Brutalism secara konsisten sesuai dengan spesifikasi PRD dan desain Stitch:

- **Palet Warna**:
  - **Background**: `#FCF9F8`
  - **Kuning Primer**: `#FFDE59`
  - **Hijau Lime Sekunder**: `#B8F28B`
  - **Ungu Aksen**: `#E8DDFF` / `#674BB5`
  - **Merah Coral (Bahaya/Hapus)**: `#FF8A80` / `#BA1A1A`
  - **Teks & Garis Tepi (Border)**: `#1C1B1B`
  - **Latar Belakang Kartu**: `#FFFFFF`

- **Karakteristik Desain**:
  - Garis batas tebal hitam pekat (`2.5px` hingga `3px` solid `#1C1B1B`).
  - Bayangan tegas tanpa blur / hard offset shadow (`4px 4px 0px #1C1B1B`, efek tekan taktil `0px 0px`).
  - Sudut sedikit membulat (`border-radius: 8px`).
  - Tipografi tegas & berkarakter: kombinasi **Space Grotesk** (judul, tombol, badge) dan **Plus Jakarta Sans** (teks isi, input).
  - Kontras warna tinggi dan interaksi tombol yang nyata saat ditekan.
  - Notifikasi umpan balik menggunakan sistem Toast Neo-Brutalism kustom (tanpa menggunakan `alert()` bawaan browser).

---

## 🚀 Fitur Utama

1. **Autentikasi Pengguna**:
   - **Halaman Login** (`/login`): Validasi format email, validasi password minimal 6 karakter, tombol intip/sembunyikan password, status loading, dan tombol cepat "Fill Demo" untuk kemudahan pengujian.
   - **Halaman Registrasi** (`/register`): Validasi nama lengkap, email, kecocokan konfirmasi password, indikator kekuatan password (*password strength meter*) dinamis 4 tingkat, serta persetujuan syarat & ketentuan.
2. **Manajemen Tugas Lengkap (CRUD)**:
   - **Tambah Tugas**: Modal pembuatan tugas dengan judul (wajib), deskripsi, batas waktu (due date), pilihan kategori (`🎨 Design`, `⚡ Dev`, `💼 Strategy`, `🌱 Life`), dan prioritas (`Low`, `Medium`, `High`).
   - **Ubah / Edit Tugas**: Mengisi otomatis data tugas sebelumnya ke dalam form modal untuk kemudahan pembaruan.
   - **Hapus Tugas**: Dialog konfirmasi peringatan sebelum tugas dihapus permanen.
   - **Tandai Selesai / Pending**: Tombol centang bergaya Neo-Brutalist dengan efek coretan teks (*strikethrough*) instan dan badge label hijau saat selesai.
3. **Pencarian & Penyaringan Tugas**:
   - Pencarian langsung (*live dynamic search*) berdasarkan judul dan deskripsi tugas dari header.
   - Tombol tab filter status: **Semua Tugas (All)**, **Tertunda (Pending)**, dan **Selesai (Completed)** lengkap dengan jumlah tugas.
   - Halaman filter khusus melalui sidebar: `/dashboard`, `/tasks`, `/tasks/pending`, dan `/tasks/completed`.
4. **Statistik Tugas Real-Time**:
   - Kartu statistik berukuran besar untuk **Total Tugas**, **Tugas Selesai** (disertai persentase keberhasilan), dan **Tugas Tertunda** yang terhubung langsung ke state aplikasi.
5. **Mode Mock Terintegrasi**:
   - Secara bawaan berjalan dalam mode mock (`VITE_USE_MOCK_DATA=true`) yang menyimpan data ke `localStorage`, sehingga perubahan data tidak hilang saat halaman di-refresh.
   - Siap dihubungkan ke REST API PHP backend tanpa perlu merombak arsitektur antarmuka.

---

## 💻 Panduan Instalasi & Menjalankan Aplikasi

### Prasyarat
- **Node.js**: v18+ (disarankan)
- **npm**: v9+

### 1. Kloning Repositori & Instalasi Dependensi
```bash
# Masuk ke direktori proyek
cd To-Do-List

# Pasang semua paket dependensi
npm install
```

### 2. Menjalankan di Lingkungan Pengembangan (Development)
Secara bawaan aplikasi berjalan menggunakan mock service, sehingga tidak memerlukan backend PHP yang aktif:
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:3000` (atau port yang tertera pada terminal).

### 3. Membangun untuk Produksi (Production Build)
```bash
npm run build
```
File hasil kompilasi yang siap dideploy akan berada di dalam folder `dist/`.

---

## 🔌 Panduan Integrasi REST API Backend PHP

Aplikasi ini telah disiapkan agar pengembang backend PHP dapat menghubungkan API dengan cepat dan mudah. Seluruh pemanggilan HTTP terpusat di folder `src/services/` dan tidak bercampur di dalam komponen antarmuka (UI).

### 1. Konfigurasi Variabel Lingkungan (.env)
Ubah file `.env` di direktori utama:
```env
VITE_API_BASE_URL=http://localhost/backend/api
VITE_USE_MOCK_DATA=false
```

### 2. Spesifikasi Endpoint Backend

#### Autentikasi (`src/services/authService.js`)
| Metode | Endpoint | Deskripsi | Body / Payload | Format Respons yang Diharapkan |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/login.php` | Masuk ke akun | `{"email": "...", "password": "..."}` | `{"token": "jwt_token", "user": {"id": 1, "name": "...", "email": "..."}}` |
| `POST` | `/register.php` | Mendaftar akun baru | `{"name": "...", "email": "...", "password": "..."}` | `{"token": "jwt_token", "user": {"id": 1, "name": "...", "email": "..."}}` |
| `POST` | `/logout.php` | Keluar dari sesi | Tidak ada | `{"success": true}` |
| `GET` | `/user.php` | Ambil data profil aktif | Header `Authorization: Bearer <token>` | `{"user": {"id": 1, "name": "...", "email": "..."}}` |

#### Manajemen Tugas (`src/services/taskService.js`)
| Metode | Endpoint | Deskripsi | Payload / Parameter | Format Respons yang Diharapkan |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/tasks.php` | Ambil daftar tugas pengguna | Tidak ada | Array objek tugas: `[ { "id": 1, "user_id": 1, "title": "...", "description": "...", "due_date": "2026-11-20", "status": "pending", "category": "Design", "priority": "high", "created_at": "2026-11-17" } ]` |
| `POST` | `/tasks.php` | Buat tugas baru | `{"title": "...", "description": "...", "due_date": "...", "category": "...", "priority": "..."}` | Objek tugas yang berhasil dibuat |
| `PUT` | `/tasks.php?id={id}` | Perbarui tugas | `{"title": "...", "description": "...", "due_date": "...", "category": "...", "priority": "..."}` | Objek tugas yang telah diperbarui |
| `DELETE` | `/tasks.php?id={id}` | Hapus tugas | Query parameter `id` | `{"success": true, "id": ...}` |
| `PATCH` | `/tasks.php?id={id}` | Perbarui status tugas | `{"status": "completed" \| "pending"}` | Objek tugas dengan status baru |

---

## 📁 Struktur Direktori Proyek

```
src/
├── assets/                  # Aset statis & logo
├── components/
│   ├── common/              # Komponen UI Neo-Brutalism reusable
│   │   ├── Button.jsx       # Tombol dengan varian, ukuran, & status loading
│   │   ├── ConfirmDialog.jsx# Dialog konfirmasi hapus tugas
│   │   ├── Input.jsx        # Input teks & password dengan toggle intip
│   │   ├── Logo.jsx         # Logo & ikon branding TASKLY
│   │   ├── Modal.jsx        # Window dialog modal Neo-Brutalist
│   │   └── Toast.jsx        # Notifikasi umpan balik kustom
│   ├── layout/              # Struktur layout aplikasi
│   │   ├── DashboardLayout.jsx # Wrapper dashboard utama
│   │   ├── Header.jsx       # Header dengan tanggal & pencarian langsung
│   │   └── Sidebar.jsx      # Sidebar menu navigasi & profil pengguna
│   └── tasks/               # Komponen fitur tugas
│       ├── TaskCard.jsx     # Kartu tugas dengan aksi status, edit, & hapus
│       ├── TaskFilter.jsx   # Tab penyaring tugas (All, Pending, Completed)
│       ├── TaskForm.jsx     # Form modal tambah & edit tugas
│       ├── TaskList.jsx     # Daftar tugas beserta status kosong (empty state)
│       └── TaskStats.jsx    # Kartu ringkasan statistik berukuran besar
├── context/
│   ├── AuthContext.jsx      # Manajemen state autentikasi pengguna
│   ├── TaskContext.jsx      # Manajemen state tugas & operasi CRUD
│   └── ToastContext.jsx     # Provider notifikasi toast
├── hooks/
│   └── useTasks.js          # Custom hook untuk mengakses state tugas
├── pages/
│   ├── AllTasks.jsx         # Halaman seluruh tugas (/tasks)
│   ├── CompletedTasks.jsx   # Halaman tugas yang telah selesai (/tasks/completed)
│   ├── Dashboard.jsx        # Halaman ringkasan dashboard (/dashboard)
│   ├── Login.jsx            # Halaman masuk (/login)
│   ├── PendingTasks.jsx     # Halaman tugas tertunda (/tasks/pending)
│   └── Register.jsx         # Halaman registrasi akun (/register)
├── services/
│   ├── api.js               # Klien HTTP Axios terpusat
│   ├── authService.js       # Layanan autentikasi (Mock & REST API)
│   ├── mockData.js          # Data awal mock & penyimpanan localStorage
│   └── taskService.js       # Layanan tugas (Mock & REST API)
├── styles/
│   ├── auth.css             # Gaya halaman autentikasi
│   ├── components.css       # Gaya komponen tombol, input, & modal
│   ├── dashboard.css        # Gaya layout dashboard & kartu tugas
│   ├── global.css           # Reset CSS global & scrollbar
│   └── variables.css        # Token desain Neo-Brutalism & variabel warna
├── utils/
│   └── dateUtils.js         # Utilitas pemformatan tanggal & status batas waktu
├── App.jsx                  # Konfigurasi routing & pembatas hak akses
└── main.jsx                 # Titik masuk utama aplikasi React
```

---

## 📱 Responsivitas Perangkat

- **Desktop (≥ 1024px)**: Sidebar kiri tetap, grid statistik 3 kolom, tata letak tugas lapang.
- **Tablet (768px - 1023px)**: Grid statistik fleksibel, tata letak kartu menyesuaikan lebar layar.
- **Mobile (< 768px)**: Menu drawer samping yang dapat dibuka-tutup dengan latar redup, kartu statistik vertikal, tombol berukuran ramah sentuhan, dan tanpa luapan horizontal (*zero horizontal overflow*).
