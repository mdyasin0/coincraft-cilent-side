import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import FAQ from "./FAQ";
import Swal from "sweetalert2";

const Home = () => {
  const [workers, setWorkers] = useState([]);

  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Check if email is empty
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email before subscribing!",
      });
      return;
    }

    // If email is valid
    Swal.fire({
      icon: "success",
      title: "Thank you for subscribing!",
      text: "You’ll now receive updates from CoinCrafter 🎉",
    });

    // Clear the field
    setEmail("");
  };

  useEffect(() => {
    fetch("https://coincraft-server-side.vercel.app/topuser")
      .then((res) => res.json())
      .then((data) => {
        setWorkers(data);
      });
  }, []);

  const slides = [
    {
      title: "Earn Coins by Completing Tasks",
      subtitle: "Join CoinCrafter and turn your time into money.",
      image: "https://i.ibb.co.com/fz0qLkxB/678bc0eb76e4ea001d22c928.webp",
    },
    {
      title: "Become a Digital Worker Today",
      subtitle: "Micro tasks, micro earnings — it's your time to shine!",
      image:
        "https://i.ibb.co.com/B2dMSgCS/Work-Fusion-introduces-Digital-Workers-new.jpg",
    },
    {
      title: "Need Tasks Done? Be a Buyer!",
      subtitle: "Get tasks completed fast by our top-rated workers.",
      image:
        "https://i.ibb.co.com/8LhFw3ff/man-performs-tasks-completing-assignments-end-list-cases-tasks-business-project-159757-1381.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rakib Hasan",
      feedback:
        "CoinCrafter has changed the way I earn online! It's fast, simple, and pays well.",
      photo: "https://i.ibb.co/ycvj8GWW/DSC-8801.jpg",
    },
    {
      id: 2,
      name: "Mehjabin Rahman",
      feedback:
        "As a student, I now earn pocket money easily by doing simple tasks!",
      photo:
        "https://i.ibb.co/7Nt94t1g/portrait-one-young-happy-cheerful-600nw-1980856400.webp",
    },
    {
      id: 3,
      name: "Tanvir Alam",
      feedback:
        "I posted my task and got it done within an hour. Super fast and reliable!",
      photo:
        "https://i.ibb.co/DDnqcHwG/Getting-additional-money-is-now-more-convenient-than-before-Article-Pic-scaled.jpg",
    },
  ];

  return (
    <>
      {/* slider */}
      <div className="w-full">
        <div className="py-10 pt-30 px-4 md:px-8" data-aos="fade-up">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full rounded-2xl max-w-[1600px] mx-auto"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="flex rounded-2xl  flex-col items-center justify-center h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] w-full bg-cover bg-center text-center px-4 text-black"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="bg-green-500 p-2 rounded-2xl">
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* best worker */}
      <div className="py-12 bg-[#f8fafc]" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-8 text-center">
            🔥 Top 6 Best Workers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {workers.map((worker) => (
              <div
                key={worker._id}
                className="bg-white shadow-md  rounded-lg p-4 hover:shadow-xl hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={worker.photoURL}
                  alt={worker.name}
                  className="w-full aspect-[4/3] object-cover rounded-md"
                />

                <h3 className="text-lg font-semibold text-[#0f172a] mb-1">
                  {worker.name}
                </h3>
                <p className="text-[#475569]">
                  Coins:{" "}
                  <span className="text-[#facc15] font-bold">
                    {worker.coin}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonial Section */}
      <div className="py-12 bg-[#f8fafc]" data-aos="fade-up">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-8 text-center">
            💬 What Our Users Say
          </h2>

          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center max-w-xl mx-auto">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#facc15]"
                  />
                  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[#334155] text-sm italic">
                    “{item.feedback}”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/*  "How It Works" Section */}

      <section className="bg-[#f8fafc] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-6">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Register & Choose Role",
                desc: "Sign up as Worker or Buyer and get instant welcome coins.",
              },
              {
                title: "2. Complete or Post Tasks",
                desc: "Workers complete tasks to earn, Buyers post jobs with coin payouts.",
              },
              {
                title: "3. Get Paid or Withdraw",
                desc: "Earn coins, withdraw via Bkash/Nagad, or purchase more coins.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-[#0284c7] mb-2">
                  {item.title}
                </h3>
                <p className="text-[#475569]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* "Platform Benefits" Section */}

      <section className="bg-[#ffffff] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0f172a] mb-6">
            Why Choose CoinCrafter?
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "💸", title: "Fast Earnings" },
              { icon: "🔐", title: "Secure Auth & Roles" },
              { icon: "⚡", title: "Instant Withdrawals" },
              { icon: "📈", title: "Live Coin Tracking" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] p-6 rounded-lg shadow hover:scale-105 transition"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#0284c7]">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section  */}
      <FAQ></FAQ>

      {/*  "Platform Stats" Section */}
      <section className="bg-[#0f172a] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#facc15]">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "5K+", label: "Completed Tasks" },
              { number: "2K+", label: "Active Users" },
              { number: "$10K+", label: "Payments Done" },
              { number: "500+", label: "Withdrawals Made" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl font-bold text-[#facc15]">
                  {stat.number}
                </p>
                <p className="text-[#cbd5e1]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* "Newsletter & CTA Section" */}
      <section className="bg-gradient-to-r from-[#0284c7] to-[#0f172a] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with CoinCrafter
          </h2>
          <p className="mb-6 text-[#facc15]">
            Subscribe to get the latest tasks and features right in your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded text-white w-full sm:w-2/3"
            />
            <button
              type="submit"
              className="bg-[#facc15] hover:bg-yellow-400 text-[#0f172a] font-semibold px-6 py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
