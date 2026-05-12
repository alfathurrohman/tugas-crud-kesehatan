# Menggunakan image Nginx versi ringan (alpine)
FROM nginx:alpine

# Menyalin semua file dari folder proyek ke dalam folder publik Nginx di Docker
COPY . /usr/share/nginx/html

# Mengekspos port 80 agar bisa diakses
EXPOSE 80