"use client";

import Image from "next/image";
import EmptyImage from "@/public/assets/empty.svg";

export default function EmptyMsg() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex max-sm:flex-col items-center">
        <Image src={EmptyImage} width={250} alt="Fetching Error" />
        <div className="flex flex-col max-sm:items-center px-4">
          <h3 className="text-3xl mb-2">Opss!!</h3>
          <h5 className="text-xl">No se han encontrado resultados.</h5>
        </div>
      </div>
    </div>
  );
}
