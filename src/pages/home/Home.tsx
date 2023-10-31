import Banner from "./Banner";
import Categories from "./Categories";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="container">
      <Banner />
      <Categories />
    </div>
  );
};

export default Home;
