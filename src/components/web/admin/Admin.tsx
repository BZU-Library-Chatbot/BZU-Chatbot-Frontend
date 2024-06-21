import React, { useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { ColumnDefinitionAlign, VerticalAlign } from "tabulator-tables";
import userImageIcon from "../../../assets/Images/user-icon.svg";
import { useTranslation } from "react-i18next";
import { stringToHTML } from "../../../helper/helper";
import { activateUser, deactivateUser, fetchTableData } from "./api";
import { Bounce, toast } from "react-toastify";
import { createIcons, icons } from "lucide";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const { t } = useTranslation();
  const [activeFilterValue, setActiveFilterValue] = useState(t("global.any"));

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

  const imageFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const imageUrl: string = cell.getValue();
    var fullUrl = imageUrl;
    if (!imageUrl) {
      const image = cell.getRow().getData()?.profilePic?.secure_url;
      fullUrl = image ? image : userImageIcon;
    }
    return `<div class="image-fit zoom-in h-8">
                    <img src= ${fullUrl}
                        class="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                        alt="User image" style="height: 32px; margin: 0 0.5rem;">
                    </img>
                </div>`;
  };

  const emailFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const email: string = cell.getRow().getData().email;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; direction:ltr" title="${email}">
                    ${email}
                </div>`;
  };

  const nameFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const name: string = cell.getRow().getData().userName;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${name}">
                    ${name}
                </div>`;
  };

  const statusFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const active: boolean =
      cell.getRow().getData().status.toLowerCase() == "active";
    return `<div class="flex items-center lg:justify-center ${
      active ? "text-success" : "text-danger"
    }" style="font-size:1rem;">
              <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> ${
                active ? t("global.active") : t("global.inactive")
              }
            </div>`;
  };

  const actionFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const userId = cell.getRow().getData()._id;
    const isActive = cell.getRow().getData().status.toLowerCase() == "active";

    let activeElement;
    if (isActive) {
      activeElement = `<a id="deactivate" class="flex items-center text-danger mr-3">
                        <i data-lucide="user-x" class="w-4 h-4 mr-1"></i>
                        ${t("global.deactivate")}
                      </a>`;
    } else {
      activeElement = `<a id="activate" class="flex items-center text-primary mr-3">
                          <i data-lucide="user-check" class="w-4 h-4 mr-1"></i> 
                          ${t("global.activate")}
                        </a>`;
    }

    const actionsElement = `<div class="flex lg:justify-center items-center" style="font-size:1rem;">${activeElement}</div>`;
    const a = stringToHTML(actionsElement);

    a.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.stopPropagation();
        const target = event.currentTarget as HTMLElement;
        const buttonId = target.id;
        switch (buttonId) {
          case "activate":
            handleActivateClick(cell.getRow(), userId);
            break;
          case "deactivate":
            handleDeactivateClick(cell.getRow(), userId);
            break;
          default:
            break;
        }
      });
    });
    return a;
  };

  const handleActivateClick = async (row: any, id: any) => {
    const response: any = await activateUser(id);
    if (response.status < 300) {
      toast.success(`${t("admin.activateSuccess")}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      ref.current.replaceData(ref.current.getAjaxUrl(), {
        filter: ref.current.getFilters(),
        page: ref.current.getPage(),
      });
    } else {
      toast.error(`${t("admin.activateFail")}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDeactivateClick = async (row: any, id: any) => {
    const response: any = await deactivateUser(id);
    if (response.status < 300) {
      toast.success(`${t("admin.deactivateSuccess")}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      ref.current.replaceData(ref.current.getAjaxUrl(), {
        filter: ref.current.getFilters(),
        page: ref.current.getPage(),
      });
    } else {
      toast.error(`${t("admin.deactivateFail")}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const columns: Column[] = [
    {
      title: "",
      field: "profilePicture",
      hozAlign: "center",
      width: 50,
      resizable: false,
      headerSort: false,
      formatter: imageFormatter,
    },
    {
      title: t("admin.email"),
      field: "email",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 2,
      formatter: emailFormatter,
    },
    {
      title: t("admin.name"),
      field: "userName",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 1,
      formatter: nameFormatter,
    },
    {
      title: t("global.status"),
      field: "status",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: false,
      widthGrow: 1,
      formatter: statusFormatter,
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
    ajaxURL: "/auth/admin",
    ajaxRequestFunc: fetchTableData,
    filterMode: "remote",
  };

  const selectorOptions: any = [
    { value: "any", label: t("global.any") },
    { value: "Active", label: t("global.active") },
    { value: "Not Active", label: t("global.inactive") },
  ];

  const onclick = () => {
    navigate("/admin/create");
  };

  const onChange = (selectedOption: any) => {
    setActiveFilterValue(selectedOption);
    ref.current.setFilter("active", "=", selectedOption.value);
  };

  return (
    <div className="d-flex justify-content-center mt-5 flex-wrap flex-column align-items-center">
        <div className="d-flex justify-content-between m-1 mb-3 mt-5" style={{width:"597px"}}>
          <div className="ms-3">
            <Select
              value={activeFilterValue}
              onChange={onChange}
              options={selectorOptions}
              className="text-center"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: "12rem",
                }),
              }}
            />
          </div>
          <button
            className="btn btn-outline-primary w-full me-3"
            onClick={onclick}
          >
            {t("admin.create")}
          </button>
        </div>
      <div style={{minWidth:"597px"}} className="border-solid border-dark border rounded w-2/5 min-h-96 border-t-0">
        <ReactTabulator
          onRef={(r) => {
            ref.current = r.current;
          }}
          columns={columns}
          events={events}
          options={options}
          style={{ minWidth: "400px" }}
        />
      </div>
    </div>
  );
};

export default Admin;
