import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import decoratorImg from "../../assets/become-a-decorator.png";

import {
  FaPaintRoller,
  FaLocationDot,
  FaBriefcase,
  FaGlobe,
  FaPhone,
  FaUser,
  FaEnvelope,
} from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";

const BecomeADecorator = () => {
  const { register, handleSubmit, reset, control } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionDuplicate = serviceCenters.map((c) => c.region);

  const region = [...new Set(regionDuplicate)];

  const serviceRegion = useWatch({ name: "region", control });
  const serviceByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };

  const [loading, setLoading] = useState(false);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.data.url;
  };

  const handleApply = async (data) => {
    setLoading(true);

    try {
      let imageUrl = "";

      // upload image first
      if (data.teamImage && data.teamImage[0]) {
        imageUrl = await uploadToImgBB(data.teamImage[0]);
      }

      const res = await axiosSecure.post("/decorators", {
        email: user?.email,
        name: user?.displayName,
        teamName: data.teamName,
        specialty: data.specialty,
        experience: data.experience,
        phone: data.phone,
        region: data.region,
        district: data.district,
        bio: data.bio,

        // store image URL
        teamImage: imageUrl,

        status: "pending",
        createdAt: new Date(),
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          confirmButtonColor: "#CAEB66",
        });

        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-14">
      {/* HERO */}
      <div className="text-center mb-14">
        <span className="badge bg-primary text-secondary border-0 px-5 py-4 font-semibold">
          Join Our Decorator Network
        </span>

        <h2 className="text-4xl md:text-6xl font-black text-secondary mt-5">
          Become a Professional
          <span className="text-primary"> Decorator</span>
        </h2>

        <p className="max-w-3xl mx-auto mt-5 text-base-content/60 leading-relaxed">
          Turn your creativity into a professional career. Join DecorNest and
          connect with premium clients looking for expert decoration services.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-stretch">
        {/* LEFT SIDE */}
        <div className="relative overflow-hidden rounded-4xl min-h-175 shadow-2xl">
          <img
            src={decoratorImg}
            alt="Decorator"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <span className="badge bg-primary text-black border-0 w-fit mb-5">
              Premium Opportunity
            </span>

            <h3 className="text-4xl font-black mb-6">Why Join DecorNest?</h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-bold">Premium Decoration Projects</h4>

                  <p className="text-white/70 text-sm">
                    Work on weddings, luxury events and premium decorations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-bold">Build Your Portfolio</h4>

                  <p className="text-white/70 text-sm">
                    Showcase your creativity and attract more clients.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-bold">Trusted Client Network</h4>

                  <p className="text-white/70 text-sm">
                    Get connected with verified customers across Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <h4 className="font-bold">Career Growth</h4>

                  <p className="text-white/70 text-sm">
                    Expand your business and become a top-rated decorator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-base-100 border border-base-300 rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 lg:p-10">
          <div className="mb-8">
            <h3 className="text-3xl font-black text-secondary">
              Decorator Application
            </h3>

            <p className="text-base-content/60 mt-2">
              Complete the application form and our team will review your
              profile.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleApply)} className="space-y-5">
            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                <input
                  {...register("name")}
                  defaultValue={user?.displayName}
                  readOnly
                  className="input input-bordered w-full h-14 rounded-2xl pl-12"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                <input
                  {...register("email")}
                  defaultValue={user?.email}
                  readOnly
                  className="input input-bordered w-full h-14 rounded-2xl pl-12"
                />
              </div>
            </div>

            {/* TEAM NAME */}
            <div>
              <label className="label font-semibold">
                <FaGlobe />
                Team Name
              </label>

              <input
                {...register("teamName")}
                placeholder="Team Name"
                className="input input-bordered w-full rounded-2xl h-14"
              />
            </div>

                        {/* IMAGE */}
            <div>
              <label className="label font-semibold">
                <IoIosImages />
                Team Image</label>

              <input
                type="file"
                accept="image/*"
                {...register("teamImage")}
                className="file-input file-input-bordered w-full rounded-2xl h-14"
              />
            </div>

            {/* SPECIALTY */}
            <div>
              <label className="label font-semibold">
                <FaPaintRoller />
                Specialty
              </label>

              <select
                {...register("specialty", { required: true })}
                className="select select-bordered w-full rounded-2xl h-14"
              >
                <option value="">Select Your Specialty</option>
                <option>Wedding Decoration</option>
                <option>Home Decoration</option>
                <option>Corporate Events</option>
                <option>Stage Decoration</option>
                <option>Floral Design</option>
              </select>
            </div>

            {/* EXPERIENCE + PHONE */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-semibold">
                  <FaBriefcase />
                  Experience
                </label>

                <input
                  type="number"
                  {...register("experience")}
                  placeholder="Years of Experience"
                  className="input input-bordered w-full rounded-2xl h-14"
                />
              </div>

              <div>
                <label className="label font-semibold">
                  <FaPhone />
                  Phone Number
                </label>

                <input
                  {...register("phone")}
                  placeholder="01XXXXXXXXX"
                  className="input input-bordered w-full rounded-2xl h-14"
                />
              </div>
            </div>
            {/* LOCATION */}
            <div>
              <label className="label font-semibold mb-2">
                <FaLocationDot />
                Location
              </label>

              <div className="grid md:grid-cols-2 gap-4">
                {/* REGION */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-base-content/70">
                    Your Region
                  </label>

                  <select
                    {...register("region")}
                    className="select select-bordered w-full rounded-2xl h-14"
                  >
                    <option value="">Select your Region</option>
                    {region.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DISTRICT */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-base-content/70">
                    Your District
                  </label>

                  <select
                    {...register("district")}
                    className="select select-bordered w-full rounded-2xl h-14"
                    disabled={!serviceRegion}
                  >
                    <option value="">Select your District</option>

                    {serviceRegion &&
                      serviceByRegion(serviceRegion).map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 rounded-2xl text-black font-bold border-0"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Apply as Decorator"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeADecorator;
