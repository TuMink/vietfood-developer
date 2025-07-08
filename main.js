class monAn {
    #ten;
    #gia;
    #hinhAnh;
    constructor(ten, gia, hinhAnh) {
        this.#ten = ten;
        this.#gia = gia;
        this.#hinhAnh = hinhAnh;
    }
    get ten() {
        return this.#ten;
    }
    get gia() {
        return this.#gia;
    }
    get hinhAnh() {
        return this.#hinhAnh;
    }
    set ten(val) {
        this.#ten = val;
    }
    set gia(val) {
        this.#gia = val;
    }
    set hinhAnh(val) {
        this.#hinhAnh = val;
    }
    moTa() {
        return `
            <p>Món ${this.#ten}</p>
            <p>Giá ${this.#gia} VNĐ</p>
        `;
    }
    toJSON() {
        return {
            ten: this.#ten,
            gia: this.#gia,
            hinhAnh: this.#hinhAnh
        }
    }                         // trả về object thuần
    static fromJSON(data) {
        return new monAn(data.ten, data.gia, data.hinhAnh);
    }
}

class gioHangItem {
    #mon;
    #soLuong;

    constructor(mon, soLuong = 1) {
        this.#mon = mon;
        this.#soLuong = soLuong;
    }

    get mon() {
        return this.#mon;
    }

    get soLuong() {
        return this.#soLuong;
    }

    set soLuong(val) {
        this.#soLuong = val;
    }

    get thanhTien() {
        return this.#mon.gia * this.#soLuong;
    }

    tangSoLuong(n = 1) {
        this.#soLuong += n;
    }

    giamSoLuong(n = 1) {
        this.#soLuong = Math.max(0, this.#soLuong - n);
    }

    toJSON() {
        return {
            mon: this.#mon.toJSON(),
            soLuong: this.#soLuong
        };
    }

    static fromJSON(data) {
        return new gioHangItem(monAn.fromJSON(data.mon), data.soLuong);
    }
}

class thucDon {
    #danhSachMon;
    #gioHang;
    constructor() {
        this.#danhSachMon = [
            new monAn("Phở Bò", 40000, "images/pho.jpg"),
            new monAn("Bún Chả", 35000, "images/buncha.jpg"),
            new monAn("Bánh Mì", 20000, "images/banhmi.jpg"),
            new monAn("Chả Giò", 25000, "images/chagio.jpg"),
            new monAn("Bún đậu mắm tôm", 30000, "images/bundaumamtom.jpg"),
            new monAn("Nem nướng Nha Trang", 25000, "images/nemnuong.jpg"),
            new monAn("Cơm Tấm", 30000, "images/comtam.jpg"),
            new monAn("Gỏi Cuốn", 20000, "images/goicuon.jpg"),
            new monAn("Bánh Xèo", 30000, "images/banhxeo.jpg"),
            new monAn("Hủ Tiếu", 35000, "images/hutieu.jpg"),
            new monAn("Bánh Bèo", 20000, "images/banhbeo.jpg"),
            new monAn("Bánh Khọt", 25000, "images/banhkhot.jpg"),
            new monAn("Bánh Tôm Hồ Tây", 30000, "images/banhtom.jpg"),
            new monAn("Bánh Trôi Tàu", 15000, "images/banhtroitau.jpg"),
            new monAn("Mì Quảng", 40000, "images/miquang.jpg"),
            new monAn("Bánh Canh", 30000, "images/banhcanh.jpg"),
            new monAn("Bánh Cuốn", 25000, "images/banhcuon.jpg"),
            new monAn("Bánh Bột Lọc", 20000, "images/banhbotloc.jpg"),
            new monAn("Bánh Tráng Trộn", 15000, "images/banhtrangtron.jpg"),
            new monAn("Chè Ba Màu", 20000, "images/chebamau.jpg"),
            new monAn("Chè Thái", 25000, "images/chethai.jpg"),
            new monAn("Chè Bưởi", 20000, "images/chebuoi.jpg"),
            new monAn("Chè Đỗ Đen", 15000, "images/chedoden.jpg"),
        ];
        this.#gioHang = [];
        this.taiLaiGioHang();
    }

    get danhSach() {
        return this.#danhSachMon;
    }

    get gioHang() {
        return this.#gioHang;
    }

    timMonTrongGio(mon) {
        return this.#gioHang.findIndex(item => item.mon.ten === mon.ten);
    }

    themVaoGio(mon) {
        const index = this.timMonTrongGio(mon);

        if (index !== -1) {
            // Nếu món đã có trong giỏ, tăng số lượng
            this.#gioHang[index].tangSoLuong();
        } else {
            // Nếu món chưa có trong giỏ, thêm mới với số lượng = 1
            this.#gioHang.push(new gioHangItem(mon));
        }

        this.luuGioHang();
    }

    capNhatSoLuong(index, soLuong) {
        if (index >= 0 && index < this.#gioHang.length) {
            this.#gioHang[index].soLuong = soLuong;
            // Nếu số lượng = 0, xóa món khỏi giỏ
            if (soLuong <= 0) {
                this.xoaKhoiGio(index);
            } else {
                this.luuGioHang();
            }
        }
    }

    tangSoLuong(index) {
        if (index >= 0 && index < this.#gioHang.length) {
            this.#gioHang[index].tangSoLuong();
            this.luuGioHang();
        }
    }

    giamSoLuong(index) {
        if (index >= 0 && index < this.#gioHang.length) {
            this.#gioHang[index].giamSoLuong();

            // Nếu số lượng = 0, xóa món khỏi giỏ
            if (this.#gioHang[index].soLuong <= 0) {
                this.xoaKhoiGio(index);
            } else {
                this.luuGioHang();
            }
        }
    }

    xoaKhoiGio(index) {
        if (index >= 0 && index < this.#gioHang.length) {
            this.#gioHang.splice(index, 1);
            this.luuGioHang();
        }
    }

    tongSoLuong() {
        return this.#gioHang.reduce((sum, item) => sum + item.soLuong, 0);
    }

    tongTien() {
        return this.#gioHang.reduce((sum, item) => sum + item.thanhTien, 0);
    }

    timKiemMonAn(tuKhoa) {
        return this.#danhSachMon.filter(mon => mon.ten.toLowerCase().includes(tuKhoa.toLowerCase()));
    }

    luuGioHang() {
        localStorage.setItem("gioHang", JSON.stringify(this.#gioHang.map(item => item.toJSON())));
    }

    taiLaiGioHang() {
        const data = localStorage.getItem("gioHang");
        if (data) {
            try {
                const arr = JSON.parse(data);
                this.#gioHang = arr.map(item => gioHangItem.fromJSON(item));
            } catch (e) {
                console.error("Lỗi khi tải giỏ hàng:", e);
                this.#gioHang = [];
            }
        }
    }
}

const ungDung = new thucDon();

function hienThiMonAn(ds) {
    const menu = document.getElementById("menu");
    menu.innerHTML = "";
    ds.forEach((mon, index) => {
        const div = document.createElement("div");
        div.className = "food-item";
        div.innerHTML = `
            <img src="${mon.hinhAnh}" alt="${mon.ten}" width="150" height="100">
            <h3>${mon.ten}</h3>
            <p>${mon.moTa()}</p>
            <button class="btn-add" data-index="${index}">Thêm</button>
        `;
        menu.appendChild(div);
    });
    document.querySelectorAll(".btn-add").forEach(btn => {
        btn.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            ungDung.themVaoGio(ungDung.danhSach[index]);
            capNhatSoLuong();
            // Hiển thị giỏ hàng sau khi thêm
            hienThiGioHang();
        });
    });
}

