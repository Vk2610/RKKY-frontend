import { useState } from "react";

export default function SearchDropDown({
  itemKey,
  label,
  icon,
  placeholder,
  setValue,
  items,
}) {
  console.log("SearchDropDown called");
  const [regionSearch, setRegionSearch] = useState("");
  const [isOpen, setOpen] = useState(false);

  const filteredRegions = items.filter((item) =>
    item.toLowerCase().includes(regionSearch.toLowerCase())
  );

  const handleSearch = (event) => {
    console.log("handle Search called");
    setOpen(true);
    setRegionSearch(event.target.value);
  };

  const handleSelect = (value) => {
    console.log(`item clicked: ${value} for key: ${itemKey}`);
    setOpen(false);
    setRegionSearch(value);
    setValue(itemKey, value);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <label className="text-gray-700 text-sm font-bold">{label}</label>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={regionSearch}
          onChange={(event) => handleSearch(event)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isOpen ? (
          <div className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredRegions.map((value) => (
              <div
                key={value}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => handleSelect(value)}
              >
                {value}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
