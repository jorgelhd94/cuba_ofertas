"use client";

import FetchingErrorImage from "@/public/assets/error-fetch.svg";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ErrorFetchingMsg() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);  
    router.refresh();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex max-sm:flex-col items-center">
        <Image src={FetchingErrorImage} width={250} alt="Fetching Error" />
        <div className="flex flex-col max-sm:items-center px-4">
          <h3 className="text-3xl mb-2">Opss!!</h3>
          <h5 className="text-xl">Ha ocurrido un error al cargar los datos.</h5>
          <Button
            color="primary"
            className="mt-4 w-max"
            onClick={handleRefresh}
            isLoading={isLoading}
          >
            Volver a intentarlo
          </Button>
        </div>
      </div>
    </div>
  );
}
