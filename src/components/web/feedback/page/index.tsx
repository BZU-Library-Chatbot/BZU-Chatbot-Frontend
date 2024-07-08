import { createIcons, icons } from "lucide";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ColumnDefinitionAlign, VerticalAlign } from "tabulator-tables";
import { deleteFeedback, fetchTableData, getFeedbackById } from "./api";
import { ReactTabulator } from "react-tabulator";
import { stringToHTML } from "../../../../helper/helper";
import { toast, Bounce } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const index = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  const [feedbackDetails, setFeedbackDetails] = useState({
    userName: "-",
    message: "-",
    response: "-",
    feedbackText: "-",
    rating: "-",
  });

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
    const email: string = cell.getRow().getData().interactionId.userId.email;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width:6rem" title="${email}">
                    ${name}
                </div>`;
  };

  const actionFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const id = cell.getRow().getData().id;
    const a = stringToHTML(`<div class="flex lg:justify-center items-center">
                              <a id="view" class="flex items-center text-primary btn">
                                <i class="fa-solid fa-binoculars"></i>
                                ${t("feedback.view")}
                              </a>
                              <a id="delete" class="flex items-center text-danger btn">
                                <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i>
                                ${t("global.delete")}
                              </a>
                          </div>`);
    a.addEventListener("click", function (event) {
      event.stopPropagation();
      const target = event.target as HTMLElement;
      const buttonId = target.id;
      switch (buttonId) {
        case "view":
          handleViewClick(event, cell.getRow());
          break;
        case "delete":
          handleDeleteClick(cell.getRow(), id);
          break;
        default:
          break;
      }
    });
    return a;
  };

  const handleViewClick = async (event: any, row: any) => {
    const id = row.getData().id;
    const feedback = await getFeedbackById(id);
    const userName = feedback.feedback.interactionId?.userId?.userName || "-";
    const message = feedback.feedback.interactionId?.message || "-";
    const response = feedback.feedback.interactionId?.response || "-";
    const feedbackText = feedback.feedback.text || "-";
    const rating = feedback.feedback.rating || "-";

    setFeedbackDetails({
      userName,
      message,
      response,
      feedbackText,
      rating,
    });

    setModalShow(true);
  };

  const handleDeleteClick = async (row: any, id: number) => {
    const confirmDelete = window.confirm(t("admin.deleteConfirm"));
    if (confirmDelete) {
      await deleteFeedback(id);
      row.getTable().deleteRow(row.getData().id);
      toast.success(t("feedback.deleted"), {
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
    } else {
      toast.error(t("feedback.deleteFailed"), {
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

  const ratingFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const rating: number = cell.getRow().getData().rating;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width:5rem; min-width:75px">
                    ${rating}
                </div>`;
  };

  const feedbackFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const feedback: string = cell.getRow().getData().feedback
      ? cell.getRow().getData().feedback
      : "-";
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width:8rem;" title="${feedback}">
                        ${feedback}
                    </div>`;
  };

  const dateFormatter = (
    cell: any,
    formatterParams: any,
    onRendered: any
  ): HTMLElement | any => {
    const date: string = cell.getRow().getData().createdAt;
    const parsedDate = new Date(date);
    const day = String(parsedDate.getUTCDate()).padStart(2, "0");
    const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = parsedDate.getUTCFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return `<div style="font-size:1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width:6.5rem;">
                    ${formattedDate}
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
      maxWidth: 150,
      formatter: feedbackFormatter,
    },
    {
      title: t("feedback.createdAt"),
      field: "createdAt",
      hozAlign: "center",
      vertAlign: "middle",
      headerHozAlign: "center",
      headerSort: true,
      minWidth: 110,
      widthGrow: 1,
      formatter: dateFormatter,
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
    rowClick: handleViewClick,
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
    sortMode: "remote",
    initialSort: [{ createdAt: "desc" }],
  };

  return (
    <div className="d-flex justify-content-center mt-5 flex-wrap flex-column align-items-center w-full">
      <div
        className="d-flex justify-content-center flex-column align-items-center"
        style={{ maxWidth: "95%", minWidth: "300px" }}
      >
        <div
          style={{ minWidth: "300px", width: "100%" }}
          className="border-solid border-dark border rounded w-2/5 min-h-96 border-t-0"
        >
          <ReactTabulator
            onRef={(r) => {
              ref.current = r.current;
            }}
            columns={columns}
            events={events}
            options={options}
            style={{ minWidth: "300px", width: "100%" }}
          />
        </div>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header>
          <Modal.Title>{t("feedback.feedbackDetails")}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
          <p>
            <strong>{t("feedback.username")}: </strong>
            {feedbackDetails.userName}
          </p>
          <p>
            <strong>{t("feedback.message")}: </strong>
            {feedbackDetails.message}
          </p>
          <p>
            <strong>{t("feedback.response")}: </strong>
            {feedbackDetails.response}
          </p>
          <p>
            <strong>{t("feedback.feedback")}: </strong>
            {feedbackDetails.feedbackText}
          </p>
          <p>
            <strong>{t("feedback.rating")}: </strong>
            {feedbackDetails.rating}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#344c64" }}
            variant="secondary"
            onClick={() => setModalShow(false)}
          >
            {t("global.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default index;
