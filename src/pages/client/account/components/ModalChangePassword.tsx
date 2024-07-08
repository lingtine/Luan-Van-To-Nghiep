import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";
import Modal from "components/modal/modal";
import SelectBox, { ISelected } from "components/select-box/select-box";
import UploadImage from "components/upload-image/upload-image";
import moment from "moment";
import React, { useState } from "react";
import { useUpdateProfileMutation } from "redux/api/auth/customer-api";
import { ChangePasswordRequest } from "redux/api/types";

import { useAppSelector } from "redux/store";
import { toast } from "react-toastify";

interface ModalChangePasswordProps {
  onToggle: () => void;
}

const ModalChangePassword = ({ onToggle }: ModalChangePasswordProps) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailError, setIsEmailError] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(true);
  const [isConfirmPasswordError, setIsOpenChangePasswordError] = useState(true);
console.log('object :>> ', isEmailError,
isPasswordError,
isConfirmPasswordError);
  const [formData, setFormData] = useState<ChangePasswordRequest>({
    email: user?.email ?? "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // updateCustomerInfo(formData);
    console.log(formData);
  };

  return (
    <div>
      <Modal onClose={onToggle}>
        <form
          onSubmit={handleSubmit}
          className="flex-coljustify-between gap-10"
        >
          <div>
            <header className="text-2xl my-4 font-bold">
              Thông tin khách hàng
            </header>
          </div>
          <div className="flex flex-col gap-6">
            <Input
              autoComplete="new-password"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              name="name"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Email"
              error={isEmailError}
            />

            <Input
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
              name="password"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Mật khẩu"
              error={isPasswordError}
            />

            <Input
              autoComplete="new-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              crossOrigin={"use-credentials"}
              variant="outlined"
              label="Nhập lại mật khẩu"
              error={isConfirmPasswordError}
            />
          </div>
          <div className="w-full mt-4">
            <Button className="w-full" type="submit">
              Cập nhật
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalChangePassword;
