import React, { useState, ChangeEvent, useEffect } from "react";
import "./styles.scss";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email);
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = (): void => {
    setIsRegistering(!isRegistering);
    setError(""); // Reset error message when toggling forms
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = (): void => {
    if (isRegistering) {
      // Đăng ký người dùng mới
      if (password !== confirmPassword) {
        setError("Mật khẩu không khớp!");
        return;
      }

      const newUser = { email, password };
      localStorage.setItem("user", JSON.stringify(newUser)); // Lưu người dùng vào localStorage
      alert("Đăng ký thành công!");
      setIsRegistering(false);
    } else {
      // Đăng nhập người dùng
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (email === user.email && password === user.password) {
          setIsLoggedIn(true);
          alert("Đăng nhập thành công!");
        } else {
          setError("Email hoặc mật khẩu không đúng!");
        }
      } else {
        setError("Tài khoản chưa được đăng ký!");
      }
    }
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false); // Đánh dấu người dùng đã đăng xuất
    setEmail(""); // Xóa thông tin email
    setPassword(""); // Xóa thông tin mật khẩu
    localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">
                {isRegistering ? "Register" : isLoggedIn ? "Logged In" : "Sign In"}
              </h3>

              {!isLoggedIn ? (
                <>
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
                    data-mdb-button-init
                    data-mdb-ripple-init
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
                </>
              ) : (
                <div>
                  <p>Welcome, {email}!</p>
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-danger btn-lg btn-block"
                    type="button"
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
