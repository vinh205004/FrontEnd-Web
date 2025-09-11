// Hàm tạo các nút phân trang, có thể dùng lại cho nhiều trang
function createPagination(currentPage, totalPages, category, searchTerm, sortBy) {
  // Cache selector
  const $pagination = $('#pagination');
  // Ẩn pagination nếu chỉ có 1 trang
  if (totalPages <= 1) {
    $('.pagination-container').hide();
    return;
  }
  // Xóa nội dung phân trang hiện tại
  $pagination.empty();
  // Tạo base URL cho các liên kết phân trang
  let baseUrl = '?';
  if (searchTerm) {
    baseUrl += `search=${encodeURIComponent(searchTerm)}&`;
  } else if (category) {
    baseUrl += `category=${encodeURIComponent(category)}&`;
  }
  // Thêm tham số sắp xếp vào URL nếu có
  if (sortBy) {
    baseUrl += `sort=${encodeURIComponent(sortBy)}&`;
  }
  // HTML cho các nút pagination
  let paginationHtml = '';
  // Nút "Trang trước"
  if (currentPage > 1) {
    paginationHtml += `
      <li class="page-item">
        <a class="page-link" href="${baseUrl}page=${currentPage - 1}" aria-label="Trang trước">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `;
  } else {
    paginationHtml += `
      <li class="page-item disabled">
        <a class="page-link" href="#" aria-label="Trang trước">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `;
  }
  // Hiển thị tối đa 5 trang gần nhất
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  // Trang đầu tiên
  if (startPage > 1) {
    paginationHtml += `
      <li class="page-item">
        <a class="page-link" href="${baseUrl}page=1">1</a>
      </li>
    `;
    if (startPage > 2) {
      paginationHtml += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
  }
  // Các trang số
  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === currentPage ? 'active' : '';
    paginationHtml += `
      <li class="page-item ${activeClass}">
        <a class="page-link" href="${baseUrl}page=${i}">${i}</a>
      </li>
    `;
  }
  // Nếu không phải trang cuối cùng, hiển thị dấu ba chấm và trang cuối
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHtml += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
    paginationHtml += `
      <li class="page-item">
        <a class="page-link" href="${baseUrl}page=${totalPages}">${totalPages}</a>
      </li>
    `;
  }
  // Nút "Trang sau"
  if (currentPage < totalPages) {
    paginationHtml += `
      <li class="page-item">
        <a class="page-link" href="${baseUrl}page=${currentPage + 1}" aria-label="Trang sau">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `;
  } else {
    paginationHtml += `
      <li class="page-item disabled">
        <a class="page-link" href="#" aria-label="Trang sau">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `;
  }
  // Thêm vào DOM một lần duy nhất
  $pagination.html(paginationHtml);
  // Hiển thị container pagination
  $('.pagination-container').show();
}
// Cho phép gọi từ file khác
window.createPagination = createPagination; 