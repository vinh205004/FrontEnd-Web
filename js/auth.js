/**
 * File auth.js - Xử lý chức năng đăng ký và đăng nhập sử dụng jQuery
 */

$(document).ready(function() {
    // Xử lý hiển thị/ẩn mật khẩu
    setupPasswordToggle();
    
    // Khởi tạo form đăng ký nếu tồn tại
    if ($('#registerForm').length) {
        setupRegisterForm();
    }
    
    // Khởi tạo form đăng nhập nếu tồn tại
    if ($('#loginForm').length) {
        setupLoginForm();
    }
    
    // Kiểm tra trạng thái đăng nhập và cập nhật giao diện
    updateAuthUI();
});

/**
 * Thiết lập chức năng hiển thị/ẩn mật khẩu
 */
function setupPasswordToggle() {
    $('.toggle-password').on('click', function() {
        const passwordInput = $(this).prev('input');
        const icon = $(this).find('i');
        
        // Đổi kiểu input giữa "password" và "text"
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
}

/**
 * Thiết lập xử lý form đăng ký
 */
function setupRegisterForm() {
    // Kiểm tra độ mạnh mật khẩu khi nhập
    const passwordInput = $('#password');
    const confirmPasswordInput = $('#confirmPassword');
    
    if (passwordInput.length) {
        // Thêm phần tử hiển thị độ mạnh mật khẩu
        const strengthIndicator = $('<div class="password-strength"></div>');
        passwordInput.parent().after(strengthIndicator);
        
        // Theo dõi sự kiện nhập mật khẩu
        passwordInput.on('input', function() {
            checkPasswordStrength($(this).val(), strengthIndicator);
        });
    }
    
    // Xử lý sự kiện submit form
    $('#registerForm').on('submit', function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        const fullName = $('#fullName').val().trim();
        const phone = $('#phone').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const address = $('#address').val().trim();
        
        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            showValidationError(confirmPasswordInput, 'Mật khẩu xác nhận không khớp');
            return;
        }
        
        // Kiểm tra email đã tồn tại chưa
        const users = localStorageUtil.get('users', []);
        if (users.some(user => user.email === email)) {
            showValidationError($('#email'), 'Email này đã được đăng ký');
            return;
        }
        
        // Tạo đối tượng người dùng mới
        const newUser = {
            id: generateUserId(),
            fullName,
            phone,
            email,
            password: password, // Lưu mật khẩu trực tiếp không mã hóa
            address,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Thêm người dùng vào danh sách
        users.push(newUser);
        localStorageUtil.set('users', users);
        
        // Hiển thị thông báo thành công
        showToast('Đăng ký thành công! Vui lòng đăng nhập.', 'success');
        
        // Chuyển hướng đến trang đăng nhập sau 1.5 giây
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

/**
 * Thiết lập xử lý form đăng nhập
 */
function setupLoginForm() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#email').val().trim();
        const password = $('#password').val();
        const rememberMe = $('#rememberMe').is(':checked');
        
        // Tài khoản admin cứng
        if (email === 'admin@admin.com' && password === 'admin123') {
            const adminUser = {
                id: 0,
                fullName: 'Admin',
                email: email,
                role: 'admin'
            };
            const authData = {
                user: adminUser,
                token: generateToken(),
                expiresAt: rememberMe ? null : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            };
            localStorageUtil.set('authData', authData);
            showToast('Đăng nhập admin thành công!', 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
            return;
        }
        
        // Đăng nhập user thường
        const users = localStorageUtil.get('users', []);
        const user = users.find(user => user.email === email);
        
        if (!user || user.password !== password) {
            showToast('Email hoặc mật khẩu không chính xác', 'error');
            return;
        }
        
        // Đăng nhập thành công
        const { password: _, ...userInfo } = user;
        const authData = {
            user: userInfo,
            token: generateToken(),
            expiresAt: rememberMe ? null : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        localStorageUtil.set('authData', authData);
        showToast('Đăng nhập thành công!', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

/**
 * Cập nhật giao diện dựa trên trạng thái đăng nhập
 */
function updateAuthUI() {
    const authData = localStorageUtil.get('authData', null);
    const isLoggedIn = authData && authData.user && (authData.expiresAt === null || new Date(authData.expiresAt) > new Date());
    
    console.log('Auth data:', authData);
    console.log('Is logged in:', isLoggedIn);
    
    if (isLoggedIn) {
        // Tìm container chứa các nút đăng nhập/đăng ký
        const $headerIcons = $('.header-icons');
        console.log('Header icons container:', $headerIcons.length);
        
        if ($headerIcons.length) {
            // Lấy HTML hiện tại của container
            const currentHTML = $headerIcons.html();
            console.log('Current header HTML:', currentHTML);
            
            // Tạo HTML mới với menu dropdown người dùng
            let newHTML = currentHTML;
            
            // Thay thế liên kết đăng nhập và đăng ký bằng menu người dùng
            const loginRegex = /<a href="login\.html".*?<\/a>/;
            const registerRegex = /<a href="register\.html".*?<\/a>/;
            
            if (loginRegex.test(newHTML) && registerRegex.test(newHTML)) {
                // Tạo menu dropdown người dùng
                const userMenuHtml = `
                    <div class="dropdown d-inline-block">
                        <a href="#" class="text-dark text-decoration-none dropdown-toggle me-3" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user-circle me-1"></i> ${authData.user.fullName}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="userDropdown">
                            <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user me-2"></i>Thông tin tài khoản</a></li>
                            
                            <li><a class="dropdown-item" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i>Đăng xuất</a></li>
                        </ul>
                    </div>
                `;
                
                // Xóa cả liên kết đăng nhập và đăng ký
                newHTML = newHTML.replace(loginRegex, userMenuHtml);
                newHTML = newHTML.replace(registerRegex, '');
                
                // Cập nhật HTML của container
                $headerIcons.html(newHTML);
                
                // Thêm xử lý sự kiện đăng xuất
                $('#logoutBtn').on('click', function(e) {
                    e.preventDefault();
                    logout();
                });
                
                console.log('Updated header HTML:', $headerIcons.html());
            }
        }
    }
}

/**
 * Đăng xuất người dùng
 */
function logout() {
    // Lấy thông tin người dùng hiện tại
    const authData = localStorageUtil.get('authData', null);
    const userId = authData && authData.user ? authData.user.id : null;
    
    // Xóa dữ liệu đăng nhập
    localStorageUtil.remove('authData');
    
    // Hiển thị thông báo
    showToast('Đăng xuất thành công!', 'success');
    
    // Tải lại trang
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

/**
 * Kiểm tra độ mạnh của mật khẩu
 * @param {string} password - Mật khẩu cần kiểm tra
 * @param {jQuery} $indicator - Phần tử jQuery hiển thị độ mạnh
 */
function checkPasswordStrength(password, $indicator) {
    // Xóa tất cả các class hiện có
    $indicator.attr('class', 'password-strength');
    
    if (!password) {
        $indicator.css('width', '0');
        return;
    }
    
    // Tính điểm mật khẩu
    let score = 0;
    
    // Độ dài
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Độ phức tạp
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Hiển thị độ mạnh dựa trên điểm
    if (score < 3) {
        $indicator.addClass('strength-weak');
    } else if (score < 5) {
        $indicator.addClass('strength-medium');
    } else {
        $indicator.addClass('strength-strong');
    }
}

/**
 * Hiển thị lỗi xác thực cho một trường input
 * @param {jQuery} $input - Phần tử jQuery input cần hiển thị lỗi
 * @param {string} message - Thông báo lỗi
 */
function showValidationError($input, message) {
    // Thêm class is-invalid
    $input.addClass('is-invalid');
    
    // Tìm hoặc tạo phần tử feedback
    let $feedback = $input.next('.invalid-feedback');
    if (!$feedback.length) {
        $feedback = $('<div class="invalid-feedback"></div>');
        $input.parent().append($feedback);
    }
    
    // Cập nhật nội dung thông báo
    $feedback.text(message);
    
    // Xóa lỗi khi người dùng thay đổi giá trị
    $input.one('input', function() {
        $(this).removeClass('is-invalid');
    });
}

/**
 * Tạo ID ngẫu nhiên cho người dùng mới
 * @returns {string} ID người dùng
 */
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Tạo token xác thực
 * @returns {string} Token xác thực
 */
function generateToken() {
    return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
}

/**
 * Xác minh mật khẩu
 * @param {string} inputPassword - Mật khẩu người dùng nhập vào
 * @param {string} storedPassword - Mật khẩu đã mã hóa lưu trong hệ thống
 * @returns {boolean} Kết quả xác minh
 */
function verifyPassword(inputPassword, storedPassword) {
    return storedPassword === hashPassword(inputPassword);
} 