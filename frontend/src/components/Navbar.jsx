// import React from "react";
// import Button from "./Button";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";  // Import Link from react-router-dom

// function Navbar() {
//   return (
//     <div className="max-w-[70vw] border-b-[1px] border-zinc-900 gap-5 flex items-center justify-between mx-auto pt-[2vw] bg-zinc-900 p-3">
//       <div className="flex">
//         <div className="flex gap-5 justify-start items-center">
//           <motion.img
//             className="h-[2.5vw]"
//             src="https://i.pinimg.com/564x/7f/e9/d7/7fe9d7012076dbda78e984253ee79f49.jpg"
//             alt="Logo"
//             whileHover={{ scale: 1.2, rotate: 5 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           />
//           <motion.h2
//             className="text-md font-bold"
//             whileHover={{ scale: 1.1, color: "#ffffff" }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             SCHEDULIFY - X
//           </motion.h2>
//         </div>

//         <div className="links flex items-center gap-14 ml-20">
//           {["Home", "As Admin", "About", "", "Login", "Register"].map(
//             (elem, index) =>
//               elem.length === 0 ? (
//                 <span
//                   key={index}
//                   className="w-0.5 h-8 bg-zinc-600 gap-1"
//                 ></span>
//               ) : (
//                 <motion.div key={index}>
//                   <Link
//                     to={`/${elem === "Home" ? "" : elem === "As Admin" ? "as-admin" : elem.toLowerCase()}`}  // Updated dynamic routing for "As Admin"
//                     className="text-md items-center cursor-pointer"
//                   >
//                     <motion.a
//                       whileHover={{
//                         scale: 1.2,
//                         color: "#00FF19",
//                         textShadow: "0px 0px 8px #00FF19",
//                       }}
//                       transition={{ type: "spring", stiffness: 200 }}
//                     >
//                       {index === 1 && (
//                         <motion.span
//                           key={index}
//                           style={{ boxShadow: "0 0 0.25em #00FF19" }}
//                           className="inline-block justify-center w-2 h-2 rounded-md mr-2 bg-green-500"
//                           whileHover={{
//                             scale: 1.5,
//                             boxShadow: "0 0 0.5em #00FF19",
//                           }}
//                         ></motion.span>
//                       )}
//                       {elem}
//                     </motion.a>
//                   </Link>
//                 </motion.div>
//               )
//           )}
//         </div>
//       </div>

//       {/* Get Started Button */}
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         <Link to="/generate-time-table">
//           <Button />  {/* This will link to the generate-time-table route */}
//         </Link>
//       </motion.div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/logout");
  };

  return (
    <div className="max-w-[70vw] border-b-[1px] border-zinc-900 gap-5 flex items-center justify-between mx-auto pt-[2vw] bg-zinc-900 p-3">
      <div className="flex">
        <div className="flex gap-5 justify-start items-center">
          <motion.img
            className="h-[2.5vw]"
            src="https://i.pinimg.com/564x/7f/e9/d7/7fe9d7012076dbda78e984253ee79f49.jpg"
            alt="Logo"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.h2
            className="text-md font-bold"
            whileHover={{ scale: 1.1, color: "#ffffff" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            SCHEDULIFY - X
          </motion.h2>
        </div>

        <div className="links flex items-center gap-14 ml-20">
          {[
            "Home",
            "As Admin",
            "About",
            "",
            isLoggedIn ? "Logout" : "Login",
            isLoggedIn ? "" : "Register",
          ].map((elem, index) =>
            elem.length === 0 ? (
              <span key={index} className="w-0.5 h-8 bg-zinc-600 gap-1"></span>
            ) : (
              <motion.div key={index}>
                {elem === "Logout" ? (
                  <motion.a
                    onClick={handleLogout}
                    className="text-md items-center cursor-pointer"
                    whileHover={{ scale: 1.2, color: "#FF0000", textShadow: "0px 0px 8px #FF0000" }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {elem}
                  </motion.a>
                ) : (
                  <Link
                    to={`/${elem === "Home" ? "" : elem === "As Admin" ? "as-admin" : elem.toLowerCase()}`}
                    className="text-md items-center cursor-pointer"
                  >
                    <motion.a
                      whileHover={{ scale: 1.2, color: "#00FF19", textShadow: "0px 0px 8px #00FF19" }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {index === 1 && (
                        <motion.span
                          key={index}
                          style={{ boxShadow: "0 0 0.25em #00FF19" }}
                          className="inline-block justify-center w-2 h-2 rounded-md mr-2 bg-green-500"
                          whileHover={{ scale: 1.5, boxShadow: "0 0 0.5em #00FF19" }}
                        ></motion.span>
                      )}
                      {elem}
                    </motion.a>
                  </Link>
                )}
              </motion.div>
            )
          )}
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 200 }}>
        <Link to="/generate-time-table">
          <Button />
        </Link>
      </motion.div>
    </div>
  );
}

export default Navbar;
