# Nillys React Table Library (NRTL)

**Nillys React Table Library (NRTL)** is a customizable and easy-to-use React component for displaying data tables with features like sorting, pagination, and search. This library allows you to customize the table's styles and behavior to suit your needs.

![demo](https://imgur.com/rOQtnXr)

## Installation

To install this package, use npm:

```bash
npm install nillys-react-table-library
```

## Usage

Here is a basic example of how to use the `NRTL` component in your React project:

```tsx
import React from 'react'
import { NRTL } from 'nillys-react-table-library'
import "nillys-react-table-library/style";

const App = () => {
  const datas = {
    tableHead: ['Name', 'Age', 'Profession'],
    tableBody: [
      ['Alice', '30', 'Engineer'],
      ['Bob', '25', 'Designer'],
      ['Charlie', '35', 'Manager'],
    ],
  }

  return (
    <div>
      <h1>Customizable Table</h1>
      <NRTL
        datas={datas}
        headerBackgroundColor="lightblue"
        rowHoverColor="lightgray"
        showPagination={true}
        enableColumnSorting={true}
      />
    </div>
  )
}

export default App
```

### Props

The `NRTL` component comes with a wide range of customization options. Below is a list of available props with their default values.

| Prop                           | Type               | Description                                                                                | Default                                      |
|--------------------------------|--------------------|--------------------------------------------------------------------------------------------|----------------------------------------------|
| `datas`                        | `INRTL`            | The data for the table, containing `tableHead` (column titles) and `tableBody` (row data). | *Required*                                   |
| `headerBackgroundColor`        | `string`           | Background color of the table header.                                                      | `linear-gradient(to left, #d5e065, #a8c24e)` |
| `headerHoverBackgroundColor`   | `string`           | Background color of the table header on hover.                                             | `#a8c24e`                                    |
| `textColor`                    | `string`           | Color of the text inside the table.                                                        | `#36395a`                                    |
| `rowColor`                     | `string`           | Background color of the table rows.                                                        | `#ffffff`                                    |
| `rowHoverColor`                | `string`           | Background color of the rows when hovered.                                                 | `#36395a`                                    |
| `hoverTextColor`               | `string`           | Text color in the rows when hovered.                                                       | `#ffffff`                                    |
| `disabledButtonColor`          | `string`           | Color of disabled buttons (pagination buttons, etc.).                                      | `#dcdcdc`                                    |
| `columnSortingColor`           | `string`           | Color of the sorting indicator chevron.                                                    | `#dcdcdc`                                    |
| `columnSortingFullFilledColor` | `string`           | Color of the chevron when a column is sorted.                                              | `#36395a`                                    |
| `showSearchBar`                | `boolean`          | Displays or hides the search bar above the table.                                          | `false`                                      |
| `showItemsPerPageSelector`     | `boolean`          | Displays or hides the items-per-page selector.                                             | `false`                                      |
| `showPagination`               | `boolean`          | Displays or hides pagination controls.                                                     | `false`                                      |
| `showPreviousNextButtons`      | `boolean`          | Displays or hides the previous/next buttons in pagination.                                 | `false`                                      |
| `enableColumnSorting`          | `boolean`          | Enables or disables sorting by column.                                                     | `false`                                      |
| `itemsPerPageOptions`          | `number[]`         | Array of options for the number of items per page.                                         | `[25, 50, 100]`                              |
| `language`                     | `En` `Fr` `string` | Language of table elements.                                                                | `En`                                         |


### Data Structure (`INRTL`)

The `datas` prop expects an object of type `INRTL`, which contains the table header and body data.

```typescript
interface INRTL {
  tableHead: string[] // The column headers
  tableBody: string[][] // The table rows as arrays of strings
}
```

Example:

```json
{
  "tableHead": ["Name", "Age", "Profession"],
  "tableBody": [
    ["Alice", "30", "Engineer"],
    ["Bob", "25", "Designer"],
    ["Charlie", "35", "Manager"]
  ]
}
```

### Advanced Example

Here's an example that showcases more customization options:

```tsx
import React from 'react'
import { NRTL } from 'nillys-react-table-library'
import "nillys-react-table-library/style";

const App = () => {
  const datas = {
    tableHead: ['Name', 'Age', 'Profession'],
    tableBody: [
      ['Alice', '30', 'Engineer'],
      ['Bob', '25', 'Designer'],
      ['Charlie', '35', 'Manager'],
    ],
  }

  return (
    <div>
      <h1>Advanced Table Customization</h1>
      <NRTL
        datas={datas}
        headerBackgroundColor="lightblue"
        headerHoverBackgroundColor="darkblue"
        textColor="black"
        rowColor="white"
        rowHoverColor="lightgray"
        columnSortingColor="gray"
        columnSortingFullFilledColor="blue"
        showSearchBar={true}
        showPagination={true}
        enableColumnSorting={true}
        itemsPerPageOptions={[5, 10, 25]}
        language={'Fr'}
      />
    </div>
  )
}

export default App
```

## License

This project is licensed under the **NRTL-NonCommercial** license. You are free to use, modify, and distribute this project for internal, non-commercial purposes. Please read the [LICENSE.md](./LICENSE.md) file for more details.
