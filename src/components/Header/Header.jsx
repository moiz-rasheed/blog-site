import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
          <ul className="md:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <p
                    onClick={() => navigate(item.slug)}
                    className="inline-block md:mx-4 pt-3 md:py-2 mt-[2px] cursor-pointer text-[#1c1d20] font-poppins font-semibold "
                  >
                    {item.name}
                  </p>
                </li>
              ) : null
            )}
            {!authStatus && (
              <li>
                <Link to="/signup">
                  <button className="inline-block md:ml-4 mt-3 md:mt-1 px-5 py-1 border-[3px] border-[#1c1d20] rounded-lg text-[#1c1d20] font-poppins font-semibold hover:bg-[#1c1d20] hover:text-white duration-200">
                    Signup
                  </button>
                </Link>
              </li>
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
