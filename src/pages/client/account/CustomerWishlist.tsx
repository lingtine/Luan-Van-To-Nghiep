import { useGetWishlistQuery } from "redux/api/auth/customer-api";

const CustomerWishlist = () => {
  const { data, isSuccess } = useGetWishlistQuery(null);
  //   if (isSuccess) {
  //     return <>{data.items && data.items.map((item) => <h1>{item.name}</h1>)}</>;
  //   } else {
  //     return <></>;
  //   }

  return <></>;
};

export default CustomerWishlist;
