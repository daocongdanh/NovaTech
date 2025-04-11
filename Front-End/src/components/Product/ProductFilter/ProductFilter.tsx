import { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router";
import { IoIosCloseCircle } from "react-icons/io";
import { getAttributesByCategory } from "@/services/product.service";
import { AttributeResponse } from "@/types/response.type";

type Filter = {
  filterName: string;
  filterSlug: string;
  filterLabel: string;
  value: string;
  valueSlug: string;
};

export default function ProductFilter({
  brand,
  category,
}: {
  category: string;
  brand?: string;
}) {
  const [attributes, setAttributes] = useState<AttributeResponse[]>([]);
  const [filterValues, setFilterValues] = useState<Filter[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAttributesByCategory(category, brand);
      setAttributes(res);
    };
    fetchApi();
    handleClearFilter();
  }, [category, brand]);

  const onAdd = (filter: Filter) => {
    setFilterValues((prev) => [...prev, filter]);
  };

  const handleChangeValue = (
    index: number,
    newValue: string,
    newValueSlug: string
  ) => {
    setFilterValues((prev) => {
      let updated = prev[index];
      let newState = prev.filter(
        (item) => item.filterName !== updated.filterName
      );
      updated = {
        ...updated,
        value: newValue,
        valueSlug: newValueSlug,
      };
      return [...newState, updated];
    });
  };

  const handleDeleteOneFilter = (filterName: string) => {
    setFilterValues((prev) =>
      prev.filter((item) => item.filterName !== filterName)
    );
  };

  const handleClearFilter = () => setFilterValues([]);

  const isActive = (filterName: string) => {
    return filterValues.some((item) => item.filterName === filterName);
  };

  const handleAddFilter = (filter: Filter) => {
    const index = filterValues.findIndex(
      (item) => item.filterName === filter.filterName
    );
    if (index !== -1) {
      const existing = filterValues[index];
      if (existing.value === filter.value)
        handleDeleteOneFilter(filter.filterName);
      else handleChangeValue(index, filter.value, filter.valueSlug);
    } else {
      onAdd(filter);
    }
  };

  // Update query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = filterValues
      .map((item) => `${item.filterSlug}:${item.valueSlug}`)
      .join(",");

    if (query) params.set("filters", query);
    else params.delete("filters");

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [filterValues]);

  return (
    <>
      <h2 className="text-lg font-bold">Chọn theo tiêu chí</h2>
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex gap-3">
          {!!attributes.length &&
            attributes.map((filter) => (
              <Tooltip
                key={filter.name}
                title={
                  <div className="flex flex-wrap gap-2 w-[250px]">
                    {!!filter.values.length &&
                      filter.values.map((item) => (
                        <Button
                          className="capitalize"
                          onClick={() =>
                            handleAddFilter({
                              filterName: filter.name,
                              filterSlug: filter.slug,
                              filterLabel: filter.label,
                              value: item.value,
                              valueSlug: item.slug,
                            })
                          }
                          key={item.slug}
                        >
                          {item.value}
                        </Button>
                      ))}
                  </div>
                }
                placement="bottom"
                color="#fff"
              >
                <Button
                  className="capitalize"
                  danger={isActive(filter.name)}
                  onClick={() => handleDeleteOneFilter(filter.name)}
                >
                  {filter.label}
                </Button>
              </Tooltip>
            ))}
        </div>
      </div>

      {!!filterValues.length && (
        <>
          <h2 className="text-lg font-bold">Đang lọc theo</h2>
          <div className="w-full overflow-auto no-scrollbar">
            <div className="flex gap-3">
              {filterValues.map((filter) => (
                <Button
                  className="capitalize"
                  danger
                  icon={<IoIosCloseCircle />}
                  onClick={() => handleDeleteOneFilter(filter.filterName)}
                  key={`${filter.filterName}:${filter.value}`}
                >{`${filter.filterLabel}: ${filter.value}`}</Button>
              ))}
              <Button danger onClick={handleClearFilter}>
                Bỏ chọn tất cả
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
