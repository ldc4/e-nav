/**
 * Created by 幻云 on 2017/5/20.
 */
import _ from 'lodash';

/**
 * 给数组添加key属性
 * 说明：
 * 由于React迭代数组，强行要加key，而有的antd组件没有rowKey属性。
 * 例如：Each child in an array or iterator should have a unique "key" prop. Check the render method of `TransferList`.
 * @param arr 迭代的数组
 * @param rowKey 指定key字段
 * @returns {Array}
 */
export const addKey = (arr, rowKey) => {
  if(!arr){ return []; }
  _.forEach(arr, (item)=>{
    item.key = item[rowKey];
  });
  return arr;
};
