
// import { PageContainer } from '@ant-design/pro-components';
// import styles from './index.less';

// const HomePage: React.FC = () => {

//   return (
//     <PageContainer ghost header={{
//       title: '',
//     }}>

//     </PageContainer>
//   );
// };

// export default HomePage;

import type { ActionType } from '@ant-design/pro-table';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import React, { useRef } from 'react';

import { Button, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getArticleTypeList } from '@/services/article/api';
import ChangeModal from './component/ChangeModal';

const Index: React.FC = () => {
  const [openChangeModal, setOpenChangeModal] = React.useState(false);
  const actionRef = useRef<ActionType>();

  const getData = async (params: any) => {
    const res = await getArticleTypeList({ ...params, pages: params.current })
    if (res.data.status === 200) {
      return {
        data: res.data.data.list,
        total: res.data.data.total,
        success: true,
      };
    }
  };
  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true

    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, records) => {
        return (
          <Space>
            <Button key="" type="link" size="small" onClick={() => { }}>
              编辑
            </Button>
            ,
            <Popconfirm
              placement="top"
              title="是否删除该条数据"
              key="delete"
              onConfirm={() => {
                // handleDelete({ id: records.id });
              }}
            >
              <Button type="link" size="small">
                删除
              </Button>
            </Popconfirm>
            ,
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<any>
        actionRef={actionRef}
        request={getData}
        rowKey="id"
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        search={false}
        headerTitle={
          <Space>
            <Button
              type="primary"
              key="add"
              onClick={() => {
                setOpenChangeModal(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          </Space>
        }
      />
      {openChangeModal ? <ChangeModal open={openChangeModal} onCancel={() => { setOpenChangeModal(false) }} onSubmit={() => {
        setOpenChangeModal(false)
        actionRef.current?.reload()
      }} /> : null}
    </>
  );
};

export default Index;

