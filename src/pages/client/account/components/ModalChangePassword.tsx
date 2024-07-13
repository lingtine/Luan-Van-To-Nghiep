import Button from "@material-tailwind/react/components/Button";
import Input from "@material-tailwind/react/components/Input";
import Modal from "components/modal/modal";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useChangePasswordMutation } from "redux/api/auth/authApi";
import { useAppSelector } from "redux/store";

interface ModalChangePasswordProps {
  onToggle: () => void;
}

const ModalChangePassword = ({ onToggle }: ModalChangePasswordProps) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isSuccess }] = useChangePasswordMutation();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      toast.error("Không được để trống");
    }

    if (email !== user?.email) {
      toast.error("Email không trùng khớp");
    }

    if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp");
    }

    changePassword({
      email: email,
      password: password,
    });
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
            />
          </div>
          <div className="w-full mt-4">
            <Button className="w-full" type="submit">
            Lưu
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalChangePassword;
