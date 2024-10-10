import { auth, signIn } from "@/auth";
import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-1/2">
        <img
          src="hero/img/register__icon.png"
          alt="Tokopedia mascot with shopping bags and a storefront illustration"
          className="w-96 h-auto"
        />
        <h1 className="text-xl font-semibold mt-6 text-gray-800">
          Jual Beli Mudah Hanya di Tokopedia
        </h1>
        <p className="text-gray-500 mt-2">
          Gabung dan rasakan kemudahan bertransaksi di Tokopedia
        </p>
      </div>
      <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Daftar Sekarang
          </h2>
          <p className="text-gray-500 mb-4">
            Sudah punya akun Tokopedia?{" "}
            <Link href="#" className="text-green-700">
              Masuk
            </Link>
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button
            type="submit"
            className="w-full border border-gray-300 py-2 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-50 mb-4 font-bold"
          >
            <Icons.Google className="w-4 h-4 mr-1" />
            Google
          </button>
        </form>
        <div className="flex items-center justify-center mb-4">
          <span className="border-t border-gray-300 w-full" />
          <span className="mx-2 text-gray-400">atau</span>
          <span className="border-t border-gray-300 w-full" />
        </div>
        <input
          type="text"
          placeholder="Nomor HP atau E-mail"
          className="w-full border border-gray-300 p-3 rounded-md mb-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <span className="text-gray-400 text-sm">
          Contoh: email@tokopedia.com
        </span>
        <button className="w-full bg-gray-200 text-gray-400 py-3 mt-4 rounded-md cursor-not-allowed">
          Daftar
        </button>
        <p className="text-gray-500 text-center mt-4 text-sm">
          Dengan mendaftar, saya menyetujui{" "}
          <a href="#" className="text-green-600">
            Syarat &amp; Ketentuan
          </a>{" "}
          serta{" "}
          <a href="#" className="text-green-600">
            Kebijakan Privasi Tokopedia
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default page;
