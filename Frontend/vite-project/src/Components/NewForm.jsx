import axios from "axios";
import React, { useState } from "react";

const NewForm = () => {
  const [newformData, setnewformData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
    file: null,
  });
  const [uploadResult, setuploadResult] = useState(null)

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
    payload.append("position", newformData.position);
    payload.append("file", newformData.file);

    try {
      const response = await axios.post(
        "https://estrobic-form-backend123.onrender.com/api/upload",
        payload
      );
      console.log(response.data.data)
      setuploadResult(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw]  h-[100vh] flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl font-bold ">Form</h1>
      <form
        action=""
        className="flex flex-col gap-5 border-2 rounded-2xl p-5 w-1/4"
      >
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
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="self-start">
            Email
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
        <div className="flex flex-col gap-3">
          <label htmlFor="" className="self-start">
            Position applied for
          </label>
          <input
            type="text"
            placeholder="Enter the position "
            className="border p-3 rounded-lg "
            name="position"
            value={newformData.position}
            onChange={handleChange}
          />
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
          className="self-end p-3 bg-blue-500 rounded-2xl cursor-pointer w-1/2"
          onClick={handleClick}
        >
          Submit
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
