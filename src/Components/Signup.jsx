import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [SIGNUP, setSIGNUP] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setSIGNUP({ ...SIGNUP, [e.target.name]: e.target.value });
    console.log(SIGNUP);
  };

  const handleSubmit = async (e) => {
    if (SIGNUP.password === SIGNUP.cpassword) {
      e.preventDefault();
      const { name, email, password } = SIGNUP;
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: SIGNUP.name,
            email: SIGNUP.email,
            password: SIGNUP.password,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }

      setSIGNUP({ name: "", email: "", password: "", cpassword: "" });
    } else {
      alert("password and confirm password not a same");
    }
  };

  return (
    <div className="container my-3">
      <h2>Create Account to continue to iNotbook</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-7">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={SIGNUP.name}
            placeholder="Enter Your Name"
            minLength={3}
            onChange={onChange}
            required
          />
        </div>

        <div className="col-md-7">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="example1@gmail.com"
            value={SIGNUP.email}
            onChange={onChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
        </div>

        <div className="col-md-7">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={SIGNUP.password}
            onChange={onChange}
            placeholder="Enter Your Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
        </div>

        <div className="col-md-7">
          <label htmlFor="inputPassword4" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
            placeholder="password and confirm password must be same"
            onChange={onChange}
            value={SIGNUP.cpassword}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
