// Template cho chi tiết sản phẩm
const productDetailTemplate = (product) => `
    <div class="col-md-5 mb-4">
        <div class="card shadow-sm">
            <div class="product-img-container d-flex align-items-center justify-content-center" style="height: 400px; padding: 20px;">
                <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-height: 380px; object-fit: contain;">
            </div>
        </div>
    </div>
    <div class="col-md-7">
        <h2 class="mb-3">${product.name}</h2>
        <div class="product-info mb-4">
            <table class="table">
                <tbody>
                    <tr>
                        <th style="width: 150px;">Tác giả:</th>
                        <td>${product.author || 'Chưa có thông tin'}</td>
                    </tr>
                    <tr>
                        <th>Đối tượng:</th>
                        <td>${product.person || 'Chưa có thông tin'}</td>
                    </tr>
                    <tr>
                        <th>Số trang:</th>
                        <td>${product.pages || 'Chưa có thông tin'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="product-price mb-4">
            <h4 class="text-danger">${product.price.toLocaleString()} đ</h4>
        </div>
        
        <div class="product-actions mb-4">
            <div class="d-flex align-items-center mb-3">
                <span class="me-3">Số lượng:</span>
                <div class="input-group" style="width: 130px;">
                    <button class="btn btn-outline-secondary" type="button" id="decrease-quantity">-</button>
                    <input type="number" class="form-control text-center" id="product-quantity" value="1" min="1">
                    <button class="btn btn-outline-secondary" type="button" id="increase-quantity">+</button>
                </div>
            </div>
            
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary me-md-2" id="add-to-cart">
                    <i class="fas fa-shopping-cart me-1"></i> Thêm vào giỏ hàng
                </button>
                <button class="btn btn-danger" id="add-to-favorite">
                    <i class="far fa-heart me-1"></i> Yêu thích
                </button>
            </div>
        </div>
        
        <div class="product-description mt-4">
            <h5>Mô tả sản phẩm</h5>
            <p>${product.detail || 'Chưa có mô tả chi tiết.'}</p>
        </div>
    </div>
`;

// Template cho sản phẩm liên quan
const relatedProductTemplate = (product, category) => `
    <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 px-2">
        <div class="card h-100 shadow-sm product-card">
            <a href="product-detail.html?id=${product.id}&category=${encodeURIComponent(category)}" class="text-decoration-none text-dark">
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
    </div>
`;

$(document).ready(function() {
    // Cache selectors
    const $productDetailContainer = $('#product-detail-container');
    const $relatedProducts = $('#related-products');
    const $categoryLink = $('#category-link');
    const $productNameBreadcrumb = $('#product-name-breadcrumb');
    
    // Lấy tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const category = urlParams.get('category');
    
    // Kiểm tra xem có tham số không
    if (!productId || !category) {
        $productDetailContainer.html('<div class="col-12"><div class="alert alert-danger">Không tìm thấy thông tin sản phẩm</div></div>');
        return;
    }
    
    // Hiển thị loading khi đang tải sản phẩm
    $productDetailContainer.html('<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-3">Đang tải thông tin sản phẩm...</p></div>');
    
    // Tìm sản phẩm trong dữ liệu
    const product = findProduct(productId, category);
    
    if (!product) {
        $productDetailContainer.html('<div class="col-12"><div class="alert alert-danger">Không tìm thấy sản phẩm</div></div>');
        return;
    }
    
    // Cập nhật breadcrumb
    $categoryLink.text(category).attr('href', `category.html?category=${encodeURIComponent(category)}`);
    $productNameBreadcrumb.text(product.name);
    
    // Hiển thị chi tiết sản phẩm
    displayProductDetail(product, $productDetailContainer);
    
    // Hiển thị sản phẩm liên quan
    displayRelatedProducts(category, productId, $relatedProducts);
});

/**
 * Hàm tìm sản phẩm theo ID và danh mục
 * @param {number} productId - ID sản phẩm cần tìm
 * @param {string} category - Danh mục sản phẩm
 * @return {Object|null} Sản phẩm tìm thấy hoặc null
 */
