import React, { useRef, useEffect } from "react";
import {
  message as messageDialog,
  PageHeader,
  Input,
  Button,
  InputRef,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import TextAreaType from "rc-textarea";
import { FormOutlined } from "@ant-design/icons";
import Layout from "./Layout";
import { BookType, BookReqType } from "../types";
import styles from "./Edit.module.css";

interface EditProps {
  book: BookType | undefined | null;
  loading: boolean;
  error: Error | null;
  edit: (book: BookReqType, bookId: number | undefined) => void;
  back: () => void;
  getBooks: () => void;
  logout: () => void;
}

const Edit: React.FC<EditProps> = ({
  book,
  loading,
  error,
  edit,
  getBooks,
  back,
  logout,
}) => {
  const titleRef = useRef<InputRef>(null);
  const messageRef = useRef<TextAreaType>(null);
  const authorRef = useRef<InputRef>(null);
  const urlRef = useRef<InputRef>(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  if (book === null) {
    return null;
  }
  if (book === undefined) {
    return (
      <div>
        <h1>NotFound Book</h1>
        <img src="/bg_list.jpeg" className={styles.bg} alt="NotFound Book" />
      </div>
    );
  }

  return (
    <Layout>
      <PageHeader
        onBack={back}
        title={
          <div>
            <FormOutlined /> Edit Book
          </div>
        }
        subTitle="Edit Your Book"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={logout}
            className={styles.button_logout}
          >
            Logout
          </Button>,
        ]}
      />

      <img src="/bg_list.jpeg" className={styles.bg} alt="books" />

      <div className={styles.edit}>
        <div className={styles.input_title}>
          Title
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <Input
            placeholder="Title"
            ref={titleRef}
            defaultValue={book?.title || ""}
            className={styles.input}
          />
        </div>
        <div className={styles.input_comment}>
          Comment
          <span className={styles.required}> *</span>
        </div>
        <div className={styles.input_area}>
          <TextArea
            rows={4}
            placeholder="Comment"
            ref={messageRef}
            defaultValue={book?.message || ""}
            className={styles.input}
            style={{ minHeight: 100 }}
          />
        </div>
        <div className={styles.input_author}>Author</div>
        <div className={styles.input_area}>
          <Input
            placeholder="Author"
            ref={authorRef}
            defaultValue={book?.author || ""}
            className={styles.input}
          />
        </div>
        <div className={styles.input_url}>URL</div>
        <div className={styles.input_area}>
          <Input
            placeholder="URL"
            ref={urlRef}
            defaultValue={book?.url || ""}
            className={styles.input}
          />
        </div>
        <div className={styles.button_area}>
          <Button
            size="large"
            loading={loading}
            onClick={click}
            className={styles.button}
          >
            Update
          </Button>
        </div>
      </div>
    </Layout>
  );

  function click() {
    const title = titleRef.current!.input!.value;
    const message = messageRef.current!.resizableTextArea.props.value as string;
    const author = authorRef.current!.input!.value;
    const url = urlRef.current!.input!.value;

    if (
      title === undefined ||
      message === undefined ||
      author === undefined ||
      url === undefined
    ) {
      messageDialog.error("Plz fill out All Inputs");
      return;
    }
    edit(
      {
        title,
        message,
        author,
        url,
      },
      book?.bookId
    );
  }
};

export default Edit;
