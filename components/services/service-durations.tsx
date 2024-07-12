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
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Framework {
  value: string;
  label: string;
}

interface ComboboxDemoProps {
  frameworks: Framework[];
  mode?: "single" | "multi";
  onChange: (value: string | string[]) => void;
}

export const ComboboxDemo: React.FC<ComboboxDemoProps> = ({ frameworks, mode = "single", onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | string[]>(mode === "multi" ? [] : "");

  const handleSelect = (selectedValue: string) => {
    if (mode === "single") {
      const newValue = selectedValue === value ? "" : selectedValue;
      setValue(newValue);
      onChange(newValue);
    } else if (mode === "multi") {
      let newValue: string[] = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(selectedValue)) {
        newValue = newValue.filter((v) => v !== selectedValue);
      } else {
        newValue.push(selectedValue);
      }
      setValue(newValue);
      onChange(newValue);
    }
    setOpen(false);
  };

  const displayValue = () => {
    if (mode === "single") {
      return typeof value === "string" && value
        ? frameworks.find((framework) => framework.value === value)?.label
        : "Select framework...";
    } else if (mode === "multi") {
      return Array.isArray(value) && value.length > 0
        ? value.map((v) => frameworks.find((framework) => framework.value === v)?.label).join(", ")
        : "Select frameworks...";
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {displayValue()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
  <CommandList>
    {frameworks.map((framework) => (
      <CommandItem
        key={framework.value}
        value={framework.value}
        onSelect={() => handleSelect(framework.value)}

      
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
  </CommandList>

        </Command>
      </PopoverContent>
    </Popover>
  );
};
