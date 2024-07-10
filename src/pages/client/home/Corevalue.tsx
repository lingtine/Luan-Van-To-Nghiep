import { dataCoreValue } from "share/constant/data-core-value";
interface CoreValueProps {}

const CoreValue: React.FC<CoreValueProps> = () => {
  const renderData = dataCoreValue.map((item) => {
    return (
      <div
        key={item.id}
        className="px-8 max-w-full flex-[0_0_100%] lg:max-w-[33.33333%] lg:flex-[0_0_33.33333%] mb-36 flex flex-col items-center"
      >
        <div className="border-10 border-[#959496] p-2 text-4xl w-fit rounded-full bg-black text-secondary-border-subtle">
          {item.icon}
        </div>
        <div className="mt-6">
          <h4 className="text-center text-xl font-medium ">{item.title}</h4>
          <p className="text-center text-sm">{item.subtitle}</p>
        </div>
      </div>
    );
  });

  return <div className="flex flex-wrap  mt-20 ">{renderData}</div>;
};

export default CoreValue;
