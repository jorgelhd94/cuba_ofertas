"use client";

import Image from "next/image";
import EmptyImage from "@/public/assets/not_found.svg";

export default function EmptyMsg() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image src={EmptyImage} width={100} alt="Fetching Error" />
        <div className="flex flex-col items-center px-4 pt-2">
          <h3 className="text-2xl mb-2 font-medium">Búsqueda sin resultados</h3>
          <h5 className="text-lg">No se encontraron productos según el criterio de búsqueda introducido.</h5>
        </div>
      </div>
    </div>
  );
}
