import Image from "next/image";
import Link from "next/link";
import { FaTasks } from "react-icons/fa";
export default function Home() {
  return (
    <div className="flex items-center justify-center py-12 px-7 font-poppins ">
      <div className="xl:w-[1085px] md:w-[650px] w-[343px] h-full xl:gap-8 gap-20 flex flex-col ">
        <div className="flex justify-between ">
          <div className="flex gap-4">
            <FaTasks fill="#845EF7" size={45} />
            <p className="  flex items-center text-primary font-bold text-2xl">
              Wedo
            </p>
          </div>
          <div className="text-center flex justify-center items-center gap-8 text-lg text-neutral">
            <Link href="/signin">
              <p className="opacity-70">Login</p>
            </Link>
            <p className="hidden lg:block text-2xl text-[#D9D9D9] font-light">
              |
            </p>
            <Link href="/signup">
              <button className=" hidden lg:block text-white font-medium bg-primary w-[90px] h-9 rounded-lg">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="self-center flex flex-col items-center justify-center gap-8 xl:w-[485px] text-center">
          <p className="md:text-4xl text-2xl  text-neutral font-semibold">
            Organize, collaborate and work, all togehter.
          </p>
          <p className="text-neutral text-sm md:text-base opacity-40">
            Stay on top of your tasks and achieve productivity nirvana with our
            collaborative todo list.
          </p>
          <Link href="/signup">
            <button className=" text-white font-medium bg-primary w-[148px] h-9 rounded-lg">
              Get Started
            </button>
          </Link>
          <div className="md:w-[560px] md:h-[337px]  h-[350px] w-[350px] relative">
            <Image alt="wedolanding" src="/landing.svg" fill sizes="100vw" />
          </div>
        </div>
      </div>
    </div>
  );
}
