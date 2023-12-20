interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-black overflow-hidden">
      <div className="container mx-auto pt-20">
        <div className="flex flex-wrap -mx-8 ">
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">
                Tổng đài hỗ trợ miễn phí
              </h5>
            </div>
            <ul className="text-secondary flex gap-2 flex-col text-sm">
              <li>Gọi mua hàng 1800.2097 (7h30 - 22h00)</li>
              <li>Gọi khiếu nại 1800.2063 (8h00 - 21h30)</li>
              <li>Gọi bảo hành 1800.2064 (8h00 - 21h00)</li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">
                Thông tin và chính sách
              </h5>
            </div>
            <ul className="text-secondary text-sm gap-2 flex flex-col">
              <li>Mua hàng và thanh toán Online</li>
              <li>Mua hàng trả góp Online</li>
              <li>Chính sách giao hàng</li>

              <li>Tra điểm Smember</li>
              <li>Xem ưu đãi Smember</li>
              <li>Tra thông tin bảo hành</li>

              <li>Tra cứu hoá đơn điện tử</li>
              <li>Thông tin hoá đơn mua hàng</li>
              <li>Trung tâm bảo hành chính hãng</li>
              <li>Quy định về việc sao lưu dữ liệu</li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">
                Dịch vụ và thông tin khác
              </h5>
            </div>
            <ul className="text-secondary text-sm flex flex-col gap-2">
              <li>Khách hàng doanh nghiệp (B2B)</li>
              <li>Ưu đãi thanh toán</li>
              <li>Quy chế hoạt động</li>

              <li>Chính sách Bảo hành</li>
              <li>Liên hệ hợp tác kinh doanh</li>
              <li>Tuyển dụng</li>
              <li>Dịch vụ bảo hành điện thoại</li>

              <li>Dịch vụ bảo hành mở rộng</li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">
                Liên kết nhanh
              </h5>
            </div>
            <ul className="text-secondary flex flex-col gap-2">
              <li>Chính sách bảo mật</li>
              <li>Điều khoản sử dụng</li>
              <li>Hỏi Đáp</li>
              <li>Liên hệ</li>
            </ul>
          </div>
        </div>
        <div className="py-8 border-t-secondary">
          <p className="text-secondary text-center text-sm">
            Công ty TNHH Thương Mại và Dịch Vụ Kỹ Thuật DIỆU PHÚC - GPĐKKD:
            0316172372 cấp tại Sở KH & ĐT TP. HCM. Địa chỉ văn phòng: 350-352 Võ
            Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.
            Điện thoại: 028.7108.9666.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
