const productData = {
    "Lịch sử, truyền thống": [
      {
        id: 1,
        name: "Bác Hồ-Tấm gương đoàn kết",
        image: "../images/Products/Lịch sử/l1.png",
        price: 27000, 
        author: "Phạm Văn Hòa",
        person: "Thiếu niên(11-15)",
        pages: "120",
        detail: "ĐOÀN KẾT là kết thành một khối thống nhất, cùng hoạt động vì một mục đích chung. Tinh thần đoàn kết rất quan trọng, cần nhất quán, gắn bó, thống nhất một lòng, có thế sức mạnh và trí tuệ mới nhân lên, vượt qua được những thử thách của cuộc sống. Để thực sự đoàn kết, một trong những yếu tố quan trọng cần nuôi dưỡng chính là tình yêu thương, sự đồng cảm, chia sẻ lẫn nhau. Và như vậy mới có thể giúp đỡ, hỗ trợ, vì cộng đồng. Để rèn luyện đức tính đoàn kết, chúng ta nên rèn luyện, xây dựng tinh thần đồng đội, tăng cường kĩ năng hợp tác, giao tiếp, giải quyết vấn đề, gây dựng niềm tin, biết đồng thuận cũng như tôn trọng sự khác biệt."
      },
      {
        id: 2,
        name: "Chuyện ở đồi A1",
        image: "../images/Products/Lịch sử/l2.png",
        price: 82000,
        author: "Nguyễn Tân",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "144",
        detail: "Chiều tối mùa đông, ngày 22 tháng 12 năm 1944, giữa rừng già tịch mịch và đất trời uy nghi, 34 cán bộ, chiến sĩ đã cất lên lời thề thiêng liêng, chiến đấu, hi sinh vì độc lập, tự do, vì nước non vững bền... Đội Việt Nam Tuyên truyền Giải phóng quân, tiền thân của Quân đội nhân dân Việt Nam anh hùng đã ra đời như thế…"
      },
      {
        id: 3,
        name: "Đội Việt Nam tuyên truyền giải phóng quân",
        image: "../images/Products/Lịch sử/l3.png",
        price: 32000,
        author: "Nguyễn Mạnh Hà",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "252",
        detail: "“Người ta có thể đánh bại một quân đội chứ không thể đánh bại được một dân tộc.” - Tướng De Castries (Đờ Cát)"
      },
      {
        id: 4,
        name: "Kim Đồng",
        image: "../images/Products/Lịch sử/l4.png",
        price: 39000,
        author: "Tô Hoài",
        person: "Thiếu niên(11-15), Thiếu nhi(6-11)",
        pages: "124",
        detail: "Cậu bé Nông Văn Dền quê ở Nà Mạ, châu Hà Quảng (Cao Bằng) được giác ngộ cách mạng và đặt bí danh Kim Đồng. Kim Đồng được giao nhiệm vụ canh gác, chuyển thư từ, liên lạc… đưa đường cho cán bộ vượt qua vùng bị địch bao vây, canh gác."
      },
      {
        id: 5,
        name: "Lá cờ chuẩn đỏ thắm",
        image: "../images/Products/Lịch sử/l5.png",
        price: 65000,
        author: "Hồ Phương",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "152",
        detail: "Không chỉ là tập truyện kể về gương chiến đấu, hi sinh của các anh bộ đội Cụ Hồ – những chiến sĩ Điện Biên – mà còn là truyện kể về người dân công, về đồng bào tham gia chiến dịch nồng hậu, nghĩa tình cùng chung lòng yêu nước và quyết tâm đánh đuổi giặc Pháp."
      },
      {
        id: 6,
        name: "Nguyên Phi Ỷ Lan",
        image: "../images/Products/Lịch sử/l6.png",
        price: 132000,
        author: "Quỳnh Cư",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "216",
        detail: "Nguyên phi Ỷ Lan, tên thật là Lê Thị Yến, sinh tại làng Thổ Lỗi (nay là xã Dương Xá, huyện Gia Lâm, Hà Nội). Xuất thân từ một gia đình nông dân, nhờ nhan sắc và trí tuệ hơn người, bà đã được vua Lý Thánh Tông đưa về kinh khi vua vi hành đến vùng quê này."
      },
      {
        id: 7,
        name: "Những ký ức Điện Biên",
        image: "../images/Products/Lịch sử/l7.png",
        price: 80000,
        author: "Nhiều tác giả",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "264",
        detail: "Những kí ức Điện Biên là tập truyện kí của các nhà văn nổi tiếng viết về chiến dịch Điện Biên Phủ. 9 tác phẩm được tuyển là 9 bức chân dung về những con người đã góp mặt góp công làm nên chiến thắng Điện Biên Phủ."
      }, 
      {
        id: 8,
        name: "Thầy giáo Nguyễn Tất Thành",
        image: "../images/Products/Lịch sử/l8.png",
        price: 50000,
        author: "Sơn Tùng",
        person: "Thiếu niên(11-15)",
        pages: "100",
        detail: "“…Suốt hơn ba mươi năm cầm súng, cầm bút, anh đã dành nhiều thì giờ và tâm huyết vào công việc ghi chép về thời niên thiếu Bác Hồ. Anh bắt đầu công việc này từ năm 1948. Anh đã gặp người chị ruột, người anh cả của Bác Hồ và hỏi han được nhiều điều quý giá. Từ đó, anh lần theo đầu mối ấy đi đến những nơi Bác Hồ đã sống, đã học tập, đã dạy học, đã làm thợ và gặp những người cùng thời với Bác để hỏi han với một thái độ, một trách nhiệm, một tình cảm như người khảo cổ học…”"
      },
      {
        id: 9,
        name: "Thư tết của Bác",
        image: "../images/Products/Lịch sử/l9.png",
        price: 232000,
        author: "Hồ Chí Minh, Lê Minh Hải",
        person: "Thiếu nhi(6-11)",
        pages: "92",
        detail: "Sinh thời, vào mỗi dịp Tết, Bác Hồ thường viết thư chúc Tết gửi toàn thể đồng bào. Mỗi bức thư của Bác thể hiện tình yêu thương vô bờ đối với mọi tầng lớp nhân dân, như tình cảm của một người ông gửi cho cháu, người cha gửi cho các con, người anh gửi cho các em…"
      },
      {
        id: 11,
        name: "1Bác Hồ-Tấm gương đoàn kết",
        image: "../images/Products/Lịch sử/l1.png",
        price: 27000, 
        author: "Phạm Văn Hòa",
        person: "Thiếu niên(11-15)",
        pages: "120",
        detail: "ĐOÀN KẾT là kết thành một khối thống nhất, cùng hoạt động vì một mục đích chung. Tinh thần đoàn kết rất quan trọng, cần nhất quán, gắn bó, thống nhất một lòng, có thế sức mạnh và trí tuệ mới nhân lên, vượt qua được những thử thách của cuộc sống. Để thực sự đoàn kết, một trong những yếu tố quan trọng cần nuôi dưỡng chính là tình yêu thương, sự đồng cảm, chia sẻ lẫn nhau. Và như vậy mới có thể giúp đỡ, hỗ trợ, vì cộng đồng. Để rèn luyện đức tính đoàn kết, chúng ta nên rèn luyện, xây dựng tinh thần đồng đội, tăng cường kĩ năng hợp tác, giao tiếp, giải quyết vấn đề, gây dựng niềm tin, biết đồng thuận cũng như tôn trọng sự khác biệt."
      },
      {
        id: 12,
        name: "1Chuyện ở đồi A1",
        image: "../images/Products/Lịch sử/l2.png",
        price: 82000,
        author: "Nguyễn Tân",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "144",
        detail: "Chiều tối mùa đông, ngày 22 tháng 12 năm 1944, giữa rừng già tịch mịch và đất trời uy nghi, 34 cán bộ, chiến sĩ đã cất lên lời thề thiêng liêng, chiến đấu, hi sinh vì độc lập, tự do, vì nước non vững bền... Đội Việt Nam Tuyên truyền Giải phóng quân, tiền thân của Quân đội nhân dân Việt Nam anh hùng đã ra đời như thế…"
      },
      {
        id: 13,
        name: "1Đội Việt Nam tuyên truyền giải phóng quân",
        image: "../images/Products/Lịch sử/l3.png",
        price: 32000,
        author: "Nguyễn Mạnh Hà",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "252",
        detail: "“Người ta có thể đánh bại một quân đội chứ không thể đánh bại được một dân tộc.” - Tướng De Castries (Đờ Cát)"
      },
      {
        id: 14,
        name: "1Kim Đồng",
        image: "../images/Products/Lịch sử/l4.png",
        price: 39000,
        author: "Tô Hoài",
        person: "Thiếu niên(11-15), Thiếu nhi(6-11)",
        pages: "124",
        detail: "Cậu bé Nông Văn Dền quê ở Nà Mạ, châu Hà Quảng (Cao Bằng) được giác ngộ cách mạng và đặt bí danh Kim Đồng. Kim Đồng được giao nhiệm vụ canh gác, chuyển thư từ, liên lạc… đưa đường cho cán bộ vượt qua vùng bị địch bao vây, canh gác."
      },
      {
        id: 15,
        name: "1Lá cờ chuẩn đỏ thắm",
        image: "../images/Products/Lịch sử/l5.png",
        price: 65000,
        author: "Hồ Phương",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "152",
        detail: "Không chỉ là tập truyện kể về gương chiến đấu, hi sinh của các anh bộ đội Cụ Hồ – những chiến sĩ Điện Biên – mà còn là truyện kể về người dân công, về đồng bào tham gia chiến dịch nồng hậu, nghĩa tình cùng chung lòng yêu nước và quyết tâm đánh đuổi giặc Pháp."
      },
      {
        id: 16,
        name: "1Nguyên Phi Ỷ Lan",
        image: "../images/Products/Lịch sử/l6.png",
        price: 132000,
        author: "Quỳnh Cư",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "216",
        detail: "Nguyên phi Ỷ Lan, tên thật là Lê Thị Yến, sinh tại làng Thổ Lỗi (nay là xã Dương Xá, huyện Gia Lâm, Hà Nội). Xuất thân từ một gia đình nông dân, nhờ nhan sắc và trí tuệ hơn người, bà đã được vua Lý Thánh Tông đưa về kinh khi vua vi hành đến vùng quê này."
      },
      {
        id: 17,
        name: "1Những ký ức Điện Biên",
        image: "../images/Products/Lịch sử/l7.png",
        price: 80000,
        author: "Nhiều tác giả",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "264",
        detail: "Những kí ức Điện Biên là tập truyện kí của các nhà văn nổi tiếng viết về chiến dịch Điện Biên Phủ. 9 tác phẩm được tuyển là 9 bức chân dung về những con người đã góp mặt góp công làm nên chiến thắng Điện Biên Phủ."
      }, 
      {
        id: 18,
        name: "1Thầy giáo Nguyễn Tất Thành",
        image: "../images/Products/Lịch sử/l8.png",
        price: 50000,
        author: "Sơn Tùng",
        person: "Thiếu niên(11-15)",
        pages: "100",
        detail: "“…Suốt hơn ba mươi năm cầm súng, cầm bút, anh đã dành nhiều thì giờ và tâm huyết vào công việc ghi chép về thời niên thiếu Bác Hồ. Anh bắt đầu công việc này từ năm 1948. Anh đã gặp người chị ruột, người anh cả của Bác Hồ và hỏi han được nhiều điều quý giá. Từ đó, anh lần theo đầu mối ấy đi đến những nơi Bác Hồ đã sống, đã học tập, đã dạy học, đã làm thợ và gặp những người cùng thời với Bác để hỏi han với một thái độ, một trách nhiệm, một tình cảm như người khảo cổ học…”"
      },
      {
        id: 19,
        name: "1Thư tết của Bác",
        image: "../images/Products/Lịch sử/l9.png",
        price: 232000,
        author: "Hồ Chí Minh, Lê Minh Hải",
        person: "Thiếu nhi(6-11)",
        pages: "92",
        detail: "Sinh thời, vào mỗi dịp Tết, Bác Hồ thường viết thư chúc Tết gửi toàn thể đồng bào. Mỗi bức thư của Bác thể hiện tình yêu thương vô bờ đối với mọi tầng lớp nhân dân, như tình cảm của một người ông gửi cho cháu, người cha gửi cho các con, người anh gửi cho các em…"
      }
    ],
    "Văn học Việt Nam": [
      {
        id: 100,
        name: "Ve sầu phiêu du Bắc Cực",
        image: "../images/Products/Văn học/v1.png",
        price: 77000,
        author: "Mai Anh Đoàn",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "76",
        detail: "Ve Sầu sống trên cây táo gai, tận hưởng bầu không khí nhiệt đới nóng ẩm cùng các thanh âm rộn rã của mùa Hè. Thế rồi, bởi một sự cố tình cờ, Ve Sầu đột ngột nhận ra mình không còn ở Sài Gòn thân thuộc. Xung quanh chú giờ đây lạnh cóng, chỉ một màu trắng tuyết: Bắc Cực."
      },
      {
        id: 101,
        name: "Sông vừa đi vừa lớn",
        image: "../images/Products/Văn học/v2.png",
        price: 25000,
        author: "Nguyễn Minh Khiêm",
        person: "Thiếu niên(11-15)",
        pages: "84",
        detail: "Có cậu bé biển nghịch ngợm, ăn vụng đường lại bốc nhầm muối, nên đã mấy triệu năm rồi vẫn khát; Có câu chuyện lịch sử về làng Đồng Cổ; Lại có anh dã tràng xây lâu đài cát khiến biển mê tít, cứ lượn quanh ngắm nghía mà “vỗ nghìn sóng hát”. Và có con sông mới sinh ra chỉ bé bằng sợi tóc, vượt qua bao rừng núi, bao thác ghềnh, qua mỗi nơi sông lại để lại những bến, làng, những con đê... để đến được biển thần tiên, sông đã vừa đi vừa lớn."
      },
      {
        id: 102,
        name: "Đi bắt nỗi buồn",
        image: "../images/Products/Văn học/v3.png",
        price: 36000,
        author: "Nguyễn Thị Như Hiền",
        person: "Nhi đồng(6-11)",
        pages: "120",
        detail: "Cậu bé Ken sắp thành anh Hai của em bé... Cậu biết trên đời có những ông Ba Bị chuyên đi bắt nỗi buồn và phân phát niềm vui. Vì trên đời nỗi buồn nhiều hơn nhiều vui nên ba chiếc bị ấy gồm hai bị đựng nỗi buồn và một bị niềm vui..."
      },
      {
        id: 103,
        name: "Hoa hướng dương",
        image: "../images/Products/Văn học/v4.png",
        price: 55000,
        author: "Đoàn Giỏi",
        person: "Thiếu niên(11-15), Tuổi mới lớn(15-18)",
        pages: "212",
        detail: "Nắp hầm vừa đậy lại, tôi bỗng có cảm giác như đang ngồi một mình trong cái huyệt mả. Kẻ thù đáng sợ nhất của tôi, trong những giờ phút này, chính là sự cô đơn. Tôi không nhớ mình đã vận dụng lí trí, chiến đấu nội tâm ra sao."
      },
      {
        id: 104,
        name: "Cá bống mú",
        image: "../images/Products/Văn học/v5.png",
        price: 40000,
        author: "Đoàn Giỏi",
        person: "Thiếu niên(11-15)",
        pages: "168",
        detail: "Đọc Cá bống mú để cảm nhận phẩm chất đặc trưng của người nông dân phương Nam. Đọc Hoa hướng dương, Cuộc truy tìm kho vũ khí, ta theo bước những con người bình dị nhưng phi thường giữa khói lửa chiến tranh. Người thủy thủ già trên hòn đảo lưu đày khắc họa một tầm vóc nhân vật lớn lao bằng những chi tiết đậm chất thơ và nhân văn. Rừng đêm xào xạc, Những chuyện lạ về cá, Tê giác trong ngàn xanh lại đem đến cảm giác ngỡ ngàng trước trí tưởng tượng và hiểu biết sâu rộng của tác giả."
      }
    ],
    "Doraemon": [
      {
        id: 200,
        name: "Tân Nobita và lịch sử khai phá vũ trụ",
        image: "../images/Products/Doraemon/do1.png",
        price: 31000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11))",
        pages: "144",
        detail: "Ngày nọ, Nobita và Doraemon tình cờ tìm thấy và giải cứu 2 người cư dân của hành tinh Koyakoya là Roppuru và Chamy đang bị nạn thông qua cửa không gian dưới nền nhà căn phòng của Nobita do thời-không gian bị bóp méo. Do sân bóng của nhóm bạn Nobita bị các anh lớp lớn tranh mất nên cậu đã nảy ra ý tưởng rủ các bạn đi qua cánh cửa không gian đến hành tinh Koyakoya để thỏa thích chơi đùa. Tại đây, họ được biết hành tinh Koyakoya đang bị bọn cai mỏ Galtite lộng hành phá phách. Nobita và nhóm bạn sẽ làm thế nào để giải cứu hành tinh Koyakoya...!"
      },
      {
        id: 201,
        name: "Nobita và cuộc đại thủy chiến ở xứ sở người cá",
        image: "../images/Products/Doraemon/do2.png",
        price: 27000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "144",
        detail: "Doraemon đã dùng bảo bối “máy bơm mô phỏng mặt nước giả tưởng” để biến cả thành phố nơi Nobita đang sống chìm xuống đáy biển. Sau khi phải rời khỏi hành tinh Aqua, cư dân tộc người cá đã đáp xuống Trái Đất và âm thầm sống dưới đáy biển. Một ngày, công chúa Sophia đã vô tình bơi lạc vào vùng biển giả tưởng của Nobita…"
      },
      {
        id: 202,
        name: "Truyền kỳ về bóng chày siêu cấp-Tập 2",
        image: "../images/Products/Doraemon/do3.png",
        price: 40000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "384",
        detail: "Tuyển tập thứ hai những trận đấu nổi bật với các cú ném ma thuật và đòn đánh “sát thủ”!"
      },
      {
        id: 203,
        name: "Truyền kỳ về bóng chày siêu cấp-Tập 1",
        image: "../images/Products/Doraemon/do4.png",
        price: 40000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "372",
        detail: "Series manga bóng chày huyền thoại đã quay trở lại!"
      },
      {
        id: 204,
        name: "Nobita và vùng đất lý tưởng trên bầu trời",
        image: "../images/Products/Doraemon/do5.png",
        price: 31000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "144",
        detail: "Mời các bạn cùng đón đọc tập truyện tranh màu - mở màn cho tủ sách DORAEMON MOVIE STORY của NXB Kim Đồng - được chuyển thể từ Phim điện ảnh Doraemon 2023: Nobita Và Vùng Đất Lý Tưởng Trên Bầu Trời - Tác phẩm đạt kỉ lục doanh thu triệu vé tại Việt Nam thời gian qua nhé!!"
      },
      {
        id: 205,
        name: "Tân Nobita và nước Nhật thời nguyên thủy",
        image: "../images/Products/Doraemon/do6.png",
        price: 32000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "144",
        detail: "Nobita học hành bết bát nên luôn bị mẹ mắng. Vì kết quả kiểm tra quá tệ, cậu bị cấm đọc truyện, xem phim và không được đi đâu chơi! Trùng hợp thay, cả nhóm đồng lòng bỏ nhà đến Nhật Bản 70.000 năm trước đi bụi! Chuyến phiêu lưu li kì nào đang chờ họ ở đó…!?"
      },
      {
        id: 206,
        name: "Nobita và bản giao hưởng địa cầu",
        image: "../images/Products/Doraemon/do7.png",
        price: 31000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "144",
        detail: "Chuẩn bị cho buổi hòa nhạc ở trường, Nobita đang tập thổi sáo Recorder - nhạc cụ mà cậu chơi dở nhất."
      },
      {
        id: 207,
        name: "Doraemon truyện ngắn",
        image: "../images/Products/Doraemon/do8.png",
        price: 19000,
        author: "Fujiko F Fujio",
        person: "Thiếu niên(11-15), Nhi đồng(6-11)",
        pages: "192",
        detail: "Những câu chuyện về chú mèo máy thông minh Doraemon và nhóm bạn Nobita, Shizuka, Suneo, Jaian, Dekisugi sẽ đưa chúng ta bước vào thế giới hồn nhiên, trong sáng đầy ắp tiếng cười với một kho bảo bối kì diệu - những bảo bối biến ước mơ của chúng ta thành sự thật. Nhưng trên tất cả Doraemon là hiện thân của tình bạn cao đẹp, của niềm khát khao vươn tới những tầm cao."
      }
    ],
    "Manga": [
        {
            id: 300,
            name: "Nhật ký ẩm thực của nàng hầu sành ăn",
            image: "../images/Products/Manga/m1.png",
            price: 35000,
            author: "Susumu Maeya",
            person: "Tuổi mới lớn(15-18)",
            pages: "160",
            detail: "Từng làm việc trong một dinh thự ở Anh Quốc, một sự cố nọ đã khiến cho nàng hầu Suzume phải chuyển đến sống trong căn hộ bé nhỏ nép mình tại một góc nơi nước Nhật xa xôi. Dẫu trong lòng còn nhiều lo âu bộn bề, nhưng tình yêu lẫn sự tò mò về ẩm thực Nhật Bản đã hóa thành động lực giúp Suzume hăng hái bước chân ra ngoài khám phá…! Mời bạn cùng đến với tác phẩm đầy thư giãn xoay quanh nhân vật chính là một nàng hầu gái kì lạ."
          },
          {
            id: 301,
            name: "Sao băng ban ngày",
            image: "../images/Products/Manga/m2.png",
            price: 32000,
            author: "Mika Yamamori",
            person: "Tuổi mới lớn(15-18)",
            pages: "192",
            detail: "Một lần nữa bị Shishio từ chối, Suzume vô cùng đau lòng và quyết định trở lại vùng quê cũ. Trước những tình cảm ấm áp, thật lòng lo lắng cho mình của những người bạn tốt và gia đình, Suzume đã nói ra những cảm xúc thật của bản thân. Liệu cô bé có vượt qua được nỗi đau này?"
          },
          {
            id: 302,
            name: "Shadows house",
            image: "../images/Products/Manga/m3.png",
            price: 41000,
            author: "So-ma-to",
            person: "Tuổi mới lớn(15-18)",
            pages: "160",
            detail: "Vụ án “săn người không có năng lực” đã khiến trật tự của dinh thự bị đảo lộn. Sự thật bị che đậy bởi những điều giả dối đang dần được sáng tỏ nhờ những suy luận chính xác. Cuối cùng, chân tướng của thủ phạm thực sự xuất hiện trong vụ này sẽ là…!?"
          },
          {
            id: 303,
            name: "World Trigger",
            image: "../images/Products/Manga/m5.png",
            price: 33000,
            author: "Daisuke Ashihara",
            person: "Tuổi mới lớn(15-18)",
            pages: "192",
            detail: "Ngày nọ, một học sinh tóc trắng bí ẩn tên là Kuga Yuma chuyển đến một ngôi trường ở thành phố này. Cậu thực ra là một Neighbor mang hình dạng con người. Ở đây, cậu gặp Mikumo Osamu là thực tập sinh cấp C của Border. Vòng xoay vận mệnh bắt đầu dịch chuyển, liệu họ sẽ bảo vệ thế giới như thế nào...?"
          },
          {
            id: 304,
            name: "Nhiệm vụ tối thượng nhà Yozakura",
            image: "../images/Products/Manga/m4.png",
            price: 27000,
            author: "Hitsuji Gondaira",
            person: "Tuổi mới lớn(15-18)",
            pages: "192",
            detail: "Taiyo Asano là một học sinh trung học siêu nhút nhát, chỉ có thể trò chuyện với Mutsumi Yozakura, người bạn thời thơ ấu của mình. Tuy nhiên, Mutsumi thực ra là thành viên của một gia đình có truyền thống hành nghề điệp viên, đã vậy anh trai của Mutsumi lại là một tên cuồng em gái đến cực đoan và đang nhắm đến tính mạng của Taiyo! Taiyo phải làm gì để bảo vệ chính mình và cả Mutsumi đây?!"
          }
    ],
    "Khoa học": [
        {
            id: 400,
            name: "Theo bước thời gian",
            image: "../images/Products/Khoa học/1.png",
            price: 162000,
            author: "Võ Thị Mai Chi, Hồ Quốc Cường",
            person: "Mọi lứa tuổi",
            pages: "84",
            detail: "Theo chiều dài lịch sử, ở bất kì đô thị nào, sự tồn tại của các công trình kiến trúc hàm chứa ý nghĩa sâu xa: Con người nhận biết mình đã từng và hiện đang là ai, xã hội đã phát triển và thay đổi như thế nào."
          },
          {
            id: 401,
            name: "Giải mã danh tác",
            image: "../images/Products/Khoa học/2.png",
            price: 211000,
            author: "Ingrid Swenson, Mary Auld",
            person: "Thiếu niên(11-15)",
            pages: "128",
            detail: "Từ sự sáng tạo, lòng quyết tâm và đôi khi cả sự dũng cảm, người nghệ sĩ đã mang đến cho chúng ta những ô cửa để quan sát thế giới dưới nhiều góc độ mới hoặc khía cạnh đầy ý nghĩa. Dành cho bất cứ ai muốn tìm hiểu kĩ hơn về hội họa, cuốn sách Giải Mã Danh Tác sẽ đưa bạn đọc chiêm ngưỡng những tác phẩm nghệ thuật vĩ đại từ khắp nơi trên thế giới và xuyên suốt các thời đại."
          },
          {
            id: 402,
            name: "Kỹ năng vàng cho học sinh trung học",
            image: "../images/Products/Khoa học/3.png",
            price: 50000,
            author: "Liao Heng",
            person: "Thiếu niên(11-15)",
            pages: "212",
            detail: "Từ hơn hàng trăm buổi phỏng vấn sâu với các thế hệ sinh viên của Đại học Thanh Hoa và Đại học Bắc Kinh, tác giả Liao Heng đã nhận thấy rằng, ngoại trừ một số ít thiên tài, chỉ số IQ của hầu hết sinh viên trúng tuyển vào hai trường đại học nổi tiếng bậc nhất Trung Quốc - Đại học Thanh Hoa và Đại học Bắc Kinh, thực ra không khác nhiều so với người bình thường."
          },
          {
            id: 403,
            name: "Kỹ năng xã hội cho học sinh tiểu học",
            image: "../images/Products/Khoa học/4.png",
            price: 77000,
            author: "Trung tâm nghiên cứu tâm lý trẻ em",
            person: "Nhi đồng(6-11)",
            pages: "156",
            detail: "Trẻ em ở lứa tuổi tiểu học có phạm vi hoạt động mở rộng, địa điểm không còn giới hạn trong gia đình và nhà trường nữa. Những người và sự vật mà trẻ em tiếp xúc và các mối quan hệ xã hội trở nên vô cùng phức tạp, đòi hỏi các em phải từng bước học hỏi mới có thể thành thạo ứng phó và tự tin trưởng thành."
          },
          {
            id: 404,
            name: "15 bí kíp giúp tớ an toàn",
            image: "../images/Products/Khoa học/5.png",
            price: 41000,
            author: "Nguyễn Trọng An",
            person: "Nhi đồng(6-11)",
            pages: "72",
            detail: "Mỗi ngày trung bình ở nước ta có 5 trẻ bị đuối nước."
          }
    ],
    "WingBooks": [
        {
            id: 1000,
            name: "Trị liệu nghệ thuật",
            image: "../images/Products/Wingbook/w1.png",
            price: 117000,
            author: "Nhóm viết chữa lành",
            person: "Tuổi trưởng thành(trên 18)",
            pages: "244",
            detail: "Mục tiêu cao cả và mãnh liệt nhất của trị liệu nghệ thuật chính là để bạn khám phá và làm quen với con người bên trong mình – một con người của nghệ thuật, yêu sáng tạo và tự do biểu đạt cảm xúc thông qua sáng tạo."
          },
          {
            id: 1001,
            name: "Sơn hải kinh",
            image: "../images/Products/Wingbook/w2.png",
            price: 342000,
            author: "Sam Trạch, Lương Siêu",
            person: "Tuổi trưởng thành(trên 18)",
            pages: "432",
            detail: "Ấn bản minh hoạ SƠN HẢI KINH mới mẻ và đầy ấn tượng, tái hiện kí ức văn hoá SƠN HẢI KINH."
          },
          {
            id: 1002,
            name: "Bút chì đỏ, Lockdown xứ người và Tiệm thuê truyện",
            image: "../images/Products/Wingbook/w3.png",
            price: 45000,
            author: "Thư Cao, Nguyên Trần, Ngọc Anh, Nhiên Khang",
            person: "Tuổi mới lớn(15-18)",
            pages: "92Đt+20M",
            detail: "Cuộc thi Sáng tác truyện tranh năm 2024 được tổ chức với mong muốn tìm kiếm các tác giả, hoạ sĩ truyện tranh Việt Nam và phát triển nhiều hơn nữa các tác phẩm truyện tranh của Việt Nam. Thời hạn nhận tác phẩm từ ngày 1/6/2024 đến hết ngày 1/11/2024."
          },
          {
            id: 1003,
            name: "Bài văn về trứng vịt lộn",
            image: "../images/Products/Wingbook/w4.png",
            price: 45000,
            author: "Khoan",
            person: "Tuổi mới lớn(15-18)",
            pages: "112",
            detail: "TÁC PHẨM ĐOẠT GIẢI NHẤT CUỘC THI SÁNG TÁC TRUYỆN TRANH 2024 - SÁCH 2 CHIỀU ĐẢO NGƯỢC SONG NGỮ VIỆT – PHÁP!!!"
          },
          {
            id: 1004,
            name: "Thiên sứ nhà bên",
            image: "../images/Products/Wingbook/w5.png",
            price: 86000,
            author: "Saekisan, Hanekoto",
            person: "Tuổi trưởng thành(trên 18)",
            pages: "328",
            detail: "Hàng xóm kế bên căn hộ của Fujimiya Amane chính là nữ sinh xinh đẹp nhất trường cậu, Shiina Mahiru."
          }
    ]
  };  