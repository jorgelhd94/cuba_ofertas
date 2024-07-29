import { getQueryString } from "@/lib/utils/functions/getQueryString";
import { Pagination } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type Props = {
  totalProducts: number;
  loading: boolean;
};

const SearchPagination = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("page_size") || "50")
  );

  const handlePagination = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== currentPage) {
        const newQueryString = getQueryString(searchParams.toString(), {
          name: "page",
          value: pageNumber.toString(),
        });
        router.push(`${pathname}?${newQueryString}`);
      }
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    handlePagination(currentPage);
  }, [currentPage, handlePagination]);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
    setPageSize(parseInt(searchParams.get("page_size") || "50"));
  }, [searchParams]);

  return (
    <Pagination
      onChange={setCurrentPage}
      color="secondary"
      total={Math.ceil(props.totalProducts / pageSize)}
      page={currentPage}
      isCompact
      isDisabled={props.loading}
    />
  );
};

export default SearchPagination;
