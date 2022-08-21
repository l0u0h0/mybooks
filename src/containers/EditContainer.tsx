import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { goBack } from "connected-react-router";
import Edit from "../components/Edit";
import { RootState, BookType, BookReqType } from "../types";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import {
  editBook as editBookSagaStart,
  getBooks as getBooksSagaStart,
} from "../redux/modules/books";

type ParamsId = {
  id?: string;
};

const EditContainer = () => {
  const { id }: ParamsId = useParams();
  const bookId = Number(id) || -1;
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);

  const edit = useCallback(
    (book: BookReqType) => {
      dispatch(editBookSagaStart(bookId, book));
    },
    [dispatch, bookId]
  );

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);

  return (
    <Edit
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      loading={loading}
      error={error}
      edit={edit}
      getBooks={getBooks}
      back={back}
      logout={logout}
    />
  );
};

export default EditContainer;
