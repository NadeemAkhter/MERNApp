import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/UserName.module.css";
import { userNameValidate } from "../helper/validate";

import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

const UserName = () => {
  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validate: userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log("Values");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore more by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={styles.profile_img} src={avatar} alt="avatar" />{" "}
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="User Name"
                {...formik.getFieldProps("userName")}
              />
              <button className={styles.btn} type="submit">
                Lets Go
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member ?
                <Link to="/register" className="text-red-500">
                  {" "}
                  Register here.
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserName;
