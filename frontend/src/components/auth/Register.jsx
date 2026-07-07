import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { register } from "../../https";
import { enqueueSnackbar } from "notistack";

const Register = ({ setIsRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({
      ...formData,
      role: selectedRole,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    registerMutation.mutate(formData);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
    });

    setShowPassword(false);
  };

  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),

    onSuccess: (resData) => {
      const { data } = resData;

      enqueueSnackbar(data.message, {
        variant: "success",
      });

      setTimeout(() => {
        setIsRegister(false);
      }, 1000);
    },

    onError: (error) => {
      const { response } = error;

      enqueueSnackbar(response?.data?.message, {
        variant: "error",
      });
    },
  });

  return (
    <div>
      <form onSubmit={handleFormSubmit}>

        {/* Name */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mb-1">
            Name
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2 px-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter employee name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mt-2 mb-1">
            Email
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2 px-4">
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

        {/* Phone */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mt-2 mb-1">
            Phone Number
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2 px-4">
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter employee phone number"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mt-2 mb-1">
            Password
          </label>

          <div className="flex items-center rounded-lg bg-[#1f1f1f] py-2 px-4">
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

        {/* Role */}
        <div>
          <label className="block text-[#ababab] text-sm font-medium mt-2 mb-2">
            Role
          </label>

          <div className="flex gap-2">
            {["Admin", "Cashier", "Waiter"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelection(role)}
                className={`${
                  formData.role === role
                    ? "border border-yellow-400"
                    : ""
                } w-full bg-[#1f1f1f] rounded-lg py-2 text-[#ababab] transition hover:bg-[#2a2a2a]`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-5 py-2.5 bg-yellow-400 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition"
        >
          Sign Up
        </button>

      </form>
    </div>
  );
};

export default Register;

