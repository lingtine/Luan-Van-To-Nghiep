interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto pt-20">
        <div className="grid grid-cols-4 gap-21 mb-12">
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <p className="text-secondary text-center">
            @ Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
