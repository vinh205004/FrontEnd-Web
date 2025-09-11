// Kiểm tra quyền admin ở đầu file
(function() {
    const authData = localStorage.getItem('authData') ? JSON.parse(localStorage.getItem('authData')) : null;
    if (!authData || !authData.user || authData.user.email !== 'admin@admin.com') {
        window.location.href = 'login.html';
    }
})();

// Khai báo biến toàn cục ở phạm vi window
let currentProductId = null;
let deleteProductId = null;
let currentAdminPage = 1;
let currentUserPage = 1;
const adminProductsPerPage = 15;
const adminUsersPerPage = 15;

$(document).ready(function() {
    // Hiển thị danh sách sản phẩm ban đầu
    loadProducts(1);
    loadCategories();
    loadUsers();

    // Xử lý tìm kiếm
    $('#searchButton').on('click', function() { applyFilters(); });
    $('#searchInput').on('keyup', function(e) {
        if (e.key === 'Enter') applyFilters();
    });

    // Xử lý lọc theo danh mục
    $('#categoryFilter').on('change', applyFilters);

    // Xử lý lưu sản phẩm (thêm mới hoặc chỉnh sửa)
    $('#saveProduct').on('click', function() {
        // Lấy dữ liệu từ form
        const productId = $('#productId').val();
        const productName = $('#productName').val().trim();
        const productCategory = $('#productCategory').val();
        const productPrice = parseInt($('#productPrice').val());
        const productAuthor = $('#productAuthor').val().trim();
        const productPerson = $('#productPerson').val().trim();
        const productPages = $('#productPages').val().trim();
        const productImage = $('#productImage').val().trim();
        const productDetail = $('#productDetail').val().trim();

        // Validate dữ liệu
        if (!productName || !productCategory || !productPrice || !productAuthor || 
            !productPerson || !productPages || !productImage || !productDetail) {
            showToast('Vui lòng điền đầy đủ thông tin sản phẩm!', 'warning');
            return;
        }

        if (productPrice <= 0) {
            showToast('Giá sản phẩm phải lớn hơn 0!', 'warning');
            return;
        }

        // Tạo object sản phẩm
        const product = {
            id: productId || Date.now(), // Tạo ID mới nếu là thêm mới
            name: productName,
            price: productPrice,
            author: productAuthor,
            person: productPerson,
            pages: productPages,
            image: productImage,
            detail: productDetail
        };

        // Lưu sản phẩm (demo - chỉ hiển thị thông báo)
        if (productId) {
            // Chỉnh sửa sản phẩm
            showToast('Cập nhật sản phẩm thành công!', 'success');
        } else {
            // Thêm sản phẩm mới
            showToast('Thêm sản phẩm mới thành công!', 'success');
        }

        // Đóng modal và reset form
        $('#addProductModal').modal('hide');
        resetProductForm();
        
        // Reload danh sách sản phẩm
        loadProducts(currentAdminPage);
    });

    // Xử lý xóa sản phẩm
    $('#confirmDelete').on('click', function() {
        if (deleteProductId) {
            // Demo xóa sản phẩm
            showToast('Xóa sản phẩm thành công!', 'success');
            $('#deleteModal').modal('hide');
            deleteProductId = null;
            
            // Reload danh sách sản phẩm
            loadProducts(currentAdminPage);
        }
    });

    // Xử lý đăng xuất admin
    $('#logoutAdminBtn').on('click', function() {
        localStorage.removeItem('authData');
        window.location.href = 'login.html';
        setTimeout(function() { window.location.reload(); }, 200);
    });

    // Xử lý chuyển trang - chỉ một event handler duy nhất
    $(document).on('click', '#pagination .page-link', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        if (href && href.includes('page=')) {
            const page = parseInt(href.split('page=')[1]);
            if (!isNaN(page)) {
                // Kiểm tra tab hiện tại
                if ($('#users').hasClass('active')) {
                    const searchTerm = $('#userSearchInput').val() || '';
                    loadUsers(searchTerm, page);
                } else {
                    loadProducts(page);
                }
            }
        }
    });

    // Xử lý chuyển tab
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        const target = $(e.target).attr('href');
        if (target === '#users') {
            loadUsers('', 1);
        } else if (target === '#products') {
            loadProducts(currentAdminPage);
        }
    });

    // Tìm kiếm người dùng
    $('#userSearchButton').on('click', function() { applyUserFilters(); });
    $('#userSearchInput').on('keyup', function(e) {
        if (e.key === 'Enter') applyUserFilters();
    });

    // Đăng xuất ở tab tài khoản
    $(document).on('click', '#logoutUserBtn', function() {
        localStorage.removeItem('authData');
        window.location.href = 'login.html';
        setTimeout(function() { window.location.reload(); }, 200);
    });

    // Xử lý khi mở modal thêm sản phẩm mới
    $(document).on('click', '[data-bs-target="#addProductModal"]', function() {
        resetProductForm();
    });

    // Xử lý khi đóng modal
    $('#addProductModal').on('hidden.bs.modal', function() {
        resetProductForm();
    });
});

