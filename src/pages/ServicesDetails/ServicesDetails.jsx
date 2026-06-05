import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  FaStar,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
  FaGem,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAuthModal from "../../hooks/useAuthModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import Reveal from "../../animation/Reveal";

const ServicesDetails = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { setShowLoginModal, pendingBooking, setPendingBooking } =
    useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const serviceCenters = useLoaderData();

  const region = [...new Set(serviceCenters.map((c) => c.region))];

  const serviceRegion = useWatch({ name: "region", control, defaultValue: "" });
  const serviceByRegion = (region) => {
    const regionDistrict = serviceCenters.filter((c) => c.region === region);
    const district = regionDistrict.map((d) => d.district);
    return district;
  };
  const [showModal, setShowModal] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${serviceId}`);
      return res.data;
    },
    enabled: !!serviceId,
  });

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (service?.images?.length) {
      setMainImage(service.images[0]);
    }
  }, [service]);

  useEffect(() => {
    if (user && pendingBooking) {
      setShowModal(true);
      setPendingBooking(false);
    }
  }, [user, pendingBooking, setPendingBooking]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!service) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Service Not Found
      </div>
    );
  }

  const handleBooking = async (data) => {
    const bookingInfo = {
      userName: user.displayName,
      userEmail: user.email,

      serviceId: service._id,
      serviceName: service.service_name,
      serviceImage: service.images[0],
      servicePrice: service.cost,

      bookingDate: data.bookingDate,
      bookingTime: data.bookingTime,
      bookingRegion: data.region,
      bookingDistrict: data.district,
      serviceMode: data.serviceMode,

      paymentStatus: "unpaid",
      bookingStatus: "pending",
    };

    console.log(bookingInfo);

    Swal.fire({
      title: "Confirm Booking?",
      text: "Do you want to confirm this decoration booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Booking",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/bookings", bookingInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Booking Successful!",
              text: "Your decoration booking has been confirmed.",
              icon: "success",
            });
            setShowModal(false);
            navigate("/dashboard/my-bookings");
          }
        });
      }
    });
  };

  const handleBookNow = () => {
    if (user) {
      setShowModal(true);
    } else {
      setPendingBooking(true);
      setShowLoginModal(true);
    }
  };
  return (
    <section className="py-20 px-4 lg:px-8 bg-base-100">
      {/* TOP GRID */}
      <Reveal>
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8">
            {/* MAIN IMAGE */}
            <div className="relative rounded-[36px] overflow-hidden group">
              <img
                src={mainImage}
                alt={service.service_name}
                className="w-full h-75 md:h-125 lg:h-155 object-cover group-hover:scale-105 transition duration-700"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

              {/* CATEGORY */}
              <div className="absolute top-6 left-6">
                <span className="px-5 py-2 rounded-full bg-primary text-primary-content font-semibold shadow-lg">
                  {service.category}
                </span>
              </div>

              {/* FLOATING INFO */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                        {service.service_name}
                      </h2>

                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 text-primary">
                          <FaStar />

                          <span className="text-white font-medium">
                            {service.rating} Rating
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-white/80">
                          <FaMapMarkerAlt />

                          <span>Bangladesh Wide Service</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-4xl font-black text-primary">
                        ৳{service.cost}
                      </h2>

                      <p className="text-white/70 text-sm text-right">
                        {service.unit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-4 gap-4 mt-5">
              {service.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`rounded-2xl overflow-hidden cursor-pointer border-2 transition duration-300 group ${
                    mainImage === img
                      ? "border-primary scale-[0.98]"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-24 md:h-32 object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>

            {/* DESCRIPTION */}
            <div className="mt-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FaGem />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold">
                  Service Overview
                </h2>
              </div>

              <p className="text-base-content/70 leading-9 text-base md:text-lg">
                {service.description}
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid md:grid-cols-3 gap-5 mt-14">
              <div className="bg-base-100 border border-base-300 rounded-[28px] p-7 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-5">
                  <FaCalendarAlt />
                </div>

                <h3 className="text-2xl font-bold mb-3">Flexible Scheduling</h3>

                <p className="text-base-content/70 leading-7">
                  Choose your perfect event date and booking slot easily.
                </p>
              </div>

              <div className="bg-base-100 border border-base-300 rounded-[28px] p-7 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-5">
                  <FaClock />
                </div>

                <h3 className="text-2xl font-bold mb-3">Fast Setup</h3>

                <p className="text-base-content/70 leading-7">
                  Quick and professional decoration setup without delays.
                </p>
              </div>

              <div className="bg-base-100 border border-base-300 rounded-[28px] p-7 hover:-translate-y-2 transition duration-500 shadow-sm hover:shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-2xl mb-5">
                  <FaShieldAlt />
                </div>

                <h3 className="text-2xl font-bold mb-3">Trusted Service</h3>

                <p className="text-base-content/70 leading-7">
                  Experienced decorators with premium quality assurance.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-base-100 border border-base-300 rounded-[36px] p-8 shadow-xl">
                {/* TITLE */}
                <div className="mb-8">
                  <p className="text-primary uppercase tracking-[3px] text-sm font-semibold mb-3">
                    Premium Booking
                  </p>

                  <h2 className="text-3xl font-bold leading-tight">
                    Reserve Your Decoration Service Today
                  </h2>
                </div>

                {/* CHECKLIST */}
                <div className="space-y-5 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FaUsers />
                    </div>

                    <div>
                      <h4 className="font-bold mb-1">Professional Team</h4>

                      <p className="text-sm text-base-content/60">
                        Skilled decorators for luxury event experiences.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FaCheckCircle />
                    </div>

                    <div>
                      <h4 className="font-bold mb-1">Premium Materials</h4>

                      <p className="text-sm text-base-content/60">
                        Elegant flowers, lighting and decoration setup.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <FaClock />
                    </div>

                    <div>
                      <h4 className="font-bold mb-1">Real-time Availability</h4>

                      <p className="text-sm text-base-content/60">
                        Flexible scheduling and fast booking confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE CARD */}
                <div className="rounded-3xl bg-secondary text-secondary-content p-6 mb-8">
                  <p className="text-white/70 mb-2">Starting From</p>

                  <h2 className="text-5xl font-black text-primary">
                    ৳{service.cost}
                  </h2>

                  <p className="text-white/60 mt-2">{service.unit}</p>
                </div>

                {/* BUTTON */}
                <button
                  onClick={handleBookNow}
                  className="btn bg-primary hover:bg-primary border-none w-full h-14 rounded-full text-primary-content text-base font-semibold shadow-lg shadow-primary/20"
                >
                  Book Now
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* MODAL */}
      {showModal && (
        <dialog className="modal modal-open backdrop-blur-sm">
          <div className="modal-box max-w-3xl rounded-[36px] p-8 md:p-10 bg-base-100 border border-base-300">
            {/* HEADER */}
            <div className="mb-8">
              <p className="text-primary uppercase tracking-[3px] text-sm font-semibold mb-3">
                Booking Form
              </p>

              <h2 className="text-4xl font-bold">Confirm Your Booking</h2>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(handleBooking)} className="space-y-6">
              {/* USER INFO */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold mb-3 block">User Name</label>

                  <input
                    type="text"
                    value={user.displayName || ""}
                    readOnly
                    className="input input-bordered w-full rounded-2xl h-14"
                  />
                </div>

                <div>
                  <label className="font-semibold mb-3 block">Email</label>

                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="input input-bordered w-full rounded-2xl h-14"
                  />
                </div>
              </div>

              {/* SERVICE */}
              <div>
                <label className="font-semibold mb-3 block">Service Name</label>

                <input
                  type="text"
                  value={service.service_name}
                  readOnly
                  className="input input-bordered w-full rounded-2xl h-14"
                />
              </div>

              {/* DATE TIME */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-semibold mb-3 block">
                    Booking Date
                  </label>

                  <input
                    type="date"
                    className="input input-bordered w-full rounded-2xl h-14"
                    {...register("bookingDate", {
                      required: "Booking date is required",
                    })}
                  />
                  {errors.bookingDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bookingDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-semibold mb-3 block">Time Slot</label>

                  <select
                    className="select select-bordered w-full rounded-2xl h-14"
                    {...register("bookingTime", {
                      required: "Please select a time slot",
                    })}
                  >
                    <option value="">Select Time</option>

                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                  {errors.bookingTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.bookingTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* LOCATION */}
              {/* Region */}
              <div>
                <label className="font-semibold mb-3 block">Your Region</label>
                <select
                  {...register("region")}
                  className="select select-bordered w-full rounded-2xl h-14"
                >
                  <option>Select your Region</option>
                  {region.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="font-semibold mb-3 block">
                  Your District
                </label>
                <select
                  {...register("district")}
                  className="select select-bordered w-full rounded-2xl h-14"
                >
                  <option>Select your District</option>
                  {serviceByRegion(serviceRegion).map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* MODE */}
              <div>
                <label className="font-semibold mb-3 block">Service Mode</label>

                <select
                  className="select select-bordered w-full rounded-2xl h-14"
                  {...register("serviceMode", {
                    required: "Service Mode is required",
                  })}
                >
                  <option>At Venue</option>
                  <option>Indoor Setup</option>
                  <option>Outdoor Setup</option>
                </select>
                {errors.serviceMode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.serviceMode.message}
                  </p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline rounded-full px-8"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn bg-primary hover:bg-primary border-none rounded-full px-8 text-primary-content"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default ServicesDetails;
