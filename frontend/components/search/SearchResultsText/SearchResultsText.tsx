import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  loading: boolean;
  resultsLength: number;
  total: number;
};

const SearchResultsText = (props: Props) => {
  const searchParams = useSearchParams();

  const searchText = searchParams.get("q") || "";
  const pagination = parseInt(searchParams.get("page") || "1") || 1;
  const pageSize = parseInt(searchParams.get("page_size") || "50") || 50;

  const initialNumber = props.total ? 1 + pageSize * (pagination - 1) : 0;
  const finalNumber = pageSize * (pagination - 1) + props.resultsLength;

  return (
    <div>
      <h3 className="text-xl max-md:text-center">
        {searchText && "Resultados de búsqueda para: "}
        <b>{searchText ? searchText : "Todos los productos"}</b>
      </h3>

      {!props.loading && (
        <h5 className="text-sm font-semibold max-md:text-center max-sm:mt-4">
          {`Mostrando ${initialNumber} - ${finalNumber} 
        de ${props.total} resultados`}
        </h5>
      )}
    </div>
  );
};

export default SearchResultsText;
