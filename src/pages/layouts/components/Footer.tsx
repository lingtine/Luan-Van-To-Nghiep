import { dataFooter } from "share/constant/data-footer";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-dark overflow-hidden">
      <div className="container mx-auto pt-20">
        <div className="flex flex-wrap -mx-8 mb-2">
          {dataFooter.map((item) => {
            const renderContent = item.children.map((content) => {
              return <li key={content}>{content}</li>;
            });

            return (
              <div
                key={item.title}
                className="flex-[0_0_100%] px-8 max-w-full md:flex-[0_0_50%] md:max-w-[50%] lg:max-w-[25%] lg:flex-[0_0_25%]"
              >
                <div className="my-2">
                  <h5 className="text-white font-bold text-lg">{item.title}</h5>
                </div>
                <ul className="text-dark-border-subtle flex gap-2 flex-col text-sm">
                  {renderContent}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="py-6 border-t-border-color border-t-2 mt-10">
          <p className="text-dark-border-subtle text-center text-sm">
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
