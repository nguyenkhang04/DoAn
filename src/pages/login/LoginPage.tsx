import React, { useState, ChangeEvent, useEffect } from "react";
import "./styles.scss";

const API_URL = "http://localhost:9999/users"; 

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [showAccountForm, setShowAccountForm] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = (): void => {
    setIsRegistering(!isRegistering);
    setError("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const validateForm = (): boolean => {
    if (!fullName || !email || !password || !phone || !age) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return false;
    }

    if (age < 18) {
      setError("Tuổi phải lớn hơn hoặc bằng 18!");
      return false;
    }

    if (!/^\d{10,11}$/.test(phone)) {
      setError("Số điện thoại không hợp lệ!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    setError("");

    if (isRegistering) {
      if (!validateForm()) return;

      const newUser = { fullName, age, phone, email, password };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          alert("Đăng ký thành công!");
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
          alert("Đăng nhập thành công!");
        } else {
          setError("Email hoặc mật khẩu không đúng!");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi đăng nhập!");
      }
    }
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    setUser(null);
    setEmail("");
    setPassword("");
    setShowAccountForm(false);
    sessionStorage.removeItem("user");
  };

  const toggleAccountForm = (): void => {
    setShowAccountForm((prev) => !prev);
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className="card shadow-2-strong"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">
                {isRegistering
                  ? "Register"
                  : isLoggedIn
                  ? `Welcome, ${user?.fullName || ""}`
                  : "Sign In"}
              </h3>

              {!isLoggedIn ? (
                <form>
                  {isRegistering && (
                    <>
                      <div className="form-outline mb-4">
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
                          Full Name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
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
                          Age
                        </label>
                      </div>

                      <div className="form-outline mb-4">
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
                          Phone Number
                        </label>
                      </div>
                    </>
                  )}

                  <div className="form-outline mb-4">
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

                  <div className="form-outline mb-4">
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
                      Password
                    </label>
                  </div>

                  {isRegistering && (
                    <div className="form-outline mb-4">
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
                        Confirm Password
                      </label>
                    </div>
                  )}

                  {error && <p className="text-danger">{error}</p>}

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="button"
                    onClick={handleSubmit}
                  >
                    {isRegistering ? "Register" : "Sign In"}
                  </button>

                  <div className="mt-3">
                    <p className="text-muted">
                      {isRegistering
                        ? "Already have an account? "
                        : "Don't have an account? "}
                      <span
                        className="link-primary"
                        style={{ cursor: "pointer" }}
                        onClick={toggleForm}
                      >
                        {isRegistering ? "Sign In" : "Register"}
                      </span>
                    </p>
                  </div>
                </form>
              ) : (
                <div>
                  <h4>Welcome, {user?.fullName || "User"}</h4>
                  <p>Email: {user?.email}</p>
                  <p>Phone: {user?.phone}</p>
                  <p>Age: {user?.age}</p>

                  <button
                    className="btn btn-danger btn-lg btn-block"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
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
