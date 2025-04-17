import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLoader  } from "react-spinners";

const AppWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(15, 14, 14, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          <HashLoader color="#fff" size={80} />
        </div>
      )}

      {/* Tu vista principal */}
      {children}
    </>
  );
};

export default AppWrapper;
