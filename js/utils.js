/**
 * File utils.js - Các hàm tiện ích dùng chung trong toàn bộ ứng dụng
 */

/**
 * Hiển thị thông báo toast
 * @param {string} message Nội dung thông báo
 * @param {string} type Loại thông báo ('success', 'error', 'warning', 'info')
 */
function showToast(message, type = 'info') {
    // Tạo container cho toast nếu chưa có
    if (!$('.toast-container').length) {
        $('body').append('<div class="toast-container"></div>');
    }
    
    // Tạo ID duy nhất cho toast
    const toastId = 'toast-' + new Date().getTime();
    
    // Xác định class dựa trên loại thông báo
    let bgClass = 'bg-info';
    let iconClass = 'fa-info-circle';
    
    switch(type) {
        case 'success':
            bgClass = 'bg-success';
            iconClass = 'fa-check-circle';
            break;
        case 'error':
        case 'danger':
            bgClass = 'bg-danger';
            iconClass = 'fa-exclamation-circle';
            break;
        case 'warning':
            bgClass = 'bg-warning';
            iconClass = 'fa-exclamation-triangle';
            break;
    }
    
    // Tạo HTML cho toast
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas ${iconClass} me-2"></i> ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Thêm toast vào container
    $('.toast-container').append(toastHtml);
    
    // Khởi tạo toast với Bootstrap
    const toastElement = new bootstrap.Toast(document.getElementById(toastId), {
        delay: 3000 // Tự động ẩn sau 3 giây
    });
    
    // Hiển thị toast
    toastElement.show();
    
    // Xóa toast sau khi ẩn
    $(`#${toastId}`).on('hidden.bs.toast', function() {
        $(this).remove();
    });
}

/**
 * Hiển thị modal xác nhận
 * @param {string} title - Tiêu đề modal
 * @param {string} message - Nội dung thông báo
 * @param {Function} onConfirm - Hàm callback khi người dùng xác nhận
 * @param {Function} onCancel - Hàm callback tùy chọn khi người dùng hủy
 */
