"use client";

import Image from "next/image";
import CheckCircle from "@/public/assets/check-circle.svg";

type CreateZoneSuccessMsgProps = {
  message?: string;
};

export const CreateZoneSuccessMsg: React.FC<CreateZoneSuccessMsgProps> = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image src={CheckCircle} width={100} alt="Created Successfully" />
        <div className="flex flex-col items-center px-4 pt-2">
          <h3 className="text-2xl mb-2 font-medium text-center">La zona de comparación se ha creado correctamente</h3>
        </div>
      </div>
    </div>
  );
};
