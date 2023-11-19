import React from "react";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import FormContact from "./form-contact";

interface ContactPageProps {}

const ContactPage: React.FC<ContactPageProps> = () => {
  return (
    <div className="container mt-10">
      <Breadcrumbs>
        <Link to="/" className="opacity-60">
          <FaHouseChimney />
        </Link>
        <Link to="/contact">
          <span>Góp ý</span>
        </Link>
      </Breadcrumbs>

      <div className="  flex">
        <img
          className="flex-[0_0_40%] max-w-[40%]"
          src="images/contact/contact.png"
          alt="contact"
        />
        <FormContact />
      </div>
    </div>
  );
};

export default ContactPage;
