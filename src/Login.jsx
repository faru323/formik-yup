import React, { useEffect, useState } from "react";
import {  Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import axios from "axios";
import { BiLeftArrow,BiRightArrow } from 'react-icons/bi';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter your first name!"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Enter the last name!"),
  email: Yup.string().email("Invalid email").required("Enter a valid email address"),
  password: Yup.string()
   .min(2, "Too Short!")
   .max(50, "Too Long!")
   .lowercase(1)
   .uppercase(1)
   
   .required("Enter the password!"),

});
const Login = () => {
  
  class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }
  const [login, setLogin] = useState([])
useEffect(() => {
    axios
      .post('http://localhost:3000/users')
      .then((res) => setLogin(res.data))
  }, [])
  return (
    <div className="divdir">
      <div>
        <h1>Signup</h1>
        <br></br>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="firstName" placeholder="enter name" />
              {errors.firstName && touched.firstName ? (
                <div style={{ color: "red" }}>{errors.firstName}</div>
              ) : null}
              <br></br>
              <Field name="lastName" placeholder=" enter lastname" />
              {errors.lastName && touched.lastName ? (
                <div style={{ color: "red" }}>{errors.lastName}</div>
              ) : null}
              <br></br>
              <Field name="email" type="email" placeholder="enter email" />
              {errors.email && touched.email ? <div style={{ color: "red" }}>{errors.email}</div> : null}
              <br></br>
              <Field type="password" name="password" placeholder="enter password" />
              {errors.password && touched.password ? (
                <div style={{ color: "red" }}>{errors.password}</div>
              ) : null}
              <br></br>
              <div className="btn">   <button type="submit"> <BiRightArrow/>Submit <BiLeftArrow/></button></div>
              



              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};


export default Login;
