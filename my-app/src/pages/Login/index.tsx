import { login } from '@/services/user/api';
import {

    LockOutlined,

    UserOutlined,

} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormText,

} from '@ant-design/pro-components';
import { message, theme } from 'antd';




export default () => {
    const { token } = theme.useToken();
    const handleSubmit = async (values: API.LoginParams) => {
        const res = await login({ ...values });
        if (res.data.status === 200) {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data.userinfo))
            message.success('登录成功')
            window.location.href = '/home'
        }
    }

    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: token.colorBgContainer }}>
                <LoginForm
                    logo=""
                    title=""
                    subTitle=""
                    onFinish={async (values) => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                        }}
                        placeholder={''}
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,


                        }}
                        placeholder={''}
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                    />
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};