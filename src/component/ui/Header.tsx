import type { VFC } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "public/image/logo.png";

export const Header: VFC = () => {
  return (
    <header className="flex gap-4 justify-center py-6 text-gray-600 bg-gray-200">
      <Link href="/">
        <a>
          <Image src={logo} alt="logo" width={75} height={75} />
        </a>
      </Link>
      <Link href="/">
        <a className=" flex justify-items-center text-4xl text-center">
          <h1 className="pt-4">Manga List</h1>
        </a>
      </Link>
    </header>
  );
};
