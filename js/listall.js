/**
 * Hàm lấy tham số từ URL
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Template HTML cho sản phẩm
const productCardTemplate = (product, productCategory) => `
  <div class="col-lg-2 col-md-3 col-sm-4 col-6 mb-3 px-2">
    <div class="card h-100 shadow-sm product-card">
      <a href="product-detail.html?id=${parseInt(product.id)}&category=${encodeURIComponent(productCategory)}" class="text-decoration-none text-dark">
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

$(document).ready(function() {
  // Cache selectors
  const $bookList = $('#book-list');
  const $categoryTitle = $('#category-title');
  const $breadcrumbNav = $('.breadcrumb-nav');
  const $sortSelect = $('#sort-select');
  
  // Thêm loading indicator
  $bookList.html(`
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3">Đang tải sản phẩm...</p>
    </div>
  `);
  
  // Lấy tham số từ URL
  const category = getQueryParam('category');
  const searchTerm = getQueryParam('search');
  const currentPage = parseInt(getQueryParam('page')) || 1;
  const sortBy = getQueryParam('sort') || 'name-asc';
  const productsPerPage = 18; // Tăng số sản phẩm trên mỗi trang
  
  let booksInCategory = [];
  
  // Đọc trạng thái bộ lọc giá từ URL
  function getPriceRangesFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const priceParam = urlParams.get('price');
    if (!priceParam || priceParam === 'all') return ['all'];
    return priceParam.split(',');
  }

  // Set lại trạng thái checkbox theo URL 
  function setPriceCheckboxes(priceRanges) {
    $('#price-filter-form input[type=checkbox]').prop('checked', false);
    if (priceRanges.includes('all')) {
      $('#price-all').prop('checked', true);
    } else {
      priceRanges.forEach(function(val) {
        $('#price-filter-form input[type=checkbox][value="' + val + '"]').prop('checked', true);
      });
    }
  }

  // Lấy trạng thái price từ URL KHI LOAD TRANG và set checkbox
  let selectedPriceRanges = getPriceRangesFromURL();
  setPriceCheckboxes(selectedPriceRanges);
  
  // Tùy chỉnh giao diện dropdown sắp xếp
  addSortSelectStyles();
  
  // Cập nhật select box sắp xếp
  if ($sortSelect.length) {
    $sortSelect.val(sortBy);
    
    // Xử lý sự kiện khi thay đổi cách sắp xếp
    $sortSelect.on('change', function() {
      // Tạo URL mới với tham số sắp xếp
      let url = new URL(window.location.href);
      url.searchParams.set('sort', $(this).val());
      url.searchParams.set('page', '1'); // Reset về trang 1 khi thay đổi sắp xếp
      window.location.href = url.toString();
    });
  }
  
  // Hàm tìm sản phẩm theo từ khóa
  function findProductsBySearchTerm(term) {
    let results = [];
    const termLower = term.toLowerCase();
    
    $.each(productData, function(cat, products) {
      // Lọc sản phẩm có tên hoặc tác giả chứa từ khóa tìm kiếm
      const matchingProducts = products.filter(product => 
        product.name.toLowerCase().includes(termLower) ||
        (product.author && product.author.toLowerCase().includes(termLower))
      );
      
      // Thêm thông tin danh mục gốc
      matchingProducts.forEach(product => {
        results.push({...product, originalCategory: cat});
      });
    });
    
    return results;
  }
  
  // Xử lý tìm kiếm (ưu tiên nếu có cả tìm kiếm và danh mục)
  if (searchTerm) {
    $categoryTitle.text(`Kết quả tìm kiếm: "${searchTerm}"`);
    
    // Tìm sản phẩm có từ khóa trong tên từ mọi danh mục
    booksInCategory = findProductsBySearchTerm(searchTerm);
    
    // Cập nhật breadcrumb
    $breadcrumbNav.html(`
      <a href="index.html">Trang chủ</a> > 
      <span>Tìm kiếm: ${searchTerm}</span>
    `);
  }
  // Xử lý hiển thị theo danh mục
  else if (category === 'all') {
    $categoryTitle.text('Tất cả sản phẩm');
    
    // Gộp tất cả sản phẩm từ mọi danh mục
    $.each(productData, function(cat, products) {
      // Lưu thêm thông tin danh mục gốc cho mỗi sản phẩm
      products.forEach(product => {
        booksInCategory.push({...product, originalCategory: cat});
      });
    });
    
    // Cập nhật breadcrumb
    $breadcrumbNav.html(`
      <a href="index.html">Trang chủ</a> > 
      <span>Tất cả sản phẩm</span>
    `);
  } else if (category) {
    $categoryTitle.text(category);
    
    if (productData[category]) {
      // Lưu thêm thông tin danh mục gốc
      productData[category].forEach(product => {
        booksInCategory.push({...product, originalCategory: category});
      });
      
      // Cập nhật breadcrumb
      $breadcrumbNav.html(`
        <a href="index.html">Trang chủ</a> > 
        <span>${category}</span>
      `);
    }
  }
  
  // Xử lý khi không có sản phẩm
  if (booksInCategory.length === 0) {
    let message = searchTerm 
      ? 'Không tìm thấy sản phẩm phù hợp với từ khóa tìm kiếm.' 
      : 'Không có sách nào để hiển thị.';
    $bookList.html(`<div class="col-12 text-center my-5"><h3>${message}</h3></div>`);
    return;
  }
  
  // Hiển thị số lượng sản phẩm tìm thấy
  if (searchTerm) {
    $categoryTitle.append(` <small class="text-muted">(${booksInCategory.length} sản phẩm)</small>`);
  }
  
  // Sắp xếp sản phẩm theo tiêu chí được chọn
  sortProducts(booksInCategory, sortBy);
  
  // Hàm lọc sản phẩm theo khoảng giá
  function filterByPrice(products, priceRanges) {
    if (priceRanges.includes('all')) return products;
    return products.filter(product => {
      return priceRanges.some(range => {
        if (range === '<100000') return product.price < 50000;
        if (range === '100000-200000') return product.price >= 50000 && product.price <= 100000;
        if (range === '200000-300000') return product.price > 100000 && product.price <= 200000;
        if (range === '300000-400000') return product.price > 200000 && product.price <= 400000;
        if (range === '400000-500000') return product.price > 400000 && product.price <= 500000;
        if (range === '>500000') return product.price > 500000;
        return false;
      });
    });
  }

  // Sự kiện thay đổi bộ lọc giá
  $(document).on('change', '#price-filter-form input[type=checkbox]', function() {
    // Nếu chọn "Tất cả" thì bỏ chọn các ô khác
    if (this.value === 'all' && this.checked) {
      $('#price-filter-form input[type=checkbox]').not(this).prop('checked', false);
      selectedPriceRanges = ['all'];
    } else {
      $('#price-filter-form #price-all').prop('checked', false);
      selectedPriceRanges = $('#price-filter-form input[type=checkbox]:checked').map(function() {
        return this.value;
      }).get();
      if (selectedPriceRanges.length === 0) {
        $('#price-filter-form #price-all').prop('checked', true);
        selectedPriceRanges = ['all'];
      }
    }
    // Cập nhật lại URL với price filter, reset về page 1
    let url = new URL(window.location.href);
    if (selectedPriceRanges.includes('all')) {
      url.searchParams.delete('price');
    } else {
      url.searchParams.set('price', selectedPriceRanges.join(','));
    }
    url.searchParams.set('page', '1');
    window.location.href = url.toString();
  });

  // Hàm render lại sản phẩm
  function renderProducts() {
    
    let filteredProducts = filterByPrice(booksInCategory, selectedPriceRanges);
    
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, totalProducts);
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Render sản phẩm
    $bookList.empty().addClass('justify-content-center');
    const productsHtml = currentProducts.map(product => 
      productCardTemplate(product, product.originalCategory || category)
    ).join('');
    $bookList.html(productsHtml);
    
    // Cập nhật thông tin phân trang
    const $paginationInfo = $('.pagination-info');
    if ($paginationInfo.length) {
      $paginationInfo.html(`Hiển thị ${startIndex + 1}-${endIndex} trong tổng số ${totalProducts} sản phẩm`);
    }
    
    addProductCardStyles();
    
    // Xử lý phân trang 
    $('.pagination-container').hide();
    $('#pagination').empty();
    
    // CHỈ hiển thị phân trang khi có nhiều hơn 18 sản phẩm
    if (totalProducts > productsPerPage) {
      createPagination(currentPage, totalPages, category, searchTerm, sortBy, totalProducts, productsPerPage);
    }
  }

  // Render sản phẩm
  renderProducts();
});

/**
 * Thêm CSS cho product card
 */
