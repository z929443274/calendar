import Vue from 'vue';
import YhCalendar from './YhCalendar';

// 使用Vue.extend() 创建 日历组件的构造器（日历工厂）
const YhCalendarConstructor = Vue.extend(YhCalendar);

function yhCalendar(options = {}) {
  // 创建yhCalendar 实例 ，通过构造函数传参
  const yhcalendarInstance = new YhCalendarConstructor({
    data: options,
  }).$mount();

  // 手动将真实dom挂载到html的body上
  document.body.appendChild(yhcalendarInstance.$el);
  return yhcalendarInstance;
}

// 导出包装好的 yhCalendar 方法
export default yhCalendar;
