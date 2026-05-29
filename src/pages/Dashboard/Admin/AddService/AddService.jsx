
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BsCloudUpload } from "react-icons/bs";
import { FaStar, FaArrowRight } from "react-icons/fa";

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AddService = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([null, null, null, null]);
  const [preview, setPreview] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  const watchedName = watch("service_name");
  const watchedCategory = watch("category");
  const watchedCost = watch("cost");
  const watchedDescription = watch("description");
  const watchedUnit = watch("unit");

  const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;

  const previewService = {
    service_name: watchedName || "Luxury Wedding Decoration",
    category: watchedCategory || "Decoration",
    cost: watchedCost || 0,
    rating: 4.5,
    description:
      watchedDescription ||
      "Your service description preview will appear here.",
    unit: watchedUnit || "per project",
    images: [
      preview[0] ||
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200",
    ],
  };

  const handleImageChange = (index, file) => {
    if (!file) return;

    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);

    const newPreview = [...preview];
    newPreview[index] = URL.createObjectURL(file);
    setPreview(newPreview);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!result.success) {
      throw new Error("Image upload failed");
    }

    return result.data.url;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const uploadedImages = await Promise.all(
        images
          .filter((img) => img !== null)
          .map((img) => uploadImage(img))
      );

      const serviceData = {
        service_name: data.service_name,
        category: data.category,
        description: data.description,
        unit: data.unit,
        cost: Number(data.cost),
        rating: Number(data.rating),
        images: uploadedImages,
        createdByEmail: user?.email,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/services", serviceData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Service Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        });

        reset();

        setImages([null, null, null, null]);
        setPreview([null, null, null, null]);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed to add service",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="bg-linear-to-r from-secondary to-slate-800 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold">
            Create Decoration Service
          </h1>

          <p className="mt-2 text-white/70">
            Showcase your premium decoration expertise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-base-100 rounded-3xl border border-base-300 shadow-xl overflow-hidden"
            >
              <div className="bg-accent px-8 py-6 border-b border-base-300">
                <h2 className="text-2xl font-semibold text-secondary">
                  Service Information
                </h2>

                <p className="text-neutral/60 mt-1">
                  Fill all service details carefully.
                </p>
              </div>

              <div className="p-8">

                {/* IMAGE UPLOAD */}
                <h3 className="font-semibold text-lg mb-4 text-secondary">
                  Service Gallery
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {images.map((img, index) => (
                    <label
                      key={index}
                      className="
                        h-25
                        rounded-2xl
                        border-2
                        border-dashed
                        border-primary/40
                        bg-accent
                        hover:border-primary
                        hover:bg-primary/5
                        transition-all
                        cursor-pointer
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          handleImageChange(
                            index,
                            e.target.files?.[0]
                          )
                        }
                      />

                      {preview[index] ? (
                        <img
                          src={preview[index]}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center">
                          <BsCloudUpload
                            size={40}
                            className="text-primary"
                          />

                          <span className="text-sm mt-2 text-neutral/60">
                            Upload
                          </span>
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                {/* FORM FIELDS */}
                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Service Name
                    </label>

                    <input
                      {...register("service_name", {
                        required: "Service name is required",
                      })}
                      placeholder="Wedding Decoration"
                      className="input input-bordered w-full"
                    />

                    {errors.service_name && (
                      <p className="text-error text-sm mt-1">
                        {errors.service_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Cost
                    </label>

                    <input
                      {...register("cost", {
                        required: "Cost is required",
                      })}
                      type="number"
                      placeholder="15000"
                      className="input input-bordered w-full"
                    />

                    {errors.cost && (
                      <p className="text-error text-sm mt-1">
                        {errors.cost.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Category
                    </label>

                    <input
                      {...register("category", {
                        required: "Category is required",
                      })}
                      placeholder="Wedding"
                      className="input input-bordered w-full"
                    />

                    {errors.category && (
                      <p className="text-error text-sm mt-1">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Billing Unit
                    </label>

                    <select
                      {...register("unit")}
                      className="select select-bordered w-full"
                    >
                      <option value="per project">Per Project</option>
                      <option value="per hour">Per Hour</option>
                      <option value="per event">Per Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Rating
                    </label>

                    <input
                      {...register("rating")}
                      defaultValue={4.5}
                      type="number"
                      step="0.1"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label className="font-medium text-sm mb-2 block">
                      Owner Email
                    </label>

                    <input
                      value={user?.email || ""}
                      disabled
                      className="input input-bordered w-full bg-base-200"
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}
                <div className="mt-6">
                  <label className="font-medium text-sm mb-2 block">
                    Description
                  </label>

                  <textarea
                    {...register("description")}
                    rows={6}
                    placeholder="Describe your decoration service..."
                    className="textarea textarea-bordered w-full"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    btn
                    w-full
                    mt-8
                    bg-primary
                    text-primary-content
                    border-none
                    rounded-xl
                    h-14
                    text-base
                  "
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Uploading...
                    </>
                  ) : (
                    "Publish Service"
                  )}
                </button>

              </div>
            </form>
          </div>

          {/* LIVE PREVIEW */}
          <div>
            <div className="group relative h-130 rounded-[30px] overflow-hidden shadow-xl">

              <img
                src={previewService.images[0]}
                alt={previewService.service_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>

              <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
                <span className="px-4 py-1.5 bg-primary text-primary-content rounded-full text-xs font-semibold">
                  {previewService.category}
                </span>

                <div className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  <FaStar className="text-primary text-xs" />
                  {previewService.rating}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {previewService.service_name}
                </h3>

                <p className="text-primary text-xl font-bold">
                  ৳ {previewService.cost}
                </p>
              </div>

              <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[28px] p-6 flex flex-col h-full">

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {previewService.service_name}
                  </h3>

                  <p className="text-white/80 text-sm leading-7 mb-6 min-h-22.5">
                    {previewService.description.slice(0, 120)}
                  </p>

                  <div className="flex justify-between items-center mt-auto mb-6">
                    <div>
                      <p className="text-white/60 text-xs">
                        Starting Price
                      </p>

                      <h4 className="text-primary text-2xl font-bold">
                        ৳ {previewService.cost}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-white/60 text-xs">
                        Billing
                      </p>

                      <p className="text-white font-medium">
                        {previewService.unit}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-primary-content font-semibold"
                  >
                    View Details
                    <FaArrowRight />
                  </button>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddService;

