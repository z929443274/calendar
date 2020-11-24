import yhCalendar from './YhCalendar/index';

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  // 将包装好的yhCalendar 挂到Vue的原型上，作为Vue实例上方法
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$yhCalendar = yhCalendar;
}

export default {
  install,
};
