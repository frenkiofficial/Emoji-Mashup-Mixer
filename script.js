document.addEventListener('DOMContentLoaded', () => {
    // Daftar emoji (bisa diperbanyak)
    // Sumber: https://unicode.org/emoji/charts/full-emoji-list.html
    const emojiList = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
        '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️',
        '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡',
        '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓',
        '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄',
        '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵',
        '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠',
        '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽',
        '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
        '😿', '😾', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
        '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝',
        '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️',
        '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️',
        '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '🉑', '☢️', '☣️',
        '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮',
        '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎',
        '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯',
        '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️'
        // Tambahkan lebih banyak jika perlu
    ];

    const grid1 = document.getElementById('grid1');
    const grid2 = document.getElementById('grid2');
    const mashupResult = document.getElementById('mashupResult');
    const randomizeBtn = document.getElementById('randomizeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');

    let selectedEmoji1 = '❓'; // Default emoji atas
    let selectedEmoji2 = '❓'; // Default emoji bawah

    // Fungsi untuk mengisi grid emoji
    function populateGrid(gridElement, panelId) {
        emojiList.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-item');
            emojiSpan.textContent = emoji;
            emojiSpan.dataset.emoji = emoji;
            emojiSpan.dataset.panel = panelId; // Tandai asal panel

            emojiSpan.addEventListener('click', handleEmojiSelection);
            gridElement.appendChild(emojiSpan);
        });
    }

    // Fungsi menangani pemilihan emoji
    function handleEmojiSelection(event) {
        const selectedEmoji = event.target.dataset.emoji;
        const panelId = event.target.dataset.panel;

        // Hapus selection sebelumnya di panel yang sama
        const panelGrid = document.getElementById(`grid${panelId}`);
        panelGrid.querySelectorAll('.emoji-item.selected').forEach(el => {
            el.classList.remove('selected');
        });

        // Tambah selection ke yg diklik
        event.target.classList.add('selected');

        // Update variabel global
        if (panelId === '1') {
            selectedEmoji1 = selectedEmoji;
        } else {
            selectedEmoji2 = selectedEmoji;
        }

        // Update hasil mashup
        updateMashupResult();
    }

    // Fungsi untuk update tampilan hasil
    function updateMashupResult() {
        // Gunakan data attributes untuk diakses oleh CSS pseudo-elements
        mashupResult.dataset.topEmoji = selectedEmoji1;
        mashupResult.dataset.bottomEmoji = selectedEmoji2;
    }

    // Fungsi untuk memilih emoji acak
    function randomizeEmojis() {
        const randomIndex1 = Math.floor(Math.random() * emojiList.length);
        const randomIndex2 = Math.floor(Math.random() * emojiList.length);

        selectedEmoji1 = emojiList[randomIndex1];
        selectedEmoji2 = emojiList[randomIndex2];

        // Update selection visual di grid (opsional tapi bagus)
        updateGridSelection(grid1, selectedEmoji1);
        updateGridSelection(grid2, selectedEmoji2);

        updateMashupResult();
    }

    // Helper untuk update visual grid saat diacak
    function updateGridSelection(gridElement, emojiToSelect) {
        gridElement.querySelectorAll('.emoji-item.selected').forEach(el => {
            el.classList.remove('selected');
        });
        const emojiElement = gridElement.querySelector(`.emoji-item[data-emoji="${emojiToSelect}"]`);
        if (emojiElement) {
            emojiElement.classList.add('selected');
             // Scroll into view if needed
             emojiElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

     // Fungsi untuk menyalin hasil (sebagai teks)
    function copyResultText() {
        const textToCopy = `${selectedEmoji1} + ${selectedEmoji2} = (Top:${selectedEmoji1}, Bottom:${selectedEmoji2})`; // Contoh format teks
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Beri feedback visual
            copyFeedback.textContent = 'Teks disalin!';
            copyFeedback.classList.add('visible');
            setTimeout(() => {
                copyFeedback.classList.remove('visible');
            }, 1500); // Hilangkan setelah 1.5 detik
        }).catch(err => {
            console.error('Gagal menyalin teks: ', err);
             copyFeedback.textContent = 'Gagal menyalin!';
             copyFeedback.classList.add('visible');
              setTimeout(() => {
                copyFeedback.classList.remove('visible');
            }, 1500);
        });
    }


    // --- Inisialisasi ---
    populateGrid(grid1, '1');
    populateGrid(grid2, '2');
    updateMashupResult(); // Tampilkan default awal

    // Event Listener untuk tombol
    randomizeBtn.addEventListener('click', randomizeEmojis);
    copyBtn.addEventListener('click', copyResultText);

});