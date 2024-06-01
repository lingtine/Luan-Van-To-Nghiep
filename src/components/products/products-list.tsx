import ProductCard from "./product-card";

export default function ProductsList({ data }: any) {
  return (
    data &&
    data.products && (
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {data.products.lenght !== 0 ? (
          data.products.map((item: any, index: number) => (
            <a
              key={index}
              href={`/product-detail/${item.id}`}
              className="cursor-pointer hover:shadow-xl hover:transform hover:scale-105 duration-300"
            >
              <ProductCard key={index} data={item} />
            </a>
          ))
        ) : (
          <div>Không có sản phẩm nào trong list ....</div>
        )}
      </div>
    )
  );
}
