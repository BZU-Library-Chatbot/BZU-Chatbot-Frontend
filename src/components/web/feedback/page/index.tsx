import { createIcons, icons } from "lucide";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ColumnDefinitionAlign, VerticalAlign } from "tabulator-tables";
import { fetchTableData } from "./api";
import { ReactTabulator } from "react-tabulator";
import { stringToHTML } from "../../../../helper/helper";

const index = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  interface Column {
    title: string;
    field: string;
    width?: number;
    minWidth?: number;
    resizable?: boolean;
    vertAlign?: VerticalAlign;
    hozAlign?: ColumnDefinitionAlign;
    headerHozAlign?: ColumnDefinitionAlign;
    headerSort?: boolean;
    maxWidth?: number;
    widthGrow?: number;
    formatter?: (
      cell: any,
      formatterParams: any,
      onRendered: any
    ) => HTMLElement;
  }

  const nameFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const name: string = cell.getRow().getData().interactionId.userId.userName;
    console.log("====================================");
    console.log(name);
    console.log("====================================");
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${name}">
                    ${name}
                </div>`;
  };

  const actionFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    // const userId = cell.getRow().getData()._id;
    // const isActive = cell.getRow().getData().status.toLowerCase() == "active";

    let activeElement = "";
    // if (isActive) {
    //   activeElement = `<a id="deactivate" class="flex items-center text-danger mr-3">
    //                     <i data-lucide="user-x" class="w-4 h-4 mr-1"></i>
    //                     ${t("global.deactivate")}
    //                   </a>`;
    // } else {
    //   activeElement = `<a id="activate" class="flex items-center text-primary mr-3">
    //                       <i data-lucide="user-check" class="w-4 h-4 mr-1"></i>
    //                       ${t("global.activate")}
    //                     </a>`;
    // }

    const actionsElement = `<div class="flex lg:justify-center items-center" style="font-size:1rem; margin-right:0.5rem;">${activeElement}</div>`;
    const a = stringToHTML(actionsElement);

    a.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.stopPropagation();
        const target = event.currentTarget as HTMLElement;
        const buttonId = target.id;
        switch (buttonId) {
          case "activate":
            // handleActivateClick(cell.getRow(), userId);
            break;
          case "deactivate":
            // handleDeactivateClick(cell.getRow(), userId);
            break;
          default:
            break;
        }
      });
    });
    return a;
  };

  const ratingFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const rating: number = cell.getRow().getData().rating;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${rating}
                </div>`;
  };

  const feedbackFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const feedback: string = cell.getRow().getData().feedback ? cell.getRow().getData().feedback : "-";
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${feedback}">
                        ${feedback}
                    </div>`;
  };

  const columns: Column[] = [
    {
      title: t("admin.name"),
      field: "interactionId.userId.userName",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 1,
      formatter: nameFormatter,
    },
    {
      title: t("feedback.rating"),
      field: "rating",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: true,
      widthGrow: 1,
      width: 100,
      formatter: ratingFormatter,
    },
    {
      title: t("feedback.feedback"),
      field: "feedback",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 1,
      formatter: feedbackFormatter,
    },
    {
      title: t("global.actions"),
      field: "actions",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 1,
      formatter: actionFormatter,
    },
  ];

  const events = {
    renderComplete: () => {
      createIcons({
        icons,
        attrs: {
          "stroke-width": 1.5,
        },
        nameAttr: "data-lucide",
      });
    },
  };

  const options = {
    pagination: true,
    paginationMode: "remote",
    paginationSize: 10,
    layout: "fitDataFill",
    responsiveLayout: "collapse",
    ajaxURL: "/feedback/",
    ajaxRequestFunc: fetchTableData,
    filterMode: "remote",
  };

  return (
    <div className="d-flex justify-content-center mt-5 flex-wrap flex-column align-items-center">
      <div
        className="d-flex justify-content-between m-1 mb-3 mt-5"
        style={{ width: "597px" }}
      >
        <div className="ms-3">
          {/* <Select
            value={activeFilterValue}
            onChange={onChange}
            options={selectorOptions}
            className="text-center"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "10rem",
                borderColor: "#344c64",
                color: "#344c64",
                fontFamily: "Times New Roman",
              }),
            }}
          /> */}
        </div>
        {/* <button
          className="btn btn-outline-primary w-full me-3"
          style={{
            borderColor: "#344c64",
            color: "#344c64",
            fontFamily: "Times New Roman",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#6a8db2")
          }
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
          onClick={onclick}
        >
          {t("admin.create")}
        </button> */}
      </div>
      <div
        style={{ minWidth: "300px" }}
        className="border-solid border-dark border rounded w-2/5 min-h-96 border-t-0"
      >
        <ReactTabulator
          onRef={(r) => {
            ref.current = r.current;
          }}
          columns={columns}
          events={events}
          options={options}
          style={{ minWidth: "300px" }}
        />
      </div>
    </div>
  );
};

export default index;