function loadProducts(page = 1) {
    const $tbody = $('#productsTableBody');
    $tbody.empty();

    // Lọc sản phẩm theo danh mục và tìm kiếm
    const searchTerm = $('#searchInput').val() ? $('#searchInput').val().toLowerCase() : '';
    const selectedCategory = $('#categoryFilter').val();

    let allProducts = [];
    for (const category in productData) {
        if (!selectedCategory || category === selectedCategory) {
            productData[category].forEach(product => {
                if (!searchTerm || JSON.stringify(product).toLowerCase().includes(searchTerm)) {
                    allProducts.push({ ...product, category });
                }
            });
        }
    }

    // Phân trang
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / adminProductsPerPage);
    const startIndex = (page - 1) * adminProductsPerPage;
    const endIndex = Math.min(startIndex + adminProductsPerPage, totalProducts);
    const productsToShow = allProducts.slice(startIndex, endIndex);

    productsToShow.forEach(productObj => {
        const row = createProductRow(productObj, productObj.category);
        $tbody.append(row);
    });

    // Gọi phân trang cho products
    createProductsPagination(page, totalPages);

    // Lưu lại trang hiện tại
    currentAdminPage = page;
}

function createProductRow(product, category) {
    return `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>${category}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${product.author}</td>
            <td>${product.person}</td>
            <td>${product.pages}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action me-1" onclick="editProduct('${product.id}', '${category}')" title="Chỉnh sửa">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="confirmDeleteProduct('${product.id}', '${product.name}')" title="Xóa">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

function loadCategories() {
    const $categoryFilter = $('#categoryFilter');
    const $productCategory = $('#productCategory');
    $categoryFilter.empty().append('<option value="">Tất cả danh mục</option>');
    $productCategory.empty();
    for (const category in productData) {
        const option = `<option value="${category}">${category}</option>`;
        $categoryFilter.append(option);
        $productCategory.append(option);
    }
}

function applyFilters() {
    loadProducts(1); // Reset về trang 1 khi lọc/tìm kiếm
}

// Sử dụng showToast từ utils.js
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' đ';
}

// Thêm các hàm mới để quản lý users
function loadUsers(searchTerm = '', page = 1) {
    const $tbody = $('#usersTableBody');
    $tbody.empty();

    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Lọc theo tên
    const filteredUsers = users.filter(user => {
        const name = (user.fullName || user.name || '').toLowerCase();
        return !searchTerm || name.includes(searchTerm.toLowerCase());
    });

    // Phân trang
    const totalUsers = filteredUsers.length;
    const totalPages = Math.ceil(totalUsers / adminUsersPerPage);
    const startIndex = (page - 1) * adminUsersPerPage;
    const endIndex = Math.min(startIndex + adminUsersPerPage, totalUsers);
    const usersToShow = filteredUsers.slice(startIndex, endIndex);

    usersToShow.forEach(user => {
        const row = createUserRow(user);
        $tbody.append(row);
    });

    // Gọi phân trang cho users
    createUsersPagination(page, totalPages);

    // Lưu lại trang hiện tại
    currentUserPage = page;
}

function createUserRow(user) {
    return `
        <tr>
            <td>${user.email}</td>
            <td>${user.fullName || user.name || 'N/A'}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>${user.address || 'N/A'}</td>
            <td>${user.password || 'N/A'}</td>
            <td>
                <button class="btn btn-sm btn-primary btn-action" onclick="editUser('${user.email}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteUser('${user.email}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
}

