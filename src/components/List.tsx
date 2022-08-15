import { Button, PageHeader, Table } from "antd";
import { BookType } from "../types";
import Layout from "./Layout";

interface ListProps {
  books: BookType[] | null;
  loading: boolean;
}

const List: React.FC<ListProps> = ({ books, loading }) => {
  const goAdd = () => {};
  const logout = () => {};
  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button key="2" type="primary" onClick={goAdd}>
            Add Book
          </Button>,
          <Button key="1" type="primary" onClick={logout}>
            Logout
          </Button>,
        ]}
      />
      <Table
        dataSource={[]}
        columns={[
          {
            title: "Book",
            dataIndex: "book",
            key: "book",
            render: () => <div>book</div>,
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        rowKey="bookId"
        pagination={false}
      />
    </Layout>
  );
};

export default List;
