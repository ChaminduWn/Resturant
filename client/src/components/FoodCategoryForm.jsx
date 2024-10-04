import React, { useState, useEffect, useRef } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase"; // Import Firebase app instance
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function FoodCategoryForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    category: "Breakfast",
    price: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(null);

  const filePickerRef = useRef();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Upload image to Firebase when the image file changes
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageUploading(true);
    setImageUploadError(null);
    const storage = getStorage(app); // Firebase storage instance
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError("Error uploading image. Please try again.");
        setImageUploadProgress(null);
        setImageUploading(false);

        Toastify({
          text: "Error uploading image!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, image: downloadURL }));
        setImageUploading(false);

        Toastify({
          text: "Image uploaded successfully!",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
      }
    );
    
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUploading) {
      alert("Please wait until the image is uploaded.");
      return;
    }

    try {
      const response = await fetch("/api/foods/createFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        Toastify({
          text: "Food item created successfully!",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();

        setFormData({
          foodName: "",
          description: "",
          category: "Breakfast",
          price: "",
          image: "",
        });
        setImageFile(null);
        setImageUploadProgress(null);
      } else {
        Toastify({
          text: "Failed to create food item!",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          duration: 3000,
          gravity: "top",
          position: "right",
        }).showToast();
      }
    } catch (error) {
      console.error("Error creating food item:", error);

      Toastify({
        text: "Error occurred while creating food item!",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="container max-w-screen-lg mx-auto">
        <div className="p-8 mb-6 bg-white rounded shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-gray-600">
            Food Adding Form
          </h2>
          <p className="mb-6 text-gray-500">
            Please fill out the form below to create a new food category.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="foodName">Food Name</label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="Enter food name"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  required
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full h-20 px-4 mt-1 border rounded bg-gray-50"
                  required
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Shorties">Shorties</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                  required
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={filePickerRef}
                  className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                />
              </div>
              {imageUploadProgress && (
                <div className="flex justify-center md:col-span-5">
                  <div style={{ width: 80, height: 80 }}>
                    <CircularProgressbar
                      value={imageUploadProgress || 0}
                      text={`${imageUploadProgress}%`}
                      strokeWidth={5}
                    />
                  </div>
                </div>
              )}
              {imageUploadError && (
                <p className="text-red-500 error md:col-span-5">
                  {imageUploadError}
                </p>
              )}

              <div className="text-right md:col-span-5">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  disabled={imageUploading}
                >
                  {imageUploading ? "Uploading..." : "Create Food Category"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
