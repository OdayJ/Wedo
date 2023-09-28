"use client";
import React from "react";

import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full pl-[280px] pt-14">{session?.user?.email}</div>
  );
}
