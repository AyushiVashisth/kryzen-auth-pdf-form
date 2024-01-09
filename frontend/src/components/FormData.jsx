// FormComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormComponent = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("age", age);
    formData.append("address", address);
    formData.append("photo", photo);

    const token = localStorage.getItem("token");

    try {
      let response = await axios.post("http://localhost:8080/form/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFormId(response.data.formData._id);

      toast.success("Form submitted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error("Error submitting form", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/form/pdf/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer',
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fullName} form.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error downloading PDF", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url("https://images.jdmagicbox.com/comp/pune/l2/020pxx20.xx20.221129084005.u8l2/catalogue/kryzen-biotech-private-limited-wakad-pune-greenhouse-manufacturers-i0elbx7owu.jpg")` }}>
      <form className="bg-[#155524] rounded-lg shadow-lg px-8 py-10 w-96 text-white">
        <h2 className="text-3xl mb-6 font-bold">Form Fill</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-left mb-2">Full Name</label>
          <input
            type="text"
            readOnly
            value={fullName}
            className="bg-gray-300 text-gray-800 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-left">Age</label>
          <input
            type="number"
            placeholder="Enter your age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-left">Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            className="shadow appearance-none border rounded w-full text-black py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-left">Photo</label>
          <input
            type="file"
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-950 w-full hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {formId && (
            <button
              className="bg-red-700 w-full mx-3 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FormComponent;
