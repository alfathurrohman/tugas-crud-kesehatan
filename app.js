let pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];

const form = document.getElementById('pasienForm');
const tableBody = document.getElementById('tabelPasien');
const formTitle = document.getElementById('formTitle');
const inputId = document.getElementById('pasienId');
const inputNama = document.getElementById('nama');
const inputUmur = document.getElementById('umur');
const inputDiagnosa = document.getElementById('diagnosa');
const totalPasienElem = document.getElementById('totalPasien');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancel = document.getElementById('btnCancel');

// Mengubah format tampilan tabel
function renderTable() {
    tableBody.innerHTML = '';
    
    // Update kartu statistik
    totalPasienElem.textContent = pasienData.length;

    // Empty State jika tidak ada data
    if (pasienData.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" class="p-8 text-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-base font-medium">Belum ada rekam medis.</p>
                    <p class="text-xs mt-1">Silakan tambahkan data pasien baru melalui form di samping.</p>
                </td>
            </tr>
        `;
        return;
    }

    // Render data
    pasienData.forEach((pasien, index) => {
        const row = `
            <tr class="hover:bg-slate-50 transition duration-150 group">
                <td class="p-4">
                    <p class="font-semibold text-slate-800">${pasien.nama}</p>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        ${pasien.umur} Tahun
                    </span>
                </td>
                <td class="p-4 text-slate-600 align-top">${pasien.diagnosa}</td>
                <td class="p-4 text-center align-top">
                    <div class="flex justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                        <button onclick="editData(${index})" title="Edit" class="p-1.5 bg-amber-100 text-amber-600 rounded hover:bg-amber-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>
                        <button onclick="deleteData(${index})" title="Hapus" class="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = inputId.value;
    const pasienBaru = {
        nama: inputNama.value,
        umur: inputUmur.value,
        diagnosa: inputDiagnosa.value
    };

    if (id === '') {
        pasienData.push(pasienBaru);
    } else {
        pasienData[id] = pasienBaru;
    }

    localStorage.setItem('pasienData', JSON.stringify(pasienData));
    resetForm();
    renderTable();
});

function editData(index) {
    const pasien = pasienData[index];
    inputId.value = index;
    inputNama.value = pasien.nama;
    inputUmur.value = pasien.umur;
    inputDiagnosa.value = pasien.diagnosa;
    
    // Ubah UI Form untuk Mode Edit
    formTitle.textContent = 'Edit Data Pasien';
    btnSubmit.textContent = 'Simpan Perubahan';
    btnCancel.classList.remove('hidden');
    
    // Scroll ke atas agar user melihat form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteData(index) {
    if (confirm('Apakah Anda yakin ingin menghapus rekam medis pasien ini?')) {
        pasienData.splice(index, 1);
        localStorage.setItem('pasienData', JSON.stringify(pasienData));
        
        // Jika sedang mengedit data yang dihapus, reset form
        if(inputId.value == index) {
            resetForm();
        }
        renderTable();
    }
}

function resetForm() {
    form.reset();
    inputId.value = '';
    formTitle.textContent = 'Registrasi Pasien';
    btnSubmit.textContent = 'Simpan Data';
    btnCancel.classList.add('hidden');
}

renderTable();