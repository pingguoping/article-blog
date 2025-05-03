import React, { useRef } from 'react';

import { Button, Col, message, Modal, Row, Space } from 'antd';
import ProForm, { ProFormInstance, ProFormText } from '@ant-design/pro-form';
import { getAddArticleType } from '@/services/article/api';

type FormProps = {
  open: boolean;
  onCancel: () => void;
  onSubmit:()=>void
};
const Index: React.FC<FormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const handleSubmit = async (values: any) => {
    const res = await getAddArticleType(values)
    if (res.data.status === 200) {
      message.success('新增成功')
      props.onSubmit()
    } else {
      message.error('新增失败')
    }
  };
  return (
    <Modal
      title="新增"
      open={props.open}
      width={1200}
      destroyOnClose
      maskClosable={false}
      footer={false}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm
        layout="horizontal"
        formRef={formRef}
        style={{ marginTop: '24px', paddingRight: '48px' }}
        onFinish={handleSubmit}
        submitter={{
          render: (self) => {
            return (
              <Row>
                <Col style={{ justifyContent: 'center', display: 'flex' }} span={24}>
                  <Space>
                    <Button
                      type="primary"
                      key="confirm"
                      onClick={() => {
                        self.form?.submit?.();
                      }}
                    >
                      确定
                    </Button>
                    <Button
                      type="primary"
                      key="cancel"
                      onClick={() => {
                        props.onCancel();
                        formRef.current?.resetFields();
                      }}
                    >
                      取消
                    </Button>
                  </Space>
                </Col>
              </Row>
            );
          },
        }}
      >
        <Row>
          <Col span={24}>
            <ProFormText name="name" label="分类名称"></ProFormText>
          </Col>
          <Col span={24}>
            <ProFormText name="type" label="分类类型"></ProFormText>
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
};

export default Index;
