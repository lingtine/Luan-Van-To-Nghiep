import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { useGetAllCategoryGroupsQuery } from "redux/api/catalog/category-group";
import { NavLink } from "react-router-dom";
interface HeaderBottomProps {}

const HeaderBottom: React.FC<HeaderBottomProps> = () => {
  const { data, isSuccess } = useGetAllCategoryGroupsQuery();

  let content;

  if (isSuccess) {
    content = data.map((categoryGroup) => {
      return (
        <li
          key={categoryGroup.id}
          className="text-secondary-border-subtle hover:text-white"
        >
          <NavLink to={"/category/" + categoryGroup.id}>
            {categoryGroup.name}
          </NavLink>
        </li>
      );
    });
  }

  return (
    <div className="container flex items-center">
      <div className="py-3 text-sm w-full max-w-72 flex justify-between items-center   px-4 rounded-t hover:text-white bg-light-text-emphasis text-secondary-border-subtle">
        <div className="flex items-center gap-2">
          <BiCategory />
          <span>Danh mục sản phẩm</span>
        </div>
        <IoIosArrowDown />
      </div>
      <ul className="flex gap-8 ml-9">
        <li className="text-secondary-border-subtle hover:text-white">
          <NavLink to={"/"}> Trang chủ</NavLink>
        </li>
        {content}
        <li className="text-secondary-border-subtle hover:text-white">
          <NavLink to={"/contact"}>Liên hệ</NavLink>
        </li>
        <li className="text-secondary-border-subtle hover:text-white">
          <NavLink to={"/contact"}>Góp ý</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default HeaderBottom;