function addProductCardStyles() {
  if (!$('#product-list-styles').length) {
    $('head').append(`
      <style id="product-list-styles">
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
        .book-name {
          height: 40px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition: color 0.3s;
        }
        .book-author {
          height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .view-detail-btn {
          pointer-events: none;
          transition: background-color 0.3s, color 0.3s;
        }
        .product-card:hover .view-detail-btn {
          background-color: #0b5ed7;
          color: white;
        }
      </style>
    `);
  }
}

/**
 * Sắp xếp sản phẩm theo tiêu chí được chọn
 */
function sortProducts(products, sortBy) {
  switch(sortBy) {
    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      // Nếu có trường ngày thêm, sắp xếp theo ngày
      if (products[0] && products[0].dateAdded) {
        products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      }
      break;
    default:
      products.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Thêm CSS cho dropdown sắp xếp
 */
function addSortSelectStyles() {
  if (!$('#sort-select-styles').length) {
    $('head').append(`
      <style id="sort-select-styles">
        .sort-container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .sort-container label {
          font-weight: 500;
          margin-right: 8px;
          color: #555;
        }
        #sort-select {
          min-width: 145px;
          padding: 6px 28px 6px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #f8f9fa;
          cursor: pointer;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 14px;
          font-size: 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        #sort-select:hover {
          border-color: #aaa;
        }
        #sort-select:focus {
          outline: none;
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
        }
      </style>
    `);
  }
}