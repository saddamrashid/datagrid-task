import { useEffect, useState } from "react";

const useCheckMobileView = () => {
  const check = () => window.innerWidth < 600;
  const [isMobileView, setIsMobileView] = useState(check());

  const handleResize = () => {
    setIsMobileView(check());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobileView };
};

export default useCheckMobileView;