// Tạo phân trang riêng cho products
function createProductsPagination(currentPage, totalPages) {
    const $pagination = $('#pagination');
    $pagination.empty();

    if (totalPages <= 1) {
        $('.pagination-container').hide();
        return;
    }

    $('.pagination-container').show();

    // Nút trước
    if (currentPage > 1) {
        $pagination.append(`<li class="page-item"><a class="page-link" href="?page=${currentPage - 1}">Trước</a></li>`);
    }

    // Số trang
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        $pagination.append(`<li class="page-item ${activeClass}"><a class="page-link" href="?page=${i}">${i}</a></li>`);
    }

    // Nút tiếp
    if (currentPage < totalPages) {
        $pagination.append(`<li class="page-item"><a class="page-link" href="?page=${currentPage + 1}">Tiếp</a></li>`);
    }
}

// Tạo phân trang riêng cho users
function createUsersPagination(currentPage, totalPages) {
    const $pagination = $('#pagination');
    $pagination.empty();

    if (totalPages <= 1) {
        $('.pagination-container').hide();
        return;
    }

    $('.pagination-container').show();

    // Nút trước
    if (currentPage > 1) {
        $pagination.append(`<li class="page-item"><a class="page-link" href="?page=${currentPage - 1}">Trước</a></li>`);
    }

    // Số trang
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        $pagination.append(`<li class="page-item ${activeClass}"><a class="page-link" href="?page=${i}">${i}</a></li>`);
    }

    // Nút tiếp
    if (currentPage < totalPages) {
        $pagination.append(`<li class="page-item"><a class="page-link" href="?page=${currentPage + 1}">Tiếp</a></li>`);
    }
}

function editUser(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);
    
    if (user) {
        $('#editUserEmail').val(user.email);
        $('#editUserName').val(user.fullName || '');
        $('#editUserPhone').val(user.phone || '');
        $('#editUserAddress').val(user.address || '');
        $('#editUserPassword').val(''); // Clear password field
        $('#editUserModal').modal('show');
    }
}

function deleteUser(email) {
    showConfirmModal(
        'Xác nhận xóa tài khoản',
        'Bạn có chắc chắn muốn xóa tài khoản này?',
        function() {
            // Callback khi xác nhận xóa
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUsers = users.filter(user => user.email !== email);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            // Reload users với trang hiện tại, nhưng nếu trang hiện tại không còn data thì về trang 1
            const searchTerm = $('#userSearchInput').val() || '';
            const remainingUsers = updatedUsers.filter(user => {
                const name = (user.fullName || user.name || '').toLowerCase();
                return !searchTerm || name.includes(searchTerm.toLowerCase());
            });
            
            const totalPages = Math.ceil(remainingUsers.length / adminUsersPerPage);
            const pageToLoad = currentUserPage > totalPages ? Math.max(1, totalPages) : currentUserPage;
            
            loadUsers(searchTerm, pageToLoad);
            showToast('Đã xóa tài khoản thành công!', 'success');
        }
    );
}

// Xử lý sự kiện lưu thông tin user
$(document).on('click', '#saveUserEdit', function() {
    const email = $('#editUserEmail').val();
    const name = $('#editUserName').val();
    const phone = $('#editUserPhone').val();
    const address = $('#editUserAddress').val();
    const newPassword = $('#editUserPassword').val();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        const updatedUser = {
            ...users[userIndex],
            fullName: name,
            phone: phone,
            address: address
        };

        // Chỉ cập nhật password nếu có mới
        if (newPassword) {
            updatedUser.password = newPassword;
        }

        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        $('#editUserModal').modal('hide');
        
        const searchTerm = $('#userSearchInput').val() || '';
        loadUsers(searchTerm, currentUserPage);
        showToast('Cập nhật thông tin thành công!', 'success');
    }
});

