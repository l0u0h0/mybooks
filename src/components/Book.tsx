import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { BookType } from "../types";
import moment from "moment";
import { Button, Tooltip } from "antd";

interface BookProps extends BookType {}

const Book: React.FC<BookProps> = ({
  bookId,
  title,
  author,
  createdAt,
  url,
}) => (
  <div>
    <div>
      <Link to={`/book/${bookId}`}>
        <BookOutlined /> {title}
      </Link>
    </div>
    <div>
      <Link to={`/book/${bookId}`}>{author}</Link>
    </div>
    <div>{moment(createdAt).format("MM-DD-YYYY hh:mm a")}</div>
    <div>
      <Tooltip title={url}>
        <a href={url} rel="noreferrer" target="_BLANK">
          <Button
            size="small"
            type="primary"
            shape="circle"
            icon={<HomeOutlined />}
          />
        </a>
      </Tooltip>
    </div>
  </div>
);

export default Book;
