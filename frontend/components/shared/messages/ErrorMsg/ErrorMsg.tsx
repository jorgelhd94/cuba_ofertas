"use client";

import Image from "next/image";
import ErrorImage from "@/public/assets/error.svg";

type ErrorMsgProps = {
  title?: string;
  message?: string;
};

export const ErrorMsg: React.FC<ErrorMsgProps> = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image src={ErrorImage} width={100} alt="Fetching Error" priority />
        <div className="flex flex-col items-center px-4 pt-2">
          <h3 className="text-2xl mb-2 font-medium">
            {props.title || "Error de conexión"}
          </h3>
          <h5 className="text-lg">
            {props.message || "Ha ocurrido un error al conectarse al servidor."}
          </h5>
        </div>
      </div>
    </div>
  );
};
