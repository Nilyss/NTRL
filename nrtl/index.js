var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  NRTL: () => NRTL
});
module.exports = __toCommonJS(src_exports);

// src/NRTL.tsx
var import_react = __toESM(require("react"));
var import_io5 = require("react-icons/io5");
var import_io52 = require("react-icons/io5");
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
  const [page, setPage] = (0, import_react.useState)(1);
  const [itemsPerPage, setItemsPerPage] = (0, import_react.useState)(
    itemsPerPageOptions[0]
  );
  const [sortConfig, setSortConfig] = (0, import_react.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
  const [screenSize, setScreenSize] = (0, import_react.useState)({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const removeAccents = (string) => {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const sortedData = (0, import_react.useMemo)(() => {
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
  const currentData = (0, import_react.useMemo)(() => {
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
  (0, import_react.useEffect)(() => {
    if (!itemsPerPageOptions.includes(itemsPerPage)) {
      setItemsPerPage(itemsPerPageOptions[0]);
    }
  }, [itemsPerPageOptions, itemsPerPage]);
  (0, import_react.useEffect)(() => {
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
  return /* @__PURE__ */ import_react.default.createElement(
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
    /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "tableHeader" }, showItemsPerPageSelector && itemsPerPageOptions.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "selectContainer" }, /* @__PURE__ */ import_react.default.createElement("label", { htmlFor: "itemsPerPage" }, language === "En" ? "Show" : "Afficher"), /* @__PURE__ */ import_react.default.createElement(
      "select",
      {
        id: "itemsPerPage",
        value: itemsPerPage,
        onChange: handleItemsPerPageChange
      },
      itemsPerPageOptions.map(
        (optionValue) => /* @__PURE__ */ import_react.default.createElement("option", { key: optionValue, value: optionValue }, optionValue)
      )
    ), /* @__PURE__ */ import_react.default.createElement("label", { htmlFor: "itemsPerPage" }, language === "En" ? "entries" : "entr\xE9e")), showSearchBar && /* @__PURE__ */ import_react.default.createElement("div", { className: "searchContainer" }, /* @__PURE__ */ import_react.default.createElement("label", { htmlFor: "filter" }, language === "En" ? "Search" : "Rechercher", ":", " "), /* @__PURE__ */ import_react.default.createElement("input", { id: "filter", type: "text", onChange: handleSearchChange }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "tableWrapper" }, /* @__PURE__ */ import_react.default.createElement("table", null, /* @__PURE__ */ import_react.default.createElement("thead", null, /* @__PURE__ */ import_react.default.createElement("tr", null, datas.tableHead.map(
      (head, index) => /* @__PURE__ */ import_react.default.createElement(
        "th",
        {
          key: index,
          onClick: enableColumnSorting ? () => requestSort(index) : void 0,
          style: {
            cursor: enableColumnSorting ? "pointer" : "default"
          }
        },
        head,
        enableColumnSorting && /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(
          "span",
          {
            className: `chevron ${(sortConfig == null ? void 0 : sortConfig.key) === index && sortConfig.direction === "ascending" ? "chevron-active" : ""}`
          },
          /* @__PURE__ */ import_react.default.createElement("svg", { width: "12", height: "12", viewBox: "0 0 20 20" }, /* @__PURE__ */ import_react.default.createElement(
            "polyline",
            {
              points: "5,15 10,5 15,15",
              strokeWidth: "2"
            }
          ))
        ), /* @__PURE__ */ import_react.default.createElement(
          "span",
          {
            className: `chevron ${(sortConfig == null ? void 0 : sortConfig.key) === index && sortConfig.direction === "descending" ? "chevron-active" : ""}`
          },
          /* @__PURE__ */ import_react.default.createElement("svg", { width: "12", height: "12", viewBox: "0 0 20 20" }, /* @__PURE__ */ import_react.default.createElement(
            "polyline",
            {
              points: "5,5 10,15 15,5",
              strokeWidth: "2"
            }
          ))
        ))
      )
    ))), /* @__PURE__ */ import_react.default.createElement("tbody", null, currentData.length > 0 ? currentData.map(
      (body, index) => /* @__PURE__ */ import_react.default.createElement("tr", { key: index }, body.map(
        (cell, cellIndex) => /* @__PURE__ */ import_react.default.createElement("td", { key: cellIndex }, cell)
      ))
    ) : /* @__PURE__ */ import_react.default.createElement("tr", null, /* @__PURE__ */ import_react.default.createElement(
      "td",
      {
        colSpan: datas.tableHead.length,
        style: { textAlign: "center" }
      },
      language === "En" ? "No data available in table" : "Aucune donn\xE9e disponible dans le tableau"
    ))))), showPagination && /* @__PURE__ */ import_react.default.createElement("div", { className: "tableFooter" }, sortedData && /* @__PURE__ */ import_react.default.createElement("p", null, language === "En" ? `Showing ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entries` : `Affichage de ${Math.min(page * itemsPerPage, sortedData.length)}/${sortedData.length} entr\xE9es`), showPreviousNextButtons && /* @__PURE__ */ import_react.default.createElement("div", { className: "buttonContainer" }, screenSize.width < 768 ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      import_io5.IoChevronBack,
      {
        className: page === 1 ? "disabled" : "paginationIcn",
        onClick: handlePreviousPage
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      import_io52.IoChevronForward,
      {
        className: page === totalPages ? "disabled" : "paginationIcn",
        onClick: handleNextPage
      }
    )) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        className: "button",
        onClick: handlePreviousPage,
        disabled: page === 1
      },
      language === "En" ? "Previous" : "Pr\xE9c\xE9dent"
    ), /* @__PURE__ */ import_react.default.createElement(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NRTL
});
