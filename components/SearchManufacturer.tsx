"use client";
import { SearchManuFacturerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import Image from "next/image";
import { manufacturers } from "@/constants";
const SearchManufacturer = ({
  manufacturer,
  setManuFacturer,
}: SearchManuFacturerProps) => {
  const [query, setQuery] = useState("");

  const filterManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManuFacturer}>
        <div className="relative w-full">
          <Combobox.Button className={"absolute top-[14px]"}>
            <Image
              src={"/car-logo.svg"}
              width={20}
              height={20}
              alt="logo"
              className="ml-4"
            />
          </Combobox.Button>
          <Combobox.Input
            className={"search-manufacturer__input"}
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          ></Combobox.Input>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filterManufacturers.map((item) => (
                <Combobox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option  ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {item}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
