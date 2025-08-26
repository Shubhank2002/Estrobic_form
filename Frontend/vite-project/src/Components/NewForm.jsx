import axios from "axios";
import React, { useState } from "react";

const NewForm = () => {
  const [newformData, setnewformData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    file: null,
    addressline: "",
    city: "",
    state: "",
  });
  const [uploadResult, setuploadResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setnewformData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(newformData).forEach(([key, value]) =>
      payload.append(key, value)
    );

    try {
      const response = await axios.post(
        "https://estrobic-form-backend123.onrender.com/api/upload",
        payload
      );
      setuploadResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center">My Information</h1>

      <form className="flex flex-col gap-8 border-2 rounded-3xl p-6 w-full max-w-2xl bg-white shadow-md">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            className="border p-3 rounded-lg w-full"
            name="name"
            value={newformData.name}
            onChange={handleChange}
          />
        </div>

        {/* Address Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Address</h2>
          <input
            type="text"
            placeholder="Address line 1"
            className="border p-3 rounded-lg w-full"
            name="addressline"
            value={newformData.addressline}
            onChange={handleChange}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="border p-3 rounded-lg w-full"
              name="city"
              value={newformData.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="State"
              className="border p-3 rounded-lg w-full"
              name="state"
              value={newformData.state}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your Email..."
            className="border p-3 rounded-lg w-full"
            name="email"
            value={newformData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Phone No.</label>
          <input
            type="text"
            placeholder="Enter your phone number..."
            className="border p-3 rounded-lg w-full"
            name="phone"
            value={newformData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Position applied for</label>
          <select
            name="position"
            value={newformData.position}
            onChange={handleChange}
            className="py-3 px-3 bg-[#f9f9f9] text-[16px] rounded-lg border border-[#ccc] focus:border-blue-500 outline-none w-full"
          >
            <option value="">Choose position</option>
            <option value="backend">Backend Developer</option>
            <option value="frontend">Frontend Developer</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Resume</label>
          <input
            type="file"
            className="border p-3 rounded-lg cursor-pointer w-full"
            name="file"
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          className="p-3 bg-black text-white rounded-2xl cursor-pointer w-full md:w-1/2 mx-auto hover:bg-blue-500 transition-all"
          onClick={handleClick}
        >
          Save
        </button>
      </form>

      {/* Resume Link */}
      {uploadResult?.file?.url && (
        <a
          href={uploadResult.file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-4"
        >
          View Uploaded Resume
        </a>
      )}
    </div>
  );
};

export default NewForm;
