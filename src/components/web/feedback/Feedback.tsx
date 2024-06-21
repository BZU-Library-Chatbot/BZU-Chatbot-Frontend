import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "./Feedback.module.scss";
import { useTranslation } from "react-i18next";
import { sendFeedback } from "./api";

interface FeedbackProps {
  show: boolean;
  handleClose: () => void;
  rating: number;
  interactionId?: number;
}
function Feedback({ show, handleClose, rating, interactionId }: FeedbackProps) {
  const { t } = useTranslation();
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = async () => {
    if (feedbackText.trim() !== "") {
      const response = await sendFeedback(
        { rating, text: feedbackText },
        interactionId
      );
      setFeedbackText("");
      handleClose();
    } else {
      const response = await sendFeedback({ rating }, interactionId);
      handleClose();
    }
  };

  const handleCancle = async () => {
    handleSubmit();
    return handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleCancle}>
        <Modal.Header>
          <Modal.Title>{t("feedback.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t("feedback.body")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ height: "100%" }}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancle}>
            {t("feedback.Close")}
          </Button>
          <Button className={styles.customButton} onClick={handleSubmit}>
            {t("global.submit")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Feedback;