function showConfirmModal(title, message, onConfirm, onCancel) {
    // Xóa modal cũ nếu tồn tại
    $('#confirmModal').remove();
    
    // Tạo modal HTML
    const modalHtml = `
        <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmModalLabel">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelButton">Hủy</button>
                        <button type="button" class="btn btn-danger" id="confirmButton">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Thêm modal vào body
    $('body').append(modalHtml);
    
    // Tạo đối tượng modal
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    
    // Bắt sự kiện khi người dùng nhấn nút xác nhận
    $('#confirmButton').on('click', function() {
        // Đóng modal
        confirmModal.hide();
        
        // Gọi callback
        if (typeof onConfirm === 'function') {
            onConfirm();
        }
    });
    
    // Bắt sự kiện khi người dùng hủy
    $('#cancelButton, .btn-close').on('click', function() {
        if (typeof onCancel === 'function') {
            onCancel();
        }
    });
    
    // Hiển thị modal
    confirmModal.show();
}

/**
 * Xử lý localStorage với try-catch
 */
const localStorageUtil = {
    // Lấy dữ liệu từ localStorage
    get: function(key, defaultValue = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error('Lỗi khi đọc từ localStorage:', error);
            return defaultValue;
        }
    },
    
    // Lưu dữ liệu vào localStorage
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Lỗi khi lưu vào localStorage:', error);
            showToast('Không thể lưu dữ liệu. Vui lòng kiểm tra dung lượng trình duyệt.', 'error');
            return false;
        }
    },
    
    // Xóa dữ liệu từ localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Lỗi khi xóa từ localStorage:', error);
            return false;
        }
    }
};

/**
 * Lấy các sản phẩm trong giỏ hàng
 * @returns {Array} Danh sách sản phẩm trong giỏ hàng của người dùng hiện tại
 */
function getCartItems() {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, trả về mảng rỗng
    if (!userId) return [];
    
    // Lấy giỏ hàng theo ID người dùng
    return localStorageUtil.get(`cart_${userId}`, []);
}

/**
 * Lấy các sản phẩm trong wishlist
 * @returns {Array} Danh sách sản phẩm yêu thích của người dùng hiện tại
 */
function getWishlistItems() {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, trả về mảng rỗng
    if (!userId) return [];
    
    // Lấy danh sách yêu thích theo ID người dùng
    return localStorageUtil.get(`wishlist_${userId}`, []);
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
function updateCartCount() {
    const cartProducts = getCartItems();
    let totalItems = 0;
    
    // Tính tổng số lượng sản phẩm
    cartProducts.forEach(product => {
        totalItems += product.quantity;
    });
    
    // Cập nhật số lượng trong giao diện
    const $cartCount = $('.cart-count');
    if ($cartCount.length) {
        $cartCount.text(totalItems);
        
        // Ẩn hiển thị số lượng nếu bằng 0
        if (totalItems === 0) {
            $cartCount.hide();
        } else {
            $cartCount.show();
        }
    }
}

/**
 * Cập nhật số lượng sản phẩm trong wishlist
 */
function updateWishlistCount() {
    const wishlistProducts = getWishlistItems();
    const count = wishlistProducts.length;
    
    // Cập nhật số lượng trong giao diện
    const $wishlistCount = $('.wishlist-count');
    if ($wishlistCount.length) {
        $wishlistCount.text(count);
        
        // Ẩn hiển thị số lượng nếu bằng 0
        if (count === 0) {
            $wishlistCount.hide();
        } else {
            $wishlistCount.show();
        }
    }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param {Object} product - Thông tin sản phẩm
 * @param {number} quantity - Số lượng sản phẩm
 */
function addToCart(product, quantity) {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return false;
    
    // Đọc giỏ hàng hiện tại của người dùng
    let cartItems = getCartItems();
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cartItems.findIndex(
        item => item.id === product.id && item.category === product.category
    );
    
    if (existingItemIndex !== -1) {
        // Nếu đã có, cộng dồn số lượng
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        // Nếu chưa có, thêm mới
        cartItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: quantity
        });
    }
    
    // Lưu giỏ hàng cập nhật vào localStorage với key theo ID người dùng
    localStorageUtil.set(`cart_${userId}`, cartItems);
    
    // Cập nhật số lượng hiển thị
    updateCartCount();
    
    return true;
}

/**
 * Thêm sản phẩm vào danh sách yêu thích
 * @param {Object} product - Thông tin sản phẩm
 * @param {string} category - Danh mục sản phẩm
 * @return {boolean} - true nếu thêm thành công, false nếu sản phẩm đã tồn tại
 */
function addToWishlist(product, category) {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return false;
    
    // Đọc wishlist hiện tại của người dùng
    let wishlistItems = getWishlistItems();
    
    // Kiểm tra xem sản phẩm đã có trong wishlist chưa
    const existingItemIndex = wishlistItems.findIndex(
        item => item.id === product.id
    );
    
    if (existingItemIndex === -1) {
        // Nếu chưa có, thêm mới
        wishlistItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: category || product.category
        });
        
        // Lưu wishlist cập nhật vào localStorage với key theo ID người dùng
        localStorageUtil.set(`wishlist_${userId}`, wishlistItems);
        
        // Cập nhật số lượng hiển thị
        updateWishlistCount();
        
        return true;
    } else {
        // Nếu đã có, trả về false
        return false;
    }
}

// Thêm CSS cho toast container
$(document).ready(function() {
    if (!$('#utils-styles').length) {
        $('head').append(`
            <style id="utils-styles">
                .toast-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                .toast {
                    max-width: 350px;
                }
            </style>
        `);
    }
});

/**
 * Kiểm tra trạng thái đăng nhập của người dùng
 * @returns {boolean} true nếu đã đăng nhập, false nếu chưa đăng nhập
 */
function isLoggedIn() {
    const authData = localStorageUtil.get('authData', null);
    return authData && authData.user && (authData.expiresAt === null || new Date(authData.expiresAt) > new Date());
}

/**
 * Yêu cầu đăng nhập để thực hiện một hành động
 * @param {Function} callback - Hàm callback sẽ được gọi nếu người dùng đã đăng nhập
 * @param {string} message - Thông báo hiển thị nếu chưa đăng nhập
 * @returns {boolean} - true nếu đã đăng nhập và callback được gọi, false nếu chưa đăng nhập
 */
function requireLogin(callback, message = 'Vui lòng đăng nhập để thực hiện chức năng này') {
    if (isLoggedIn()) {
        if (typeof callback === 'function') {
            callback();
        }
        return true;
    } else {
        showConfirmModal(
            'Yêu cầu đăng nhập',
            `${message}. Bạn có muốn đăng nhập ngay không?`,
            function() {
                // Chuyển hướng đến trang đăng nhập
                window.location.href = 'login.html';
            }
        );
        return false;
    }
}
