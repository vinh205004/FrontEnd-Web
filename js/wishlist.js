/**
 * File wishlist.js - Xử lý wishlist và hiển thị sản phẩm trong wishlist
 */

$(document).ready(function() {
    // Kiểm tra trạng thái đăng nhập trước khi hiển thị danh sách yêu thích
    if (!isLoggedIn()) {
        // Hiển thị thông báo yêu cầu đăng nhập
        $('#wishlist-container').html(`
            <div class="text-center py-5">
                <h3>Vui lòng đăng nhập để xem danh sách yêu thích</h3>
                <p class="mt-3">Bạn cần đăng nhập để xem và quản lý danh sách yêu thích của mình</p>
                <a href="login.html" class="btn btn-primary mt-3">Đăng nhập ngay</a>
            </div>
        `);
        
        // Ẩn nút "Xóa tất cả" khi chưa đăng nhập
        $('#clear-wishlist').hide();
        return;
    }
    
    // Hiển thị sản phẩm trong wishlist
    displayWishlistItems();
    
    // Bắt sự kiện khi người dùng nhấn nút xóa sản phẩm
    $(document).on('click', '.remove-item', function() {
        const index = $(this).data('index');
        removeWishlistItem(index);
    });
    
    // Bắt sự kiện khi người dùng nhấn nút xóa tất cả
    $(document).on('click', '#clear-wishlist', function() {
        clearWishlist();
    });
});

/**
 * Template HTML cho sản phẩm wishlist
 */
const productTemplate = (product, index) => `
    <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 px-2">
        <div class="card h-100 shadow-sm product-card position-relative">
            <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 remove-item" data-index="${index}">
                ×
            </button>
            <a href="product-detail.html?id=${parseInt(product.id)}&category=${encodeURIComponent(product.category)}" class="text-decoration-none text-dark">
                <div class="product-img-container">
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                </div>
                <div class="card-body p-2 d-flex flex-column text-center">
                    <div class="book-name"><strong>${product.name}</strong></div>
                    <p class="book-price mt-1 mb-1 text-danger"><strong>Giá:</strong> ${product.price.toLocaleString()}đ</p>
                    <button class="btn btn-sm btn-primary mt-auto py-1 view-detail-btn">Xem chi tiết</button>
                </div>
            </a>
        </div>
    </div>
`;

/**
 * Hiển thị sản phẩm trong wishlist
 */
function displayWishlistItems() {
    const wishlistProducts = getWishlistItems();
    const $wishlistContainer = $('#wishlist-container');
    
    // Xóa nội dung cũ
    $wishlistContainer.empty();
    
    if (!wishlistProducts || wishlistProducts.length === 0) {
        // Hiển thị thông báo wishlist trống
        $wishlistContainer.html(`
            <div class="col-12 text-center py-5">
                <h3>Danh sách yêu thích của bạn đang trống</h3>
                <p class="mt-3">Hãy thêm sản phẩm vào danh sách yêu thích của bạn</p>
                <a href="index.html" class="btn btn-primary mt-3">Tiếp tục mua sắm</a>
            </div>
        `);
        // Ẩn nút "Xóa tất cả" khi wishlist trống
        $('#clear-wishlist').hide();
        return;
    }
    
    // Hiện nút "Xóa tất cả" khi có sản phẩm
    $('#clear-wishlist').show();
    
    // Thêm class để căn giữa các sản phẩm
    $wishlistContainer.addClass('justify-content-center');
    
    // Tạo HTML từ mảng sản phẩm
    const productsHtml = wishlistProducts.map((product, index) => 
        productTemplate(product, index)
    ).join('');
    
    // Thêm vào container một lần duy nhất
    $wishlistContainer.html(productsHtml);
    
    // Thêm CSS cho product-card
    addProductCardStyles();
    
    // Cập nhật số lượng sản phẩm trong wishlist
    updateWishlistCount();
}

/**
 * Thêm CSS cho card sản phẩm
 */
function addProductCardStyles() {
    // Thêm CSS
    if (!$('#wishlist-styles').length) {
        $('head').append(`
            <style id="wishlist-styles">
                .product-card {
                    transition: transform 0.3s, box-shadow 0.3s;
                    cursor: pointer;
                    border: 1px solid #eee;
                    overflow: hidden;
                }
                .product-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    border-color: #ddd;
                }
                .product-img-container {
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                    transition: background-color 0.3s;
                }
                .product-card:hover .product-img-container {
                    background-color: #f9f9f9;
                }
                .product-img {
                    max-height: 100%;
                    max-width: 100%;
                    object-fit: contain;
                    transition: transform 0.3s;
                }
                
                .view-detail-btn {
                    pointer-events: none;
                    transition: background-color 0.3s, color 0.3s;
                }
                .product-card:hover .view-detail-btn {
                    background-color: #0b5ed7;
                    color: white;
                }
                .book-name {
                    height: 40px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    transition: color 0.3s;
                }
                
                .remove-item {
                    opacity: 0.8;
                    transition: opacity 0.3s, transform 0.3s;
                }
            </style>
        `);
    }
}

/**
 * Xóa sản phẩm khỏi wishlist
 */
function removeWishlistItem(index) {
    let wishlistProducts = getWishlistItems();
    
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return;
    
    // Sử dụng modal xác nhận 
    showConfirmModal(
        'Xóa sản phẩm yêu thích',
        'Bạn có chắc chắn muốn xóa sản phẩm này khỏi danh sách yêu thích?',
        function() {
            const removedProduct = wishlistProducts[index];
            wishlistProducts.splice(index, 1);
            localStorageUtil.set(`wishlist_${userId}`, wishlistProducts);
            
            // Hiển thị lại wishlist
            displayWishlistItems();
            
            // Hiển thị thông báo
            showToast(`Đã xóa sản phẩm "${removedProduct.name}" khỏi danh sách yêu thích`, 'success');
        }
    );
}

/**
 * Xóa tất cả sản phẩm trong wishlist
 */
function clearWishlist() {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return;
    
    // Sử dụng modal xác nhận 
    showConfirmModal(
        'Xóa toàn bộ danh sách yêu thích',
        'Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách yêu thích?',
        function() {
            localStorageUtil.remove(`wishlist_${userId}`);
            
            // Hiển thị lại wishlist
            displayWishlistItems();
            
            // Hiển thị thông báo
            showToast('Đã xóa tất cả sản phẩm khỏi danh sách yêu thích', 'success');
        }
    );
}