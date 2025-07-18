"use client";
import { ReactNode } from "react";
import NavBar from "./_components/navBar";

type LayoutProps = {
  children: ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary-rich-black px-2 lg:px-10 xl:px-20">
      <div className="max-w-[1900px] mx-auto">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
