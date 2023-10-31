import React from "react";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="py-4 bg-emerald-700 text-color-1">
      <ul className="flex justify-center gap-4">
        <li>Home</li>
        <li>Category</li>
        <li>Contact</li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default Navigation;
