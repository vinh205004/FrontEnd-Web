/**
 * File shop.js - Xử lý giỏ hàng và hiển thị sản phẩm trong giỏ hàng
 */

$(document).ready(function() {
    // Kiểm tra trạng thái đăng nhập trước khi hiển thị giỏ hàng
    if (!isLoggedIn()) {
        // Hiển thị thông báo yêu cầu đăng nhập
        $('#cart-container').html(`
            <div class="text-center py-5">
                <h3>Vui lòng đăng nhập để xem giỏ hàng</h3>
                <p class="mt-3">Bạn cần đăng nhập để xem và quản lý giỏ hàng của mình</p>
                <a href="login.html" class="btn btn-primary mt-3">Đăng nhập ngay</a>
            </div>
        `);
        return;
    }

    // Hiển thị sản phẩm trong giỏ hàng
    displayCartItems();

    // Tính tổng tiền ban đầu
    updateCartTotal();
    
    // Bắt sự kiện khi người dùng thay đổi số lượng
    $(document).on('change', '.cart-quantity', function() {
        const $input = $(this);
        const quantity = parseInt($input.val());
        
        // Đảm bảo số lượng không âm
        if (isNaN(quantity) || quantity < 1) {
            $input.val(1);
            updateCartItem($input.data('index'), 1);
        } else {
            updateCartItem($input.data('index'), quantity);
        }
    });
    
    // Bắt sự kiện khi người dùng nhấn nút tăng/giảm số lượng
    $(document).on('click', '.btn-decrease', function() {
        const $input = $(this).siblings('.cart-quantity');
        let quantity = parseInt($input.val());
        if (quantity > 1) {
            $input.val(--quantity);
            updateCartItem($input.data('index'), quantity);
        }
    });
    
    $(document).on('click', '.btn-increase', function() {
        const $input = $(this).siblings('.cart-quantity');
        let quantity = parseInt($input.val());
        $input.val(++quantity);
        updateCartItem($input.data('index'), quantity);
    });
    
    // Bắt sự kiện khi người dùng nhấn nút xóa sản phẩm
    $(document).on('click', '.btn-delete', function() {
        const index = $(this).data('index');
        removeCartItem(index);
    });
    
    // Bắt sự kiện khi người dùng nhấn nút thanh toán
    $(document).on('click', '#checkout-btn', function() {
        checkout();
    });
});

/**
 * Hiển thị sản phẩm trong giỏ hàng
 */
function displayCartItems() {
    // Sử dụng hàm từ utils.js để lấy giỏ hàng
    const cartProducts = getCartItems();
    const $cartContainer = $('#cart-container');
    
    if (!cartProducts || cartProducts.length === 0) {
        // Hiển thị thông báo giỏ hàng trống
        $cartContainer.html(`
            <div class="text-center py-5">
                <h3>Giỏ hàng của bạn đang trống</h3>
                <p class="mt-3">Hãy tiếp tục mua sắm để thêm sản phẩm vào giỏ hàng</p>
                <a href="index.html" class="btn btn-primary mt-3">Tiếp tục mua sắm</a>
            </div>
        `);
        return;
    }
    
    // Tạo bảng giỏ hàng
    let cartHtml = `
        <div class="container mt-4 mb-5">
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng giá</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Thêm từng sản phẩm vào bảng
    cartProducts.forEach((product, index) => {
        const productTotal = product.price * product.quantity;
        
        // Đảm bảo ID sản phẩm và category được truyền đúng
        const productId = parseInt(product.id);
        const productCategory = product.category || '';
        
        // Kiểm tra giá trị hợp lệ trước khi hiển thị
        if (isNaN(productId) || !productCategory) {
            console.log('Sản phẩm thiếu thông tin:', product);
        }
        
        cartHtml += `
            <tr>
                <td class="align-middle">
                    <div class="d-flex align-items-center">
                        <a href="product-detail.html?id=${productId}&category=${encodeURIComponent(productCategory)}" class="text-decoration-none text-dark">
                            <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 100px; object-fit: contain;" class="me-3">
                        </a>
                        <a href="product-detail.html?id=${productId}&category=${encodeURIComponent(productCategory)}" class="text-decoration-none text-dark">
                            <strong>${product.name}</strong>
                        </a>
                    </div>
                </td>
                <td class="align-middle">${product.price.toLocaleString()}đ</td>
                <td class="align-middle" style="width: 150px;">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary btn-decrease" type="button">−</button>
                        <input type="number" class="form-control text-center cart-quantity" value="${product.quantity}" min="1" data-index="${index}">
                        <button class="btn btn-outline-secondary btn-increase" type="button">+</button>
                    </div>
                </td>
                <td class="align-middle product-total">${productTotal.toLocaleString()}đ</td>
                <td class="align-middle text-center">
                    <button class="btn btn-sm btn-outline-danger btn-delete" data-index="${index}">Xóa</button>
                </td>
            </tr>
        `;
    });
    
    // Đóng bảng và thêm phần tổng tiền
    cartHtml += `
                    </tbody>
                </table>
            </div>
            
            <div class="row mt-4">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="note" class="form-label">Ghi chú</label>
                        <textarea class="form-control" id="note" rows="3"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Tạm tính</h5>
                            <p class="d-flex justify-content-between mb-2">
                                <span>Tổng tiền:</span>
                                <span class="cart-total">0đ</span>
                            </p>
                            <div class="d-grid gap-2">
                                <button id="checkout-btn" class="btn btn-danger">Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Thêm HTML vào trang
    $cartContainer.html(cartHtml);
    
    // Cập nhật tổng tiền
    updateCartTotal();
}

