"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Store } from "@prisma/client";
import CreateDialog from "@/app/ui/create-dialog";
import { useParams, usePathname, useRouter } from "next/navigation";
import path from "path";

export default function StoresCombo({ stores }: { stores: Store[] }) {
  const { storeid } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedStore = stores.find((store) => store.id === storeid);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    selectedStore?.name.toLocaleLowerCase()
  );

  const currentStore =
    stores.find((store) => store.name.toLowerCase() === value) || selectedStore;

  const newPathName = `/${currentStore?.id}/${pathname
    .split("/")
    .slice(2)
    .join("/")}`;
  const selectedValue = currentStore?.name.toLocaleLowerCase();
  const storesCombo = stores.map((store) => {
    return {
      value: store.name.toLocaleLowerCase(),
      label: store.name.split(" ").join("-"),
      id: store.id,
    };
  });

  const selectHandler = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue);
    // alert("pushed to route");
    setOpen(false);
  };
  if (pathname.split("/")[1] !== currentStore?.id) {
    router.push(newPathName);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedValue
            ? storesCombo.find((framework) => framework.value === selectedValue)
                ?.label
            : "select store ..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="py-3">
          <CommandInput placeholder="search store ... " />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {storesCombo.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={selectHandler}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CreateDialog text="create store" isDone={true} />
          </CommandGroup>
        </Command>

        {/* <div className="py-1"></div> */}
      </PopoverContent>
    </Popover>
  );
}
