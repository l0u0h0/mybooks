import { BookOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BookType } from "../types";
import moment from "moment";

interface BookProps extends BookType {}

const Book: React.FC<BookProps> = ({ bookId, title, author, createdAt }) => (
  <div>
    <div>
      <Link to={`/book/${bookId}`}>
        <BookOutlined /> {title}
      </Link>
    </div>
    <div>
      <Link to={`/book/${bookId}`}>{author}</Link>
    </div>
    <div>{moment(createdAt)}</div>
  </div>
);

export default Book;
