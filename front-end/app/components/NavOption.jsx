"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavOption({ icon, title, id }) {
  const currentPage = usePathname();

  return (
    <>
      {title == "Feed" ? (
        <Link href={{ pathname: `/feed` }}>
          <div
            className={
              currentPage == `/feed`
                ? "rounded-md h-10 w-60 text-lg bg-[#EEEEEE] flex gap-4 items-center px-4"
                : "rounded-md h-10 w-60 text-lg  flex gap-4 items-center px-4 hover:bg-[#EEE]"
            }
          >
            <div className="text-2xl">{icon}</div>
            <div>{title}</div>
          </div>
        </Link>
      ) : (
        <Link
          href={{
            pathname: `/projects/${id}`,
          }}
        >
          <div
            className={
              currentPage == `/projects/${id}`
                ? "rounded-md h-10 w-60 text-lg bg-[#EEEEEE] flex gap-4 items-center px-4"
                : "rounded-md h-10 w-60 text-lg  flex gap-4 items-center px-4 hover:bg-[#eee]"
            }
          >
            <div className="text-2xl">{icon}</div>
            <div>{title}</div>
          </div>
        </Link>
      )}
    </>
  );
}