// Hàm getCartItems() đã được định nghĩa trong utils.js

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
function updateCartItem(index, quantity) {
    let cartProducts = getCartItems();
    
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return;
    
    if (cartProducts[index]) {
        cartProducts[index].quantity = quantity;
        localStorageUtil.set(`cart_${userId}`, cartProducts);
        
        // Cập nhật hiển thị
        const productTotal = cartProducts[index].price * quantity;
        $(`.product-total:eq(${index})`).text(`${productTotal.toLocaleString()}đ`);
        
        // Cập nhật tổng tiền
        updateCartTotal();
        
        // Cập nhật số lượng hiển thị
        updateCartCount();
    }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
function removeCartItem(index) {
    let cartProducts = getCartItems();
    
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return;
    
    // Sử dụng modal xác nhận 
    showConfirmModal(
        'Xóa sản phẩm', 
        'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?', 
        function() {
            const removedProduct = cartProducts[index];
            cartProducts.splice(index, 1);
            localStorageUtil.set(`cart_${userId}`, cartProducts);
            
            // Hiển thị lại giỏ hàng
            displayCartItems();
            
            // Hiển thị thông báo
            showToast(`Đã xóa sản phẩm "${removedProduct.name}" khỏi giỏ hàng`, 'success');
            
            // Cập nhật số lượng sản phẩm trong giỏ hàng
            updateCartCount();
        }
    );
}

/**
 * Cập nhật tổng tiền giỏ hàng
 */
function updateCartTotal() {
    // Sử dụng hàm getCartItems() từ utils.js để lấy giỏ hàng theo ID người dùng
    const cartProducts = getCartItems();
    let total = 0;
    
    cartProducts.forEach(product => {
        total += product.price * product.quantity;
    });
    
    $('.cart-total').text(`${total.toLocaleString()}đ`);
}

/**
 * Xử lý thanh toán
 */
function checkout() {
    const cartProducts = getCartItems();
    
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Nếu chưa đăng nhập, không thực hiện
    if (!userId) return;
    
    if (cartProducts.length === 0) {
        showToast('Giỏ hàng của bạn đang trống!', 'warning');
        return;
    }
    
    // Thêm modal xác nhận khi thanh toán
    showConfirmModal(
        'Xác nhận đặt hàng',
        `Bạn có chắc chắn muốn đặt hàng với ${cartProducts.length} sản phẩm?`,
        function() {
            // Giả lập quá trình thanh toán
            showToast('Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý.', 'success');
            
            // Xóa giỏ hàng sau khi thanh toán
            localStorageUtil.remove(`cart_${userId}`);
            
            // Hiển thị lại trang
            displayCartItems();
            
            // Cập nhật số lượng sản phẩm trong giỏ hàng
            updateCartCount();
        }
    );
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng trên thanh điều hướng
 */
function updateCartCount() {
    // Sử dụng hàm getCartItems() từ utils.js để lấy giỏ hàng theo ID người dùng
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

// Thêm CSS cho toast nếu chưa có
$(document).ready(function() {
    if (!$('#toast-styles').length) {
        $('head').append(`
            <style id="toast-styles">
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