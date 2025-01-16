import React, { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import "./styles.scss";

const API_URL = "http://localhost:9999/users";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "age":
        setAge(value ? parseInt(value, 10) : "");
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    if (!fullName || !email || !password || !phone || !age) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    const isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    const isPhoneValid = /^\d{10,11}$/.test(phone);

    if (!isEmailValid) {
      setError("Email không hợp lệ!");
      return false;
    }

    if (!isPhoneValid) {
      setError("Số điện thoại không hợp lệ!");
      return false;
    }

    if (age < 16) {
      setError("Tuổi phải lớn hơn hoặc bằng 16!");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Mật khẩu phải có ít nhất 6 ký tự, bao gồm cả chữ và số!");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError("");

    if (isRegistering) {
      if (!validateForm()) return;

      try {
        const emailResponse = await fetch(`${API_URL}?email=${email}`);
        const emailUsers = await emailResponse.json();

        if (emailUsers.length > 0) {
          setError("Email đã được đăng ký!");
          return;
        }

        const phoneResponse = await fetch(`${API_URL}?phone=${phone}`);
        const phoneUsers = await phoneResponse.json();

        if (phoneUsers.length > 0) {
          setError("Số điện thoại đã được đăng ký!");
          return;
        }

        const newUser = {
          fullName,
          age,
          phone,
          email,
          password,
          userId: Date.now(),
        };

        const registerResponse = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (registerResponse.ok) {
          message.success("Đăng ký thành công!");
          setIsRegistering(false);
        } else {
          setError("Đăng ký thất bại!");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi đăng ký!");
      }
    } else {
      try {
        const response = await fetch(`${API_URL}?email=${email}`);
        const users = await response.json();

        if (users.length > 0 && users[0].password === password) {
          const loggedInUser = users[0];
          setUser(loggedInUser);
          setIsLoggedIn(true);

          sessionStorage.setItem("user", JSON.stringify(loggedInUser));
          sessionStorage.setItem("userId", loggedInUser.userId);

          message.success("Đăng nhập thành công!");
        } else {
          setError("Email hoặc mật khẩu không đúng!");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi đăng nhập!");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    message.success("Đăng xuất thành công!");
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5">
              <h3 className="form-header mb-5">
                {isRegistering
                  ? "Đăng Ký"
                  : isLoggedIn
                  ? `Welcome, ${user?.fullName || ""}`
                  : "Đăng Nhập"}
              </h3>

              {!isLoggedIn ? (
                <form className={isRegistering ? "form-register" : "form-login"}>
                  {isRegistering && (
                    <div className="form-row row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="form-control form-control-lg"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="fullName">
                            Họ Tên
                          </label>
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="number"
                            id="age"
                            name="age"
                            className="form-control form-control-lg"
                            placeholder="Age"
                            value={age}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="age">
                            Tuổi
                          </label>
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control form-control-lg"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="phone">
                            Số Điện Thoại
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={email}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={password}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Mật Khẩu
                          </label>
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          <label className="form-label" htmlFor="confirmPassword">
                            Nhập Lại Mật Khẩu
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isRegistering && (
                    <div>
                      <div className="form-group mb-4">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          value={email}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>

                      <div className="form-group mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          value={password}
                          onChange={handleInputChange}
                          required
                        />
                        <label className="form-label" htmlFor="password">
                          Mật Khẩu
                        </label>
                      </div>
                    </div>
                  )}

                  {error && <p className="text-danger">{error}</p>}

                  <button
                    className="btn btn-primary btn-lg btn-block submit-btn"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {isRegistering ? "Đăng Ký" : "Đăng Nhập"}
                  </button>

                  <div className="mt-3">
                    <p className="text-muted">
                      {isRegistering
                        ? "Already have an account? "
                        : "Don't have an account? "}
                      <span
                        className="link-primary toggle-form"
                        style={{ cursor: "pointer" }}
                        onClick={toggleForm}
                      >
                        {isRegistering ? "Đăng Nhập" : "Đăng Ký"}
                      </span>
                    </p>
                  </div>
                </form>
              ) : (
                <div className="profile-container">
                  <h4>Thông Tin Người Dùng</h4>
                  <p>
                    <strong>Họ tên:</strong> {user?.fullName}
                  </p>
                  <p>
                    <strong>Tuổi:</strong> {user?.age}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {user?.phone}
                  </p>

                  <div className="button-container">
                    <Link to={"/login/update-profile"} className="link-btn">
                      Cập nhật thông tin
                    </Link>

                    <Link to={"/login/order-history"} className="link-btn">
                      Lịch sử mua hàng
                    </Link>

                    <button className="logout-btn" onClick={handleLogout}>
                      Đăng Xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
