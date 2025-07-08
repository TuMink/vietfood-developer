document.addEventListener('DOMContentLoaded', function () {
  const viewMoreBtn = document.getElementById('view-more-btn');
  const orderNowWrapper = document.getElementById('order-now-wrapper');

  if (!viewMoreBtn) return;

  function handleViewMoreClick() {
    const hiddenItems = document.querySelectorAll('.menu-item.hidden-item');
    hiddenItems.forEach(item => {
      item.classList.remove('hidden-item');
    });

    // Hiện nút "Đặt đồ ngay"
    if (orderNowWrapper) {
      orderNowWrapper.style.display = 'block';
    }

    // Ẩn nút "Xem thêm"
    viewMoreBtn.style.display = 'none';
  }

  viewMoreBtn.addEventListener('click', handleViewMoreClick);
});
