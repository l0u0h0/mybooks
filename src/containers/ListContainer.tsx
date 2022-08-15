import { useSelector } from "react-redux";
import List from "../components/List";
import { BookType, RootState } from "../types";

export default function ListContainer() {
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );
  return <List books={books} loading={loading} />;
}
