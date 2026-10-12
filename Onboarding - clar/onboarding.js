document.addEventListener("DOMContentLoaded", () => {
  // OTP: auto-advance saat mengetik, backspace kembali ke kotak sebelumnya
  document.querySelectorAll(".inputCode").forEach((row) => {
    const boxes = [...row.querySelectorAll("input")];

    boxes.forEach((box, index) => {
      box.addEventListener("input", () => {
        box.value = box.value.replace(/\D/g, "").slice(-1);
        if (box.value && boxes[index + 1]) {
          boxes[index + 1].focus();
        }
      });

      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && boxes[index - 1]) {
          boxes[index - 1].focus();
        }
      });

      box.addEventListener("paste", (e) => {
        const pasted = (e.clipboardData || window.clipboardData)
          .getData("text")
          .replace(/\D/g, "")
          .slice(0, boxes.length);

        if (!pasted) return;
        e.preventDefault();
        pasted.split("").forEach((digit, i) => {
          boxes[i].value = digit;
        });
        boxes[Math.min(pasted.length, boxes.length - 1)].focus();
      });
    });
  });

  // Form demo: tampilkan pesan pengganti submit ke server
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector(".message");
      if (msg) {
        msg.style.color = "#267a51";
        msg.textContent = "Demo only — hubungkan form ini ke backend untuk melanjutkan.";
      }
    });
  });

  // Tombol kirim kode: tampilkan pesan demo
  document.querySelectorAll("[data-send-code]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const form = btn.closest("form");
      const msg = form && form.querySelector(".message");
      if (msg) {
        msg.style.color = "#267a51";
        msg.textContent = "Demo only — verifikasi SMS belum terhubung.";
      }
    });
  });
});
