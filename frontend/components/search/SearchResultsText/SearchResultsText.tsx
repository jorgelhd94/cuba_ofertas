import React from "react";

type Props = {
  searchText: string;
  loading: boolean;
  pagination: number;
  resultsLength: number;
  total: number;
};

const SearchResultsText = (props: Props) => {
  const initialNumber = props.total ? 1 + 10 * (props.pagination - 1) : 0;
  const finalNumber = 10 * (props.pagination - 1) + props.resultsLength;

  return (
    <div>
      <h3 className="text-xl max-md:text-center">
        {props.searchText && "Resultados de búsqueda para: "}
        <b>{props.searchText ? props.searchText : "Todos los productos"}</b>
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
