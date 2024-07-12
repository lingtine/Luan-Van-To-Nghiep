import { Spinner } from "@material-tailwind/react";

interface LoadingPageProps {}

const LoadingPage: React.FC<LoadingPageProps> = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner className="h-12 w-12" />
    </div>
  );
};

export default LoadingPage;