function hienThiGioHang() {
    const dsMua = document.getElementById("ds-mua");
    dsMua.innerHTML = "";

    if (ungDung.gioHang.length === 0) {
        dsMua.innerHTML = "<li class='gio-trong'>Giỏ hàng trống</li>";
    } else {
        ungDung.gioHang.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "gio-hang-item";
            li.innerHTML = `
                <div class="item-info">
                    <img src="${item.mon.hinhAnh}" width="50" height="35" alt="${item.mon.ten}">
                    <span class="item-name">${item.mon.ten}</span>
                    <span class="item-price">${item.mon.gia} VNĐ</span>
                </div>
                <div class="item-quantity">
                    <button class="btn-quantity btn-giam" data-index="${index}">-</button>
                    <span class="so-luong">${item.soLuong}</span>
                    <button class="btn-quantity btn-tang" data-index="${index}">+</button>
                </div>
                <div class="item-total">${item.thanhTien} VNĐ</div>
                <button class="btn-xoa" data-index="${index}">×</button>
            `;
            dsMua.appendChild(li);
        });

        document.querySelectorAll(".btn-giam").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                ungDung.giamSoLuong(index);
                capNhatSoLuong();
                hienThiGioHang();
            });
        });

        document.querySelectorAll(".btn-tang").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                ungDung.tangSoLuong(index);
                capNhatSoLuong();
                hienThiGioHang();
            });
        });

        document.querySelectorAll(".btn-xoa").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                ungDung.xoaKhoiGio(index);
                capNhatSoLuong();
                hienThiGioHang();
            });
        });
    }

    document.getElementById("tong-tien-popup").textContent = ungDung.tongTien();
}

function khoiTaoSuKien() {
    document.getElementById("search-input").addEventListener("input", function () {
        const ketQua = ungDung.timKiemMonAn(this.value);
        hienThiMonAn(ketQua);
    });

    document.getElementById("xem-gio").onclick = () => {
        hienThiGioHang();
        document.getElementById("gio-hang-popup").style.display = "block";
    };

    document.getElementById("dong-gio").onclick = () => {
        document.getElementById("gio-hang-popup").style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == document.getElementById("gio-hang-popup")) {
            document.getElementById("gio-hang-popup").style.display = "none";
        }
    };
}

function capNhatSoLuong() {
    document.getElementById("so-luong").textContent = ungDung.tongSoLuong();
}

window.onload = function () {
    hienThiMonAn(ungDung.danhSach);
    capNhatSoLuong();
    khoiTaoSuKien();
}
