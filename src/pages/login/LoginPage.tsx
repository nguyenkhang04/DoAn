import React, { useState, ChangeEvent } from "react";
import "./styles.scss";

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const toggleForm = (): void => {
    setIsRegistering(!isRegistering);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    console.log(`Field: ${name}, Value: ${value}`);
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">{isRegistering ? "Register" : "Sign In"}</h3>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label" htmlFor="email">
                  Email
                </label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              {/* Additional input for Registration */}
              {isRegistering && (
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    required
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>
              )}

              {/* Remember me checkbox */}
              {!isRegistering && (
                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              )}

              {/* Submit button */}
              <button
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                {isRegistering ? "Register" : "Sign In"}
              </button>

              {/* Toggle between login and registration */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
