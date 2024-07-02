import { getApiUrl } from "@/lib/utils/api/api";
import { fetcher } from "@/lib/utils/api/fetcher";
import { Chip } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaX } from "react-icons/fa6";
import useSWR from "swr";

type Props = {
  categoryId: number | string;
};

const CategoryActiveChip = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data, isLoading, error } = useSWR(
    getApiUrl("/categories/" + props.categoryId + "/details"),
    fetcher
  );

  const handleClick = () => {
    const urlParams = new URLSearchParams(searchParams);
    urlParams.delete("category");

    router.push(pathname + "?" + urlParams.toString());
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <Chip
      color="primary"
      onClick={handleClick}
      endContent={
        <div className="p-1 bg-default-50 text-default-800 mx-1 rounded-full cursor-pointer hover:bg-default-200">
          <FaX size={8} />
        </div>
      }
    >
      {data.name}
    </Chip>
  );
};

export default CategoryActiveChip;
