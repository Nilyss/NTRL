// src/NRTL.tsx
import React, { useState, useMemo, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
function NRTL({
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
  language = "En"
}) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    itemsPerPageOptions[0]
  );
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const removeAccents = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const sortedData = useMemo(() => {
    let sortableData = [...datas.tableBody];
    if (sortConfig !== null) {
      sortableData = sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === "ascending" ? new Date(aValue).getTime() - new Date(bValue).getTime() : new Date(bValue).getTime() - new Date(aValue).getTime();
        } else if (!isNaN(Number(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === "ascending" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
        } else {
          return sortConfig.direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
      });
    }
    if (searchTerm.length > 0) {
      return sortableData.filter((row) => {
        return row.some((cell) => {
          return removeAccents(cell.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase())
          );
        });
      });
    }
    return sortableData.filter((row) => {
      return row.some((cell) => {
        return cell.toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [datas.tableBody, sortConfig, searchTerm]);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentData = useMemo(() => {
    if (showPagination) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return sortedData.slice(startIndex, endIndex);
    } else {
      return sortedData;
    }
  }, [sortedData, page, itemsPerPage]);
  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setPage(1);
  };
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };
  useEffect(() => {
    if (!itemsPerPageOptions.includes(itemsPerPage)) {
      setItemsPerPage(itemsPerPageOptions[0]);
    }
  }, [itemsPerPageOptions, itemsPerPage]);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ React.createElement(
    "section",
    {
      id: "NRTL",
      style: {
        "--header-bg-color": headerBackgroundColor,
        "--header-hover-bg-color": headerHoverBackgroundColor,
        "--row-color": rowColor,
        "--row-hover-color": rowHoverColor,
        "--text-color": textColor,
        "--hover-text-color": hoverTextColor,
        "--disabled-button-color": disabledButtonColor,
        "--columnSortingColor": columnSortingColor,
        "--columnSortingFullFilledColor": columnSortingFullFilledColor
      }
    },
    /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "tableHeader" }, showItemsPerPageSelector && itemsPerPageOptions.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "selectContainer" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "itemsPerPage" }, language === "En" ? "Show" : "Afficher"), /* @__PURE__ */ React.createElement(
      "select",
      {
        id: "itemsPerPage",
        value: itemsPerPage,
        onChange: handleItemsPerPageChange
      },
      itemsPerPageOptions.map(
        (optionValue) => /* @__PURE__ */ React.createElement("option", { key: optionValue, value: optionValue }, optionValue)
      )
    ), /* @__PURE__ */ React.createElement("label", { htmlFor: "itemsPerPage" }, language === "En" ? "entries" : "entr\xE9e")), showSearchBar && /* @__PURE__ */ React.createElement("div", { className: "searchContainer" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "filter" }, language === "En" ? "Search" : "Rechercher", ":", " "), /* @__PURE__ */ React.createElement("input", { id: "filter", type: "text", onChange: handleSearchChange }))), /* @__PURE__ */ React.createElement("div", { className: "tableWrapper" }, /* @__PURE__ */ React.createElement("table", null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, datas.tableHead.map(
      (head, index) => /* @__PURE__ */ React.createElement(
        "th",
        {
          key: index,
          onClick: enableColumnSorting ? () => requestSort(index) : void 0,
          style: {
            cursor: enableColumnSorting ? "pointer" : "default"
          }
        },
        head,
        enableColumnSorting && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
          "span",
          {
            className: `chevron ${(sortConfig == null ? void 0 : sortConfig.key) === index && sortConfig.direction === "ascending" ? "chevron-active" : ""}`
          },
          /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 20 20" }, /* @__PURE__ */ React.createElement(
            "polyline",
            {
              points: "5,15 10,5 15,15",
              strokeWidth: "2"
            }
          ))
        ), /* @__PURE__ */ React.createElement(
          "span",
          {
            className: `chevron ${(sortConfig == null ? void 0 : sortConfig.key) === index && sortConfig.direction === "descending" ? "chevron-active" : ""}`
          },
          /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 20 20" }, /* @__PURE__ */ React.createElement(
            "polyline",
            {
              points: "5,5 10,15 15,5",
              strokeWidth: "2"
            }
          ))
        ))
      )
    ))), /* @__PURE__ */ React.createElement("tbody", null, currentData.length > 0 ? currentData.map(
      (body, index) => /* @__PURE__ */ React.createElement("tr", { key: index }, body.map(
        (cell, cellIndex) => /* @__PURE__ */ React.createElement("td", { key: cellIndex }, cell)
      ))
    ) : /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(
      "td",
      {
        colSpan: datas.tableHead.length,
        style: { textAlign: "center" }
      },
      language === "En" ? "No data available in table" : "Aucune donn\xE9e disponible dans le tableau"
    ))))), showPagination && /* @__PURE__ */ React.createElement("div", { className: "tableFooter" }, sortedData && /* @__PURE__ */ React.createElement("p", null, language === "En" ? `Showing ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entries` : `Affichage de ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entr\xE9es`), showPreviousNextButtons && /* @__PURE__ */ React.createElement("div", { className: "buttonContainer" }, screenSize.width < 768 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      IoChevronBack,
      {
        className: page === 1 ? "disabled" : "paginationIcn",
        onClick: handlePreviousPage
      }
    ), /* @__PURE__ */ React.createElement(
      IoChevronForward,
      {
        className: page === totalPages ? "disabled" : "paginationIcn",
        onClick: handleNextPage
      }
    )) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "button",
        onClick: handlePreviousPage,
        disabled: page === 1
      },
      language === "En" ? "Previous" : "Pr\xE9c\xE9dent"
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "button",
        onClick: handleNextPage,
        disabled: page === totalPages
      },
      language === "En" ? "Next" : "Suivant"
    )))))
  );
}
export {
  NRTL
};
