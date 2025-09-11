/**
 * File profile.js - Xử lý hiển thị và cập nhật thông tin cá nhân người dùng
 */

$(document).ready(function() {
    // Kiểm tra trạng thái đăng nhập
    checkAuthStatus();
    
    // Xử lý sự kiện đăng xuất
    $(document).on('click', '#logoutBtn', function(e) {
        e.preventDefault();
        logout();
    });
    
    // Xử lý sự kiện chỉnh sửa thông tin
    $(document).on('click', '#editProfileBtn', function() {
        showEditForm();
    });
    
    // Xử lý sự kiện hủy chỉnh sửa
    $(document).on('click', '#cancelEditBtn', function() {
        hideEditForm();
    });
    
    // Xử lý sự kiện cập nhật thông tin
    $('#updateProfileForm').on('submit', function(e) {
        e.preventDefault();
        updateProfile();
    });
});

/**
 * Kiểm tra trạng thái đăng nhập
 * Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
 */
function checkAuthStatus() {
    const authData = localStorageUtil.get('authData', null);
    const isLoggedIn = authData && authData.user && (authData.expiresAt === null || new Date(authData.expiresAt) > new Date());
    
    if (!isLoggedIn) {
        // Chưa đăng nhập, chuyển hướng về trang đăng nhập
        showToast('Vui lòng đăng nhập để xem thông tin cá nhân', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    // Đã đăng nhập, hiển thị thông tin người dùng
    displayUserInfo(authData.user);
}

/**
 * Hiển thị thông tin người dùng
 * @param {Object} user - Thông tin người dùng
 */
function displayUserInfo(user) {
    // Tạo HTML hiển thị thông tin người dùng
    const userInfoHTML = `
        <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h4>Thông tin tài khoản</h4>
                <button id="editProfileBtn" class="btn btn-outline-danger">
                    <i class="fas fa-edit me-2"></i>Chỉnh sửa
                </button>
            </div>
            
            <div class="row">
                <div class="col-md-6 mb-3">
                    <p class="text-muted mb-1">Họ và tên</p>
                    <p class="fw-bold">${user.fullName || 'Chưa cập nhật'}</p>
                </div>
                <div class="col-md-6 mb-3">
                    <p class="text-muted mb-1">Số điện thoại</p>
                    <p class="fw-bold">${user.phone || 'Chưa cập nhật'}</p>
                </div>
            </div>
            
            <div class="mb-3">
                <p class="text-muted mb-1">Email</p>
                <p class="fw-bold">${user.email}</p>
            </div>
            
            <div class="mb-3">
                <p class="text-muted mb-1">Địa chỉ</p>
                <p class="fw-bold">${user.address || 'Chưa cập nhật'}</p>
            </div>
            
            <div class="mb-3">
                <p class="text-muted mb-1">Ngày đăng ký</p>
                <p class="fw-bold">${formatDate(user.createdAt)}</p>
            </div>
        </div>
    `;
    
    // Cập nhật nội dung
    $('#profile-info').html(userInfoHTML);
    
    // Điền thông tin vào form chỉnh sửa
    $('#editFullName').val(user.fullName || '');
    $('#editPhone').val(user.phone || '');
    $('#editEmail').val(user.email);
    $('#editAddress').val(user.address || '');
}

/**
 * Hiển thị form chỉnh sửa thông tin
 */
function showEditForm() {
    $('#profile-info').hide();
    $('#edit-profile-form').show();
}

/**
 * Ẩn form chỉnh sửa thông tin
 */
function hideEditForm() {
    $('#edit-profile-form').hide();
    $('#profile-info').show();
}

/**
 * Cập nhật thông tin người dùng
 */
function updateProfile() {
    // Lấy thông tin từ form
    const fullName = $('#editFullName').val().trim();
    const phone = $('#editPhone').val().trim();
    const address = $('#editAddress').val().trim();
    
    // Lấy danh sách người dùng từ localStorage
    const users = localStorageUtil.get('users', []);
    const authData = localStorageUtil.get('authData', null);
    
    if (!authData || !authData.user) {
        showToast('Có lỗi xảy ra, vui lòng đăng nhập lại', 'error');
        return;
    }
    
    // Tìm người dùng hiện tại trong danh sách
    const userIndex = users.findIndex(user => user.id === authData.user.id);
    
    if (userIndex === -1) {
        showToast('Không tìm thấy thông tin người dùng', 'error');
        return;
    }
    
    // Cập nhật thông tin người dùng
    users[userIndex].fullName = fullName;
    users[userIndex].phone = phone;
    users[userIndex].address = address;
    users[userIndex].updatedAt = new Date().toISOString();
    
    // Lưu lại danh sách người dùng
    localStorageUtil.set('users', users);
    
    // Cập nhật thông tin trong authData
    authData.user.fullName = fullName;
    authData.user.phone = phone;
    authData.user.address = address;
    authData.user.updatedAt = users[userIndex].updatedAt;
    
    // Lưu lại authData
    localStorageUtil.set('authData', authData);
    
    // Hiển thị thông báo thành công
    showToast('Cập nhật thông tin thành công', 'success');
    
    // Ẩn form chỉnh sửa và hiển thị lại thông tin người dùng
    hideEditForm();
    displayUserInfo(authData.user);
}

/**
 * Đăng xuất người dùng
 */
function logout() {
    // Xóa dữ liệu đăng nhập
    localStorageUtil.remove('authData');
    
    // Hiển thị thông báo
    showToast('Đăng xuất thành công!', 'success');
    
    // Chuyển hướng về trang chủ
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

/**
 * Định dạng ngày tháng
 * @param {string} dateString - Chuỗi ngày tháng dạng ISO
 * @returns {string} Chuỗi ngày tháng đã định dạng
 */
function formatDate(dateString) {
    if (!dateString) return 'Không xác định';
    
    const date = new Date(dateString);
    
    // Kiểm tra xem date có hợp lệ không
    if (isNaN(date.getTime())) return 'Không xác định';
    
    // Định dạng ngày tháng
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 