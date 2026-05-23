import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-secondary/60 backdrop-blur-md"></div>

      {/* GLOW EFFECT */}
      <div className="absolute w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>

      {/* LOADING CARD */}
      <div className="relative z-10 flex flex-col items-center">

        {/* CARD */}
        <div className="relative bg-base-100/90 backdrop-blur-xl border border-primary/20 rounded-4xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.25)] overflow-hidden">

          {/* INNER GLOW */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>

          {/* LOTTIE */}
          <div className="w-40 md:w-48 relative z-10">
            <Lottie
              animationData={loadingAnimation}
              loop={true}
            />
          </div>

          {/* TEXT */}
          <div className="text-center relative z-10 -mt-3">

            <h2 className="text-2xl font-bold text-secondary">
              Loading
            </h2>

            <p className="text-base-content/60 text-sm mt-2">
              Preparing your luxury experience...
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Loading;