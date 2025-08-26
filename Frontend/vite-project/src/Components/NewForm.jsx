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
    console.log(newformData.file);
    const payload = new FormData();
    payload.append("name", newformData.name);
    payload.append("email", newformData.email);
    payload.append("phone", newformData.phone);
    payload.append("city", newformData.city);
    payload.append("state", newformData.state);
    payload.append("addressline", newformData.addressline);
    payload.append("position", newformData.position);
    payload.append("file", newformData.file);

    try {
      const response = await axios.post(
        "https://estrobic-form-backend123.onrender.com/api/upload",
        payload
      );
      console.log(response.data.data);
      setuploadResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw]  h-[100vh] flex flex-col gap-5 justify-center items-center pt-20">
      <h1 className="text-3xl font-bold ">My Information</h1>
      <form
        action=""
        className="flex flex-col gap-8 border-2 rounded-2xl p-5 w-1/4"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Legal Name</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name..."
              className="border p-3 rounded-lg "
              name="name"
              value={newformData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Address</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              Address line 1
            </label>
            <input
              type="text"
              placeholder=""
              className="border p-3 rounded-lg "
              name="addressline"
              value={newformData.addressline}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              City
            </label>
            <input
              type="text"
              placeholder=""
              className="border p-3 rounded-lg "
              name="city"
              value={newformData.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              State
            </label>
            <input
              type="text"
              placeholder=""
              className="border p-3 rounded-lg "
              name="state"
              value={newformData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Email Id</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              Email Address
            </label>
            <input
              type="text"
              placeholder="Enter your Email..."
              className="border p-3 rounded-lg "
              name="email"
              value={newformData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">Phone Details</h1>
          <div className="flex flex-col gap-3">
            <label htmlFor="" className="self-start">
              Phone No.
            </label>
            <input
              type="text"
              placeholder="Enter your Phone No. "
              className="border p-3 rounded-lg "
              name="phone"
              value={newformData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <label htmlFor="position" className="self-start">
            Position applied for
          </label>
          <select
            name="position"
            id="position"
            value={newformData.position}
            onChange={handleChange}
            className="py-2 px-3 bg-[#f9f9f9] text-[16px] rounded-lg border border-[#ccc] focus:border-[#007bff] outline-none"
          >
            <option value="">Choose position</option>
            <option value="backend">Backend Developer</option>
            <option value="frontend">Frontend Developer</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="self-start">
            Resume
          </label>
          <input
            type="file"
            placeholder="Enter your name..."
            className="border p-3 rounded-lg cursor-pointer"
            name="file"
            onChange={handleChange}
          />
        </div>
        <button
          className="self-end p-3 bg-black text-white rounded-2xl cursor-pointer w-1/2"
          onClick={handleClick}
        >
          Save
        </button>
      </form>
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
