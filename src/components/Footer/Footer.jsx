import React from "react";
import { Container, LogoGray } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const FooterItems = [
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
      name: "Sign up",
      slug: "/signup",
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
    <footer className="font-poppins">
      <div className="pt-6 pb-2 md:pb-6 bg-[#202124]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-w-5xl mx-auto">
            <div className="flex justify-center md:justify-start">
              <div className="w-28 flex items-center">
                <Link to="/">
                  <LogoGray />
                </Link>
              </div>
            </div>
            <ul className="flex justify-center flex-col sm:flex-row gap-4 sm:gap-8">
              {FooterItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <p
                      onClick={() => navigate(item.slug)}
                      className="inline-block text-gray-400 cursor-pointer w-full text-center font-light text-sm sm:text-base hover:underline underline-offset-2"
                    >
                      {item.name}
                    </p>
                  </li>
                ) : null
              )}
            </ul>
            <div className="text-gray-400 text-xl flex items-center justify-end gap-2">
              <ion-icon name="logo-facebook"></ion-icon>
              <ion-icon name="logo-instagram"></ion-icon>
              <ion-icon name="logo-twitter"></ion-icon>
              <ion-icon name="logo-github"></ion-icon>
            </div>
          </div>
        </Container>
      </div>
      <div className="py-6 bg-[#1c1d20] text-gray-400 text-center text-sm sm:text-base font-light">
        © 2023{" "}
        <span className="hover:underline underline-offset-2">BlogApp™</span>.
        All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
