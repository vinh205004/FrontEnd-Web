$(document).ready(function() {
    const $searchInput = $("#searchInput");
    const $suggestionsBox = $("#search-suggestions");
    const $searchForm = $("#searchForm");
    
    // Xử lý sự kiện submit form tìm kiếm
    $searchForm.on("submit", function(e) {
        e.preventDefault();
        const searchTerm = $searchInput.val().trim();
        
        if (searchTerm) {
            // Chuyển hướng đến trang category.html với tham số tìm kiếm
            window.location.href = "category.html?search=" + encodeURIComponent(searchTerm);
        }
    });

    // Sử dụng debounce để tránh quá nhiều request khi người dùng gõ nhanh
    let searchTimeout;
    
    // Hiển thị gợi ý tìm kiếm khi người dùng nhập
    $searchInput.on("input", function() {
        const searchTerm = $(this).val().trim().toLowerCase();
        
        // Xóa timeout cũ nếu có
        clearTimeout(searchTimeout);
        
        if (!searchTerm) {
            $suggestionsBox.empty().hide();
            return;
        }
        
        // Thêm loading indicator
        $suggestionsBox.html('<div class="list-group-item text-center"><div class="spinner-border spinner-border-sm text-primary" role="status"></div> Đang tìm...</div>').show();
        
        // Đặt timeout mới (300ms)
        searchTimeout = setTimeout(function() {
            // Tìm các sản phẩm phù hợp với từ khóa tìm kiếm
            let matchedProducts = [];
            
            // Tìm kiếm trong tất cả các danh mục sản phẩm
            for (const category in productData) {
                const productsInCategory = productData[category].filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    (product.author && product.author.toLowerCase().includes(searchTerm))
                ).map(product => ({...product, category}));
                
                matchedProducts = [...matchedProducts, ...productsInCategory];
            }
            
            // Sắp xếp kết quả theo độ phù hợp
            matchedProducts.sort((a, b) => {
                // Ưu tiên kết quả có từ khóa ở đầu tên
                const aStartsWithTerm = a.name.toLowerCase().startsWith(searchTerm);
                const bStartsWithTerm = b.name.toLowerCase().startsWith(searchTerm);
                
                if (aStartsWithTerm && !bStartsWithTerm) return -1;
                if (!aStartsWithTerm && bStartsWithTerm) return 1;
                
                // Sau đó ưu tiên theo độ dài tên (tên ngắn hơn thường phù hợp hơn)
                return a.name.length - b.name.length;
            });
            
            // Giới hạn số lượng gợi ý hiển thị
            matchedProducts = matchedProducts.slice(0, 5);
            
            // Hiển thị gợi ý
            $suggestionsBox.empty();
            
            if (matchedProducts.length > 0) {
                const suggestions = matchedProducts.map(product => `
                    <a href="product-detail.html?id=${product.id}&category=${encodeURIComponent(product.category)}" class="list-group-item list-group-item-action">
                        <div class="d-flex align-items-center">
                            <img src="${product.image}" alt="${product.name}" class="suggestion-img">
                            <div class="ms-2">
                                <div class="text-truncate">${product.name}</div>
                                <small class="text-muted">${product.category}</small>
                            </div>
                        </div>
                    </a>
                `).join('');
                
                $suggestionsBox.html(suggestions).show();
            } else {
                $suggestionsBox.html('<div class="list-group-item">Không tìm thấy sản phẩm</div>').show();
            }
        }, 300);
    });
    
    // Ẩn gợi ý khi click ra ngoài
    $(document).on("click", function(e) {
        if (!$(e.target).closest(".search-container").length) {
            $suggestionsBox.empty().hide();
        }
    });
    
    // Điều hướng với phím mũi tên và tự động sử dụng kết quả tìm kiếm đầu tiên khi nhấn Enter
    $searchInput.on("keydown", function(e) {
        if (!$suggestionsBox.is(":visible")) return;
        
        const $suggestions = $suggestionsBox.find(".list-group-item");
        const $highlighted = $suggestions.filter(".active");
        let $next;
        
        switch(e.key) {
            case "ArrowDown":
                e.preventDefault();
                if ($highlighted.length) {
                    $next = $highlighted.next(".list-group-item");
                    if ($next.length) {
                        $highlighted.removeClass("active");
                        $next.addClass("active");
                    }
                } else {
                    $suggestions.first().addClass("active");
                }
                break;
                
            case "ArrowUp":
                e.preventDefault();
                if ($highlighted.length) {
                    $next = $highlighted.prev(".list-group-item");
                    if ($next.length) {
                        $highlighted.removeClass("active");
                        $next.addClass("active");
                    }
                } else {
                    $suggestions.last().addClass("active");
                }
                break;
                
            case "Enter":
                if ($highlighted.length && $highlighted.is("a")) {
                    e.preventDefault();
                    window.location.href = $highlighted.attr("href");
                } else if ($suggestions.first().is("a")) {
                    e.preventDefault();
                    window.location.href = $suggestions.first().attr("href");
                }
                break;
                
            case "Escape":
                e.preventDefault();
                $suggestionsBox.empty().hide();
                break;
        }
    });
    
    // Thêm sự kiện hover cho các gợi ý
    $suggestionsBox.on("mouseenter", ".list-group-item", function() {
        $suggestionsBox.find(".list-group-item").removeClass("active");
        $(this).addClass("active");
    });
    
    // Style cho dropdown suggestion
    if (!$("#search-styles").length) {
        $("head").append(`
            <style id="search-styles">
                .search-container {
                    position: relative;
                }
                #search-suggestions {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    max-height: 350px;
                    overflow-y: auto;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
                }
                #search-suggestions .list-group-item {
                    border-radius: 0;
                    border-left: none;
                    border-right: none;
                }
                #search-suggestions .list-group-item:first-child {
                    border-top: none;
                }
                .suggestion-img {
                    width: 40px;
                    height: 50px;
                    object-fit: contain;
                }
                #search-suggestions .list-group-item.active {
                    background-color: #f0f0f0;
                    color: inherit;
                }
            </style>
        `);
    }
});