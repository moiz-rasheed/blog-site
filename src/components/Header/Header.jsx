import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 h-3"></div>
      <Container>
        <nav className="md:flex py-2">
          <div className="w-28 flex items-center mt-2 md:mt-0">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute md:hidden right-4 top-6 cursor-pointer"
          >
            <ion-icon name={open ? "close-sharp" : "menu-sharp"}></ion-icon>
          </div>
          <ul
            className={`md:flex ml-auto pb-5 md:pb-0 absolute md:static w-[94%] z-10 md:w-auto bg-white transition-all duration-500 ${
              open ? "" : "top-[-200px]"
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <p
                    onClick={() => {
                      navigate(item.slug);
                      setOpen(!open);
                    }}
                    className="inline-block md:mx-4 pt-3 md:py-2 mt-[2px] cursor-pointer text-[#1c1d20] font-poppins font-semibold hover:underline underline-offset-2"
                  >
                    {item.name}
                  </p>
                </li>
              ) : null
            )}
            {!authStatus && (
              <li>
                <Link to="/signup">
                  <button
                    onClick={() => setOpen(!open)}
                    className="inline-block md:ml-4 mt-3 md:mt-1 px-5 py-1 border-[3px] border-[#1c1d20] rounded-lg text-[#1c1d20] font-poppins font-semibold hover:bg-[#1c1d20] hover:text-white duration-200"
                  >
                    Sign Up
                  </button>
                </Link>
              </li>
            )}
            {authStatus && (
              <li>
                <div className="inline-block" onClick={() => setOpen(!open)}>
                  <LogoutBtn />
                </div>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
