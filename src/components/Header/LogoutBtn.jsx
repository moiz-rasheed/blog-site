import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block md:ml-4 mt-3 md:mt-1 px-5 py-1 border-[3px] border-[#1c1d20] rounded-lg text-[#1c1d20] font-poppins font-semibold hover:bg-[#1c1d20] hover:text-white duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
