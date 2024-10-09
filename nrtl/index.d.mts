import { ReactElement } from 'react';

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
}
interface INRTL {
    tableHead: string[];
    tableBody: string[][];
}
declare function NRTL({ datas, headerBackgroundColor, headerHoverBackgroundColor, textColor, rowColor, rowHoverColor, hoverTextColor, columnSortingColor, columnSortingFullFilledColor, disabledButtonColor, showSearchBar, showItemsPerPageSelector, showPagination, showPreviousNextButtons, enableColumnSorting, itemsPerPageOptions, }: INRTLProps): ReactElement;

export { NRTL };
