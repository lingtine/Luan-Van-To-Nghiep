interface FilterSkeletonProps {}

const FilterSkeleton: React.FC<FilterSkeletonProps> = () => {
  return (
    <ul className="flex flex-col gap-4">
      {Array(6)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              key={index}
              className="h-8 w-40 rounded-lg animate-pulse bg-blue-gray-100"
            ></li>
          );
        })}
    </ul>
  );
};

export default FilterSkeleton;
