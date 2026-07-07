import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { login } from "../../https";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),

    onSuccess: (resData) => {
      console.log("Login Response:", resData.data);

      // Backend returns:
      // {
      //   success: true,
      //   message: "...",
      //   data: { user object }
      // }

      const user = resData.data.data;

      dispatch(
        setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        })
      );

      enqueueSnackbar(resData.data.message, {
        variant: "success",
      });

      setFormData({
        email: "",
        password: "",
      });

      setShowPassword(false);

      navigate("/");
    },

    onError: (error) => {
      console.log(error);

      enqueueSnackbar(
        error.response?.data?.message || "Login failed",
        {
          variant: "error",
        }
      );
    },
  });

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Email */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mb-1 mt-3">
            Email
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2.5 px-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter employee email"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mb-1 mt-3">
            Password
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2.5 px-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 text-gray-400 hover:text-white"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full mt-10 py-2.5 bg-yellow-400 text-lg rounded font-medium transition-all duration-300 hover:bg-yellow-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;

