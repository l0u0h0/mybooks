import { push } from "connected-react-router";
import { AnyAction } from "redux";
import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import BookService from "../../services/BookService";
import { BookType, BooksState, BookReqType } from "../../common/types";

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const prefix = "my-books/books";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<BooksState, BookType[]>(
  {
    PENDING: (state, action) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga

export const { getBooks, addBook, deleteBook, editBook } = createActions(
  {
    EDIT_BOOK: (bookId: number, book: BookReqType) => ({
      bookId,
      book,
    }),
  },
  "ADD_BOOK",
  "DELETE_BOOK",
  "GET_BOOKS",
  {
    prefix,
  }
);

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

function* addBookSaga(action: Action<BookReqType>) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const book: BookType = yield call(
      BookService.addBook,
      token,
      action.payload
    );
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success([...books, book]));
    yield put(push("/"));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

function* deleteBookSaga(action: Action<number>) {
  try {
    const bookId = action.payload;
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(BookService.deleteBook, token, bookId);
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(success(books.filter((book) => book.bookId !== bookId)));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNWON_ERROR")));
  }
}

interface EditBookSagaAction extends AnyAction {
  bookId: number;
  book: BookReqType;
}

function* editBookSaga(action: EditBookSagaAction) {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const newBook: BookType = yield call(
      BookService.editBook,
      token,
      action.payload.bookId,
      action.payload.book
    );
    const books: BookType[] = yield select((state) => state.books.books);
    yield put(
      success(
        books.map((book) => (book.bookId === newBook.bookId ? newBook : book))
      )
    );
    yield put(push("/"));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

export function* booksSaga() {
  yield takeLatest(`${prefix}/GET_BOOKS`, getBooksSaga);
  yield takeEvery(`${prefix}/ADD_BOOK`, addBookSaga);
  yield takeEvery(`${prefix}/DELETE_BOOK`, deleteBookSaga);
  yield takeEvery(`${prefix}/EDIT_BOOK`, editBookSaga);
}
