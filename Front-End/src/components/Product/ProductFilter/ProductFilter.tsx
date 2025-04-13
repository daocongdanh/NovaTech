import { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router";
import { IoIosCloseCircle } from "react-icons/io";
import { getAttributesByCategory } from "@/services/product.service";
import { AttributeResponse } from "@/types/response.type";

type Filter = {
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
        (item) => item.filterSlug !== updated.filterSlug
      );
      updated = {
        ...updated,
        value: newValue,
        valueSlug: newValueSlug,
      };
      return [...newState, updated];
    });
  };

  const handleDeleteOneFilter = (filterSlug: string) => {
    setFilterValues((prev) =>
      prev.filter((item) => item.filterSlug !== filterSlug)
    );
  };

  const handleClearFilter = () => setFilterValues([]);

  const isActive = (filterSlug: string) => {
    return filterValues.some((item) => item.filterSlug === filterSlug);
  };

  const handleAddFilter = (filter: Filter) => {
    const index = filterValues.findIndex(
      (item) => item.filterSlug === filter.filterSlug
    );
    if (index !== -1) {
      const existing = filterValues[index];
      if (existing.value === filter.value)
        handleDeleteOneFilter(filter.filterSlug);
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
                key={filter.slug}
                title={
                  <div className="flex flex-wrap gap-2 w-[250px]">
                    {!!filter.values.length &&
                      filter.values.map((item) => (
                        <Button
                          className="capitalize"
                          onClick={() =>
                            handleAddFilter({
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
                  danger={isActive(filter.slug)}
                  onClick={() => handleDeleteOneFilter(filter.slug)}
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
                  onClick={() => handleDeleteOneFilter(filter.filterSlug)}
                  key={`${filter.filterSlug}:${filter.value}`}
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
