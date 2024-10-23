// styles
import "../nrtl/nrtl.css";

// types
import { ReactElement, ChangeEvent, CSSProperties } from "react";
interface INRTLProps {
  datas: INRTL;
  headerBackgroundColor?: string;
  headerHoverBackgroundColor?: string;
  textColor?: string;
  rowColor?: string;
  rowHoverColor?: string;
  hoverTextColor?: string;
  disabledButtonColor?: string;
  columnSortingColor?: string;
  columnSortingFullFilledColor?: string;
  showSearchBar?: boolean;
  showItemsPerPageSelector?: boolean;
  showPagination?: boolean;
  showPreviousNextButtons?: boolean;
  enableColumnSorting?: boolean;
  itemsPerPageOptions?: number[];
  language?: "En" | "Fr" | string;
}
interface INRTL {
  tableHead: string[];
  tableBody: string[][];
}

// hooks | library
import React, { useState, useMemo, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

export default function NRTL({
  datas,
  headerBackgroundColor,
  headerHoverBackgroundColor,
  textColor,
  rowColor,
  rowHoverColor,
  hoverTextColor,
  columnSortingColor,
  columnSortingFullFilledColor,
  disabledButtonColor,
  showSearchBar,
  showItemsPerPageSelector,
  showPagination,
  showPreviousNextButtons,
  enableColumnSorting,
  itemsPerPageOptions = [25, 50, 100],
  language = "En",
}: INRTLProps): ReactElement {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    itemsPerPageOptions[0],
  );
  const [sortConfig, setSortConfig] = useState<{
    key: number;
    direction: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const removeAccents: (string: string) => string = (
    string: string,
  ): string => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const sortedData: string[][] | undefined = useMemo(():
    | string[][]
    | undefined => {
    let sortableData: string[][] = [...datas.tableBody];

    if (sortConfig !== null) {
      sortableData = sortableData.sort((a: string[], b: string[]): number => {
        const aValue: string = a[sortConfig.key];
        const bValue: string = b[sortConfig.key];

        if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === "ascending"
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime();
        } else if (!isNaN(Number(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === "ascending"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        } else {
          return sortConfig.direction === "ascending"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
      });
    }

    if (searchTerm.length > 0) {
      return sortableData.filter((row: string[]): boolean => {
        return row.some((cell: string): boolean => {
          return removeAccents(cell.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase()),
          );
        });
      });
    }

    return sortableData.filter((row: string[]): boolean => {
      return row.some((cell: string): boolean => {
        return cell.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [datas.tableBody, sortConfig, searchTerm]);

  const totalPages: number = Math.ceil(sortedData!.length / itemsPerPage);

  const currentData: string[][] = useMemo((): string[][] => {
    if (showPagination) {
      const startIndex: number = (page - 1) * itemsPerPage;
      const endIndex: number = startIndex + itemsPerPage;
      return sortedData!.slice(startIndex, endIndex);
    } else {
      return sortedData!;
    }
  }, [sortedData, page, itemsPerPage]);

  const handlePreviousPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.max(prevPage - 1, 1));
  };

  const handleNextPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.min(prevPage + 1, totalPages));
  };

  const handleItemsPerPageChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void = (event: ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };

  const requestSort: (key: number) => void = (key: number): void => {
    let direction: string = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  useEffect((): void => {
    if (!itemsPerPageOptions.includes(itemsPerPage)) {
      setItemsPerPage(itemsPerPageOptions[0]);
    }
  }, [itemsPerPageOptions, itemsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id={"NRTL"}
      style={
        {
          "--header-bg-color": headerBackgroundColor,
          "--header-hover-bg-color": headerHoverBackgroundColor,
          "--row-color": rowColor,
          "--row-hover-color": rowHoverColor,
          "--text-color": textColor,
          "--hover-text-color": hoverTextColor,
          "--disabled-button-color": disabledButtonColor,
          "--columnSortingColor": columnSortingColor,
          "--columnSortingFullFilledColor": columnSortingFullFilledColor,
        } as CSSProperties
      }
    >
      <>
        <div className={"tableHeader"}>
          {showItemsPerPageSelector && itemsPerPageOptions.length > 0 && (
            <div className="selectContainer">
              <label htmlFor="itemsPerPage">
                {language === "En" ? "Show" : "Afficher"}
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                {itemsPerPageOptions.map(
                  (optionValue: number): ReactElement => (
                    <option key={optionValue} value={optionValue}>
                      {optionValue}
                    </option>
                  ),
                )}
              </select>
              <label htmlFor="itemsPerPage">
                {language === "En" ? "entries" : "entrée"}
              </label>
            </div>
          )}
          {showSearchBar && (
            <div className="searchContainer">
              <label htmlFor="filter">
                {language === "En" ? "Search" : "Rechercher"}:{" "}
              </label>
              <input id="filter" type="text" onChange={handleSearchChange} />
            </div>
          )}
        </div>
        <div className={"tableWrapper"}>
          <table>
            <thead>
              <tr>
                {datas.tableHead.map(
                  (head: string, index: number): ReactElement => (
                    <th
                      key={index}
                      onClick={
                        enableColumnSorting
                          ? (): void => requestSort(index)
                          : undefined
                      }
                      style={{
                        cursor: enableColumnSorting ? "pointer" : "default",
                      }}
                    >
                      {head}
                      {enableColumnSorting && (
                        <div>
                          <span
                            className={`chevron ${
                              sortConfig?.key === index &&
                              sortConfig.direction === "ascending"
                                ? "chevron-active"
                                : ""
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 20 20">
                              <polyline
                                points="5,15 10,5 15,15"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                          <span
                            className={`chevron ${
                              sortConfig?.key === index &&
                              sortConfig.direction === "descending"
                                ? "chevron-active"
                                : ""
                            }`}
                          >
                            <svg width="12" height="12" viewBox="0 0 20 20">
                              <polyline
                                points="5,5 10,15 15,5"
                                strokeWidth="2"
                              />
                            </svg>
                          </span>
                        </div>
                      )}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map(
                  (body: string[], index: number): ReactElement => (
                    <tr key={index}>
                      {body.map(
                        (cell: string, cellIndex: number): ReactElement => (
                          <td key={cellIndex}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={datas.tableHead.length}
                    style={{ textAlign: "center" }}
                  >
                    {language === "En"
                      ? "No data available in table"
                      : "Aucune donnée disponible dans le tableau"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showPagination && (
          <div className="tableFooter">
            {sortedData && (
              <p>
                {language === "En"
                  ? `Showing ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entries`
                  : `Affichage de ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entrées`}
              </p>
            )}
            {showPreviousNextButtons && (
              <div className="buttonContainer">
                {screenSize.width < 768 ? (
                  <>
                    <IoChevronBack
                      className={page === 1 ? "disabled" : "paginationIcn"}
                      onClick={handlePreviousPage}
                    />
                    <IoChevronForward
                      className={
                        page === totalPages ? "disabled" : "paginationIcn"
                      }
                      onClick={handleNextPage}
                    />
                  </>
                ) : (
                  <>
                    <button
                      className="button"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                    >
                      {language === "En" ? "Previous" : "Précédent"}
                    </button>
                    <button
                      className="button"
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                    >
                      {language === "En" ? "Next" : "Suivant"}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </>
    </section>
  );
}
