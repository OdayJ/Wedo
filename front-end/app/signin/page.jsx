import { FaTasks } from "react-icons/fa";
export default function page() {
  return (
    <div className="flex items-center justify-center py-12 px-7 ">
      <div className="w-[343px] h-full xl:w-[1085px] gap-11  xl:gap-8 flex flex-col ">
        <div className="flex gap-4 ">
          <FaTasks fill="#845EF7" size={45} />
          <p className="  flex items-center text-primary font-bold text-2xl">
            Wedo
          </p>
        </div>
        <div className=" self-start grid  grid-cols-5 place-items-center">
          <div className="w-full h-full xl:w-2/3 justify-self-start  col-span-5 xl:col-span-3   flex flex-col  justify-center items-center gap-4 text-neutral font-poppins">
            <div className="mb-7 self-start flex flex-col gap-11 ">
              <div className="flex flex-col gap-2">
                <p className=" text-3xl font-semibold">Login</p>
                <div className="flex gap-x-1  text-lg ">
                  <p className="opacity-60 ">New here? </p>
                  <a href="/signup" className="opacity-100 font-bold">
                    Sign Up!
                  </a>
                </div>
              </div>
            </div>
            <form className="w-full grid grid-rows-3 gap-5 ">
              <div className="w-full h-16 border border-[#E6E6E6] rounded-lg p-2 text-neutral">
                <p className="mb-2 text-xs font-medium ">Email</p>
                <input
                  className="w-full placeholder-neutral placeholder-opacity-30 text-sm outline-none"
                  type="text"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="w-full h-16 border border-[#E6E6E6] rounded-lg p-2 text-neutral">
                <p className="mb-2 text-xs  font-medium ">Password</p>
                <input
                  className="w-full placeholder-neutral placeholder-opacity-30 outline-none text-sm "
                  type="password"
                  placeholder="Enter your password..."
                />
              </div>
              <button className="w-full h-16 bg-primary rounded-lg  font-semibold text-2xl text-white ">
                Login
              </button>
            </form>

            <div className="w-full h-9 text-xs opacity-60">
              By continuing you agree that you have read, understood and agree
              to Wedo <strong>terms and conditions.</strong>
            </div>
          </div>
          <img
            src="./Signin.png"
            className="w-[456px] h-[442px] col-span-2 xl:block hidden"
          />
        </div>
      </div>
    </div>
  );
}
