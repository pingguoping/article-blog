// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { history, RequestConfig } from 'umi';
import { getUserInfo } from './services/user/api';
const settingToken = (config: any) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
};
const handleResponseCallBack = (response: any) => {
  return response;
};
export const request: RequestConfig = {
  timeout: 60 * 1000,
  timeoutErrorMessage: '请求超时,请重试',
  errorConfig: {
    errorHandler() {
      console.log('errorHandler');
    },
    errorThrower() {
      console.log('errorThrower');
    },
  },
  requestInterceptors: [settingToken],
  responseInterceptors: [handleResponseCallBack],
};
export async function getInitialState(): Promise<any> {
  // 如果不是登录页面，执行
  let fetchUserInfo = async () => {
    try {
      const res = await getUserInfo();
      if (res.data.status === 401) {
        history.push('/login');
      } else {
        return res.data;
      }
    } catch (error) {
      history.push('/login');
    }
    return undefined;
  };
  if (history.location.pathname !== '/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      // allDicts,
      // loading: false,
      // fetchMenus: fetchMenus,
      // settings: defaultSettings,
    };
  }
  // return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
