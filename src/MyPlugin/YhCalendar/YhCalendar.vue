<template>
  <div class="calender-container">
    <header class="header-position">
      <svg class="icon cursor-style" aria-hidden="true" @click="lastMonth">
        <use xlink:href="#icon-zuo"></use>
      </svg>
      <span class="select-date-style" @click="openCanlendarOptions">{{
        selectDate
      }}</span>
      <svg class="icon cursor-style" aria-hidden="true" @click="nextMonth">
        <use xlink:href="#icon-you"></use>
      </svg>
    </header>
    <main class="canlendar-main">
      <ul class="canlendar-headers">
        <li v-for="(item,index) in week" :key="index" class="canlendar-header">{{item}}</li>
      </ul>
      <ul class="canlendar-days">
        <li v-for="(item,index) in calendarList" :key="index" class="canlendar-day">
          <p class="date-style">{{item.slice(5,10)}}</p>
          <slot name="calendarContent"></slot>
        </li>
      </ul>
    </main>
    <div v-show="isShowCanlendarOptions" ref="canlendarOptions" class="canlendarOptions">
      <div class="show-year">
        <svg class="icon cursor-style" aria-hidden="true" @click="lastYear  ">
          <use xlink:href="#icon-zuo"></use>
        </svg>
        <span class="select-year-style">{{ selectYear }}</span>
        <svg class="icon cursor-style" aria-hidden="true" @click="nextYear">
          <use xlink:href="#icon-you"></use>
        </svg>
      </div>
      <ul class="optionsBox">
        <li class="optionItem" v-for="(item, index) in 12" :key="index" @click="selectMonth(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'YhCalendar',
  data() {
    return {
      msg: '测试',
      selectDate: moment(new Date()).format('YYYY-MM'),
      selectYear: undefined,
      isShowCanlendarOptions: false,
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      lastMonthArr: [],
      currentMonthArr: [],
      nextMonthArr: [],
      calendarList: [],
    };
  },
  mounted() {
    this.initCanlendar();
  },
  methods: {
    // 初始化日历
    initCanlendar() {
      this.calendarList = [];
      this.lastMonthArr = [];
      this.currentMonthArr = [];
      this.nextMonthArr = [];
      const firstDay = moment(this.selectDate).startOf('month').format('YYYY-MM-DD');
      const lastDay = moment(this.selectDate).endOf('month').format('YYYY-MM-DD');
      const daysInMonth = moment(this.selectDate).daysInMonth();
      const firstDayWeekDay = moment(firstDay).isoWeekday();
      const lastDayWeekDay = moment(lastDay).isoWeekday();
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < firstDayWeekDay; i++) {
        this.lastMonthArr.push(moment(firstDay).subtract(firstDayWeekDay - i, 'days').format('YYYY-MM-DD'));
      }
      // eslint-disable-next-line no-plusplus
      for (let i = lastDayWeekDay; i < 7; i++) {
        this.nextMonthArr.push(moment(lastDay).add(i, 'days').format('YYYY-MM-DD'));
      }
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < daysInMonth; i++) {
        this.currentMonthArr.push(moment(firstDay).add(i, 'days').format('YYYY-MM-DD'));
      }
      this.calendarList.push(...this.lastMonthArr, ...this.currentMonthArr, ...this.nextMonthArr);
    },
    // 上个月
    lastMonth() {
      let year = moment(this.selectDate).year();
      let month = moment(this.selectDate).month() + 1;

      month -= 1;
      if (month === 0) {
        month = 12;
        year -= 1;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      this.selectDate = `${year}-${month}`;
      this.initCanlendar();
      this.$emit('changeMonth');
    },

    // 下个月
    nextMonth() {
      let year = moment(this.selectDate).year();
      let month = moment(this.selectDate).month() + 1;

      month += 1;
      if (month === 13) {
        month = 1;
        year += 1;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      this.selectDate = `${year}-${month}`;
      this.initCanlendar();
      this.$emit('changeMonth');
    },

    // 打开日历选择项
    openCanlendarOptions() {
      this.isShowCanlendarOptions = !this.isShowCanlendarOptions;
      this.selectYear = moment(this.selectDate).year();
    },

    // 上一年
    lastYear() {
      let year = this.selectYear;
      year -= 1;
      this.selectYear = year;
    },

    // 下一年
    nextYear() {
      let year = this.selectYear;
      year += 1;
      this.selectYear = year;
    },

    // 选择月份
    selectMonth(val) {
      this.isShowCanlendarOptions = false;
      let month = val;
      if (month < 10) {
        month = `0${month}`;
      }
      this.selectDate = `${this.selectYear}-${month}`;
      this.initCanlendar();
      this.$emit('changeMonth');
    },
  },
};
</script>

<style>
.calender-container {
  position: relative;
  background-color: #ffffff;
  padding: 16px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<style scoped>
.select-date-style {
  font-size: 22px;
  font-weight: bolder;
  cursor: pointer;
}

.header-position {
  float: left;
}

.cursor-style {
  cursor: pointer;
}

.canlendar-main {
  margin-top: 42px;
}

.canlendar-headers {
  display: flex;
  justify-content: space-around;
  border: 1px solid #c6c6c6;
  padding:0;
  margin-bottom: 0;
  background: linear-gradient(194deg,#3d7ffc 0%, #0450ff 100%);
}

.canlendar-header {
  list-style: none;
  text-align: center;
  line-height: 40px;
  width: 14%;
  color: #fff;
  font-size: 14px;
  font-weight: bolder;
}

.canlendar-days {
  display: flex;
  margin-top: 0;
  justify-content: space-around;
  border: 1px solid #c6c6c6;
  flex-wrap: wrap       ;
  padding:0;
}

.canlendar-day {
  list-style: none;
  text-align: center;
  width: 14%;
  font-size: 14px;
  height: 180px;
  border: 1px solid #f5f5f5;
  font-weight: 700;
}

.date-style {
  color: #107DFF;
  font-size: 16px;
  margin:0px;
  padding: 8px 0px;
  border-bottom: 1px solid #f5f5f5;
}

.canlendarOptions {
  display: flex;
  position: absolute;
  top: 60px;
  z-index: 999;
  flex-direction: column;
  border: 1px solid #c6c6c6;
  background-color: #ffffff;
  box-shadow: 0 0 3px 2px #c6c6c6;
  width: 300px;
  align-items: center;
  padding: 8px;
}

.show-year {
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #c6c6c6;
  width: 80%;
}

.optionsBox {
  padding: 0;
  margin: 0;
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #c6c6c6;
  align-items: center;
}

.optionItem {
  width: 73px;
  border: 1px solid #c6c6c6;
  list-style: none;
  cursor: pointer;
}

.select-year-style {
  font-size: 18px;
  font-weight: 700;
}
</style>
