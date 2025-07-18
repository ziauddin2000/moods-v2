import Image from "next/image";
import Link from "next/link";

export default function StartSession() {
  return (
    <Link
          href="/dashboard/sessies"
          className="md:w-[50%] md:h-fit xl:w-full bg-linear-to-bl from-[#0C221B] to-[#5C7E6C] rounded-xl p-5"
        >
          <div className="flex justify-end">
            <Image
              src="/icons/arrow-top-right.svg"
              width={80}
              height={80}
              alt="Arrow Top Right"
            ></Image>
          </div>
          <h3 className="mt-10 text-xl font-medium text-primary-beige">
            start sessie
          </h3>
        </Link>
  )
}
