import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goBack } from "connected-react-router";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import { RootState, BookType } from "../types";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { getBooks as getBooksSagaStart } from "../redux/modules/books";

type ParamsId = {
  id?: string;
};

const DetailContainer = () => {
  const { id }: ParamsId = useParams();
  const bookId = Number(id) || -1;
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const edit = useCallback(() => {
    console.log("edit call");
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);

  return (
    <Detail
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      error={error}
      getBooks={getBooks}
      back={back}
      edit={edit}
      logout={logout}
    />
  );
};

export default DetailContainer;
