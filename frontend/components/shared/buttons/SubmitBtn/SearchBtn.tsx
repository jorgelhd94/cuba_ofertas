"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";
import { SearchIcon } from "../../icons/SearchIcon";

type SearchBtnProps = {
  onClick?: React.MouseEventHandler;
  loading?: boolean;
};

export const SearchBtn: React.FC<SearchBtnProps> = ({ onClick, loading }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="secondary"
      type="submit"
      isLoading={pending || loading}
      disabled={pending || loading}
      isIconOnly
    >
      {pending || loading ? "Buscando" : <SearchIcon />}
    </Button>
  );
};
