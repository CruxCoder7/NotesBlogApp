"use client";
import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export default function SearchBar({ setSearch }: { setSearch: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex justify-center w-full mt-5 text-white">
      <Stack className="lg:w-[50%] md:w-[60%] w-full">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search Course" onChange={(e) => setSearch(e.target.value)} />
        </InputGroup>
      </Stack>
    </div>
  );
}
