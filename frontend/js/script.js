// Hiển thị form nhập thông tin
function showForm(timeSlot) {
  currentTimeSlot = timeSlot; // Ghi nhớ khung giờ
  document.getElementById("booking-modal").style.display = "flex";
}

// Đóng modal
function closeModal() {
  document.getElementById("booking-modal").style.display = "none";
}

// Lưu thông tin đặt sân (Gửi dữ liệu đến backend)
async function saveBooking() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name === "" || phone === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
  }

  try {
      const response = await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              timeSlot: currentTimeSlot,
              name: name,
              phone: phone,
          }),
      });

      const data = await response.json();

      if (response.ok) {
          alert(data.message);
          console.log("Danh sách đặt sân:", data.bookings);
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error("Lỗi khi lưu thông tin đặt sân:", error);
  }

  // Reset form và đóng modal
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  closeModal();
}
