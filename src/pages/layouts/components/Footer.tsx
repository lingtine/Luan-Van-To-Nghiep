interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto pt-20">
        <div className="flex flex-wrap -mx-8 ">
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">Exclusive</h5>
            </div>
            <ul className="text-secondary">
              <li className="py-2">
                <p>Subscribe</p>
              </li>
              <li className="py-2">
                <p>Get 10% off your first order</p>
              </li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">Support</h5>
            </div>
            <ul className="text-secondary">
              <li className="py-2">
                <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
              </li>
              <li className="py-2">
                <p>exclusive@gmail.com</p>
              </li>
              <li className="py-2">
                <p>+88015-88888-9999</p>
              </li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">Account</h5>
            </div>
            <ul className="text-secondary">
              <li className="py-2">
                <p>My Account</p>
              </li>
              <li className="py-2">
                <p>Login / Register</p>
              </li>
              <li className="py-2">
                <p>Cart</p>
              </li>

              <li className="py-2">
                <p>Shop</p>
              </li>
            </ul>
          </div>
          <div className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]">
            <div className="my-2">
              <h5 className="text-secondary font-bold text-lg">Quick Link</h5>
            </div>
            <ul className="text-secondary">
              <li className="py-2">
                <p>Privacy Policy</p>
              </li>
              <li className="py-2">
                <p>Terms Of Use</p>
              </li>
              <li className="py-2">
                <p>FAQ</p>
              </li>
              <li className="py-2">
                <p>Contact</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-4 border-t-secondary">
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
