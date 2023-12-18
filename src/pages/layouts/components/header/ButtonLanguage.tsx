
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import { RiEnglishInput } from "react-icons/ri";
import { TbStar } from "react-icons/tb";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const selectedLanguage =
    i18n.language === "vi" ? (
      <span>
        <TbStar className="" />
      </span>
    ) : (
      <span>
        <RiEnglishInput className="" />
      </span>
    );

  return (
    <div className="relative inline-block flex z-50">
      <button
        onClick={() => toggleOptions()}
        className=" bg-gray-200 text-gray-800 border border-gray-300 rounded cursor-pointer"
      >
        <FiChevronDown />
      </button>
      {!isOpen && <div className="ml-2">{selectedLanguage}</div>}
      {isOpen && (
        <ul className="absolute left-0 top-[12px] mt-2 bg-white-200 border border-gray-300 rounded-md shadow-lg ">
          <li>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-primary-800 hover:text-white-200 cursor-pointer"
              onClick={() => handleChangeLanguage("vi")}
            >
              Vietnamese
            </button>
          </li>
          <li>
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-primary-800 hover:text-white-200 cursor-pointer"
              onClick={() => handleChangeLanguage("en")}
            >
              English
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;