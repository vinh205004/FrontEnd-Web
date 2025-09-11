$(document).ready(function() {
  // Danh sách các danh mục và các container tương ứng
  const categories = [
    { category: "Lịch sử, truyền thống", containerId: "#product-list" },
    { category: "Doraemon", containerId: "#dora-list" },
    { category: "WingBooks", containerId: "#wing-list" }
  ];
  
  // Template HTML cho sản phẩm - tách riêng để dễ bảo trì
  const productTemplate = (product, category) => `
    <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 px-2">
      <div class="card h-100 shadow-sm product-card">
        <a href="product-detail.html?id=${parseInt(product.id)}&category=${encodeURIComponent(category)}" class="text-decoration-none text-dark">
          <div class="product-img-container">
            <img src="${product.image}" class="product-img" alt="${product.name}">
          </div>
          <div class="card-body p-2 d-flex flex-column text-center">
            <div class="book-name"><strong>${product.name}</strong></div>
            <p class="book-author text-muted small mb-1">${product.author || ""}</p>
            <p class="book-price mt-1 mb-1 text-danger"><strong>Giá:</strong> ${product.price.toLocaleString()} đ</p>
            <button class="btn btn-sm btn-primary mt-auto py-1 view-detail-btn">Xem chi tiết</button>
          </div>
        </a>
      </div>
    </div>`;
  
  // Hàm chung để hiển thị sản phẩm
  function displayProducts(category, containerId, limit = 5) {
    // Cache selector để tăng hiệu suất
    const $container = $(containerId);
    
    // Kiểm tra sự tồn tại của danh mục
    if (!productData[category] || !$container.length) {
      console.warn(`Không tìm thấy danh mục ${category} hoặc container ${containerId}`);
      return;
    }
    
    // Thêm wrapper để căn giữa
    $container.addClass('justify-content-center');
    
    // Lấy sản phẩm và giới hạn số lượng
    const products = productData[category].slice(0, limit);
    
    // Tạo HTML từ mảng sản phẩm
    const productsHtml = products.map(product => productTemplate(product, category)).join('');
    
    // Thêm vào container (sử dụng .html)
    $container.html(productsHtml);
  }
  
  // Hiển thị sản phẩm cho từng danh mục
  categories.forEach(item => {
    displayProducts(item.category, item.containerId);
  });
});