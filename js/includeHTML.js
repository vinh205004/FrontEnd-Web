/**
 * jQuery function để thực hiện include HTML từ file riêng biệt
 * Sử dụng attribute include-html để chỉ định file cần nhúng
 */
$(document).ready(function() {
    // Tìm tất cả các phần tử có thuộc tính include-html
    $('[include-html]').each(function() {
        const $element = $(this);
        const file = $element.attr('include-html');
        
        if (file) {
            // Sử dụng jQuery AJAX để load nội dung
            $.ajax({
                url: file,
                success: function(response) {
                    // Thay thế nội dung phần tử với HTML được load
                    $element.html(response);
                },
                error: function(xhr, status) {
                    // Xử lý trường hợp lỗi
                    $element.html(`<p>Component not found: ${file}</p>`);
                },
                complete: function() {
                    // Xóa thuộc tính include-html sau khi đã xử lý
                    $element.removeAttr('include-html');
                }
            });
        }
    });
});