function findProduct(productId, category) {
    if (!productData[category]) return null;
    return productData[category].find(item => item.id === productId);
}

/**
 * Hàm hiển thị chi tiết sản phẩm
 * @param {Object} product - Thông tin sản phẩm
 * @param {jQuery} $container - Container để hiển thị sản phẩm
 */
function displayProductDetail(product, $container) {
    // Gán category vào product để sử dụng sau này
    product.category = new URLSearchParams(window.location.search).get('category');
    
    // Hiển thị chi tiết sản phẩm
    $container.html(productDetailTemplate(product));
    
    // Cache selectors cho các phần tử được tạo động
    const $quantityInput = $('#product-quantity');
    const $increaseBtn = $('#increase-quantity');
    const $decreaseBtn = $('#decrease-quantity');
    const $addToCartBtn = $('#add-to-cart');
    const $addToFavoriteBtn = $('#add-to-favorite');
    
    // Xử lý tăng giảm số lượng
    $increaseBtn.on('click', function() {
        const quantity = parseInt($quantityInput.val());
        $quantityInput.val(quantity + 1);
    });
    
    $decreaseBtn.on('click', function() {
        const quantity = parseInt($quantityInput.val());
        if (quantity > 1) {
            $quantityInput.val(quantity - 1);
        }
    });
    
    // Xử lý sự kiện số lượng
    $quantityInput.on('change', function() {
        let quantity = parseInt($(this).val());
        if (isNaN(quantity) || quantity < 1) {
            $(this).val(1);
        }
    });
    
    // Xử lý thêm vào giỏ hàng
    $addToCartBtn.on('click', function() {
        const quantity = parseInt($quantityInput.val());
        
        // Yêu cầu đăng nhập trước khi thêm vào giỏ hàng
        requireLogin(function() {
            // Sử dụng hàm từ utils.js để thêm vào giỏ hàng
            if (addToCart(product, quantity)) {
                // Hiển thị thông báo toast
                showToast(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng!`, 'success');
            }
        }, 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
    });
    
    // Xử lý thêm vào danh sách yêu thích
    $addToFavoriteBtn.on('click', function() {
        // Yêu cầu đăng nhập trước khi thêm vào danh sách yêu thích
        requireLogin(function() {
            // Thêm sản phẩm vào wishlist sử dụng hàm từ utils.js
            const result = addToWishlist(product, product.category);
            
            // Hiển thị thông báo toast
            if (result) {
                showToast(`Đã thêm sản phẩm "${product.name}" vào danh sách yêu thích!`, 'success');
            } else {
                showToast(`Sản phẩm "${product.name}" đã có trong danh sách yêu thích!`, 'warning');
            }
        }, 'Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích');
    });
}

/**
 * Hàm hiển thị sản phẩm liên quan
 * @param {string} category - Danh mục sản phẩm
 * @param {number} currentProductId - ID sản phẩm hiện tại
 * @param {jQuery} $container - Container để hiển thị sản phẩm liên quan
 */
function displayRelatedProducts(category, currentProductId, $container) {
    if (!productData[category]) {
        $container.html('<div class="col-12"><p>Không có sản phẩm liên quan.</p></div>');
        return;
    }
    
    // Lấy tối đa 6 sản phẩm liên quan (không bao gồm sản phẩm hiện tại)
    const relatedProducts = productData[category]
        .filter(item => item.id !== currentProductId)
        .slice(0, 6);
    
    if (relatedProducts.length === 0) {
        $container.html('<div class="col-12"><p>Không có sản phẩm liên quan.</p></div>');
        return;
    }
    
    // Thêm class để căn giữa các sản phẩm
    $container.addClass('justify-content-center');
    
    // Tạo HTML cho các sản phẩm liên quan
    const relatedHtml = relatedProducts.map(product => 
        relatedProductTemplate(product, category)
    ).join('');
    
    // Thêm vào DOM một lần duy nhất
    $container.html(relatedHtml);
}
