"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

type Props = {
  className?: string;
};

const ScrollToTopButton = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > window.innerHeight * 0.3) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`z-30 cursor-pointer rounded-full bg-secondary hover:bg-secondary-400 transition-background text-white px-4 py-4 fixed bottom-8 right-4 ${
        isVisible ? "block" : "hidden"
      } ${props.className}`}
    >
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTopButton;