function applyUserFilters() {
    const searchTerm = $('#userSearchInput').val() || '';
    loadUsers(searchTerm, 1);
}

// Hàm chỉnh sửa sản phẩm
function editProduct(productId, category) {
    // Tìm sản phẩm trong dữ liệu
    const product = findProductById(productId, category);
    
    if (product) {
        // Điền dữ liệu vào form
        $('#productId').val(product.id);
        $('#productName').val(product.name);
        $('#productCategory').val(category);
        $('#productPrice').val(product.price);
        $('#productAuthor').val(product.author);
        $('#productPerson').val(product.person);
        $('#productPages').val(product.pages);
        $('#productImage').val(product.image);
        $('#productDetail').val(product.detail);
        
        // Thay đổi title modal
        $('#addProductModal .modal-title').text('Chỉnh sửa sản phẩm');
        
        // Hiển thị modal
        $('#addProductModal').modal('show');
    } else {
        showToast('Không tìm thấy sản phẩm!', 'error');
    }
}

// Hàm xác nhận xóa sản phẩm
function confirmDeleteProduct(productId, productName) {
    deleteProductId = productId;
    
    showConfirmModal(
        'Xác nhận xóa sản phẩm',
        `Bạn có chắc chắn muốn xóa sản phẩm "<strong>${productName}</strong>"?`,
        function() {
            // Callback khi xác nhận xóa
            showToast('Xóa sản phẩm thành công!', 'success');
            deleteProductId = null;
            
            // Reload danh sách sản phẩm
            loadProducts(currentAdminPage);
        },
        function() {
            // Callback khi hủy
            deleteProductId = null;
        }
    );
}

// Hàm tìm sản phẩm theo ID và category
function findProductById(productId, category) {
    if (productData[category]) {
        return productData[category].find(product => product.id == productId);
    }
    return null;
}

// Hàm reset form và title modal
function resetProductForm() {
    $('#productId').val('');
    $('#productName').val('');
    $('#productImage').val('');
    $('#productPrice').val('');
    $('#productAuthor').val('');
    $('#productPerson').val('');
    $('#productPages').val('');
    $('#productDetail').val('');
    $('#productCategory').val('');
    
    // Reset title modal về thêm mới
    $('#addProductModal .modal-title').text('Thêm sản phẩm mới');
}

// Xử lý thêm người dùng mới
$(document).on('click', '#saveNewUser', function() {
    const email = $('#newUserEmail').val().trim();
    const name = $('#newUserName').val().trim();
    const phone = $('#newUserPhone').val().trim();
    const address = $('#newUserAddress').val().trim();
    const password = $('#newUserPassword').val().trim();

    // Kiểm tra trường bắt buộc
    if (!email || !name || !password) {
        showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'warning');
        return;
    }

    // Định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Email không hợp lệ!', 'warning');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra email tồn tại
    if (users.some(user => user.email === email)) {
        showToast('Email đã tồn tại!', 'warning');
        return;
    }

    // tạo người dùng mới
    const newUser = {
        id: Date.now(), // Tạo ID ngẫu nhiên
        email: email,
        fullName: name,
        phone: phone,
        address: address,
        password: password, // Lưu mật khẩu trực tiếp không mã hóa
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    // Thêm người dùng vào localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Đóng modal và reset form
    $('#addUserModal').modal('hide');
    $('#addUserForm')[0].reset();

    // Reload users list
    const searchTerm = $('#userSearchInput').val() || '';
    loadUsers(searchTerm, 1);
    showToast('Thêm người dùng mới thành công!', 'success');
});

// Reset form when modal is closed
$('#addUserModal').on('hidden.bs.modal', function() {
    $('#addUserForm')[0].reset();
});