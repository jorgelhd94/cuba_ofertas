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
            {props.title || "Opps!!"}
          </h3>
          <h4 className="text-xl">
            {props.message || "Ha ocurrido un error al conectarse al servidor."}
          </h4>
        </div>
      </div>
    </div>
  );
};
