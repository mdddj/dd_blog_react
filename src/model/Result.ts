export interface Result<T> {
  state: number;
  message: string;
  data: T;
}

/**
 * 判断请求是否成功
 * @param result  服务器返回的数据
 */
export const responseIsSuccess: (result: Result<any>) => boolean = (
  result: Result<any>,
) => {
  return result.state === 200;
};
