<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { useAppStore } from '../stores/app.store'

const router = useRouter()

const appStore = useAppStore()

const props = defineProps({
  title: {
    type: String,
    default: "Diário",
  },
  actions: {
    type: Array,
    default: () => []
  },
  isDateDiet: {
    type: Boolean,
    default: false
  }
})

const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

const currentDate = ref(appStore?.getCurrentDateSearch.date)

const dayOfWeek = daysOfWeek[currentDate.value.getDay()];
const dayOfMonth = currentDate.value.getDate();
const month = months[currentDate.value.getMonth()];

const formattedDate = ref(`${dayOfWeek}, ${dayOfMonth} de ${month}`);

const fetching = ref(false)

const goTo = async (route, back = false) => {
  if (!route) {
    return
  }
  if (route === 'back') {
    router.back()
    return
  }

  if (!props.isDateDiet) {
    router.push(route)
  }

  if (appStore.getCurrentDateSearch) {
    fetching.value = true
    if (back) {
      appStore.decrementCurrentDateSearchDay()
    }
    else {
      appStore.incrementCurrentDateSearchDay()
    }

    appStore.updateCurrentDate(appStore.getCurrentQueryDate)
    await router.push('/trains')
    await router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
    fetching.value = false
  }

}

const debounce = (func, delay) => {
  let timerDebounce;

  return (...args) => {
    if (timerDebounce) {
      clearTimeout(timerDebounce);
    }
    timerDebounce = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

}

const debounceGoTO = debounce(goTo, 600)



const JANUARY = 0;
const DECEMBER = 11;

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"]


const currentDateCalendar = currentDate.value;
const currentYear = ref(currentDateCalendar.getFullYear());
const currentMonthIndex = ref(currentDateCalendar.getMonth());
const selectedDay = ref(currentDate.value);

const previousMonth = () => {
  if (currentMonthIndex.value === JANUARY) {
    currentYear.value--;
    currentMonthIndex.value = 11;
  } else {
    currentMonthIndex.value--;
  }
  resetSelectedDay()
};

const nextMonth = () => {
  if (currentMonthIndex.value === DECEMBER) {
    currentYear.value++;
    currentMonthIndex.value = 0;
  } else {
    currentMonthIndex.value++;
  }
  resetSelectedDay()
};


const previousYear = () => {
  currentYear.value--;
  resetSelectedDay()
};

const nextYear = () => {
  currentYear.value++;
  resetSelectedDay()
};


const currentMonth = computed(() => {
  const monthNames = [
    'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
    'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
  ];
  return `${monthNames[currentMonthIndex.value]}`;
});


const isToday = (day) => {
  const today = new Date();
  return (
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() &&
    day.getFullYear() === today.getFullYear()
  );
};

const sixBySevenWeeks = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonthIndex.value, 1)
  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(1 - firstDayOfMonth.getDay())

  const sixBySevenWeeksArray = []

  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      week.push(new Date(startDate))
      startDate.setDate(startDate.getDate() + 1)
    }
    sixBySevenWeeksArray.push(week)
  }

  return sixBySevenWeeksArray
})


const resetSelectedDay = () => {
  selectedDay.value = null
}

const handleClickDay = (day) => {
  if (day === selectedDay.value) {
    resetSelectedDay()
    updateDateModel("")
    return
  }
  currentYear.value = day.getFullYear();
  currentMonthIndex.value = day.getMonth();
  selectedDay.value = day;

  updateDateModel(day);
}

const dayClass = (day) => {
  return {
    'today': isToday(day),
    'selected': day.getFullYear() === currentYear.value &&
      day.getMonth() === currentMonthIndex.value &&
      day.getDate() === selectedDay.value?.getDate(),
    'other-month': day.getMonth() !== currentMonthIndex.value,
  };
};


const openCalendar = ref(false);


onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

const closeCalendar = () => {
  openCalendar.value = false;
};

const handleClickOutside = (event) => {
  const calendar = document.querySelector('.calendar');
  const iconCalendar = document.querySelector('.center-date');

  if (calendar && iconCalendar && !calendar.contains(event.target) && !iconCalendar.contains(event.target)) {
    closeCalendar();
  }
};


const setDiarySelectedCalendarDay = async (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  appStore.setCurrentDateSearch({ date, year, month, day });

  appStore.setCurrentQueryDate(`${year}-${month}-${day}`)

  await router.push('/trains')
  await router.push({ name: 'Diet', params: { date: appStore.getCurrentQueryDate } })
  closeCalendar()
}


const updateDateModel = (day) => {
  if (!day) {
    return
  }

  setDiarySelectedCalendarDay(day);

  // const formattedDay = day.getDate().toString().padStart(2, '0');
  // const formattedMonth = (day.getMonth() + 1).toString().padStart(2, '0');
  // const formattedYear = day.getFullYear();

  // dateInput.value = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  // emitDateInputFormated(dateInput.value);
};


const toggleCalendar = () => {
  if (!props.isDateDiet) {
    return
  }
  openCalendar.value = !openCalendar.value
}


</script>

<template>
  <div>
    <transition name="fade">
      <div class="calendar" v-if="openCalendar" :class="{ 'open': openCalendar }">
        <section class="calendar-actions">
          <div class="calendar-header">
            <button @click.prevent="previousMonth" class="button left"><i
                class="bi bi-chevron-left icon-calendar"></i></button>
            <h2>{{ currentMonth }}</h2>
            <button @click.prevent="nextMonth" class="button right"> <i
                class="bi bi-chevron-right icon-calendar"></i></button>
          </div>
          <div class="calendar-header">
            <button @click.prevent="previousYear" class="button left"><i
                class="bi bi-chevron-left icon-calendar"></i></button>
            <h2>{{ currentYear }}</h2>
            <button @click.prevent="nextYear" class="button right"> <i
                class="bi bi-chevron-right icon-calendar"></i></button>
          </div>
        </section>
        <table>
          <thead>
            <tr>
              <th v-for="week in WEEK_DAYS" :key="week">{{ week }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, weekIndex) in sixBySevenWeeks" :key="weekIndex">
              <td v-for="(day, dayIndex) in week" :key="dayIndex" :class="dayClass(day)" @click="handleClickDay(day)">
                {{ day ? day.getDate() : '' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>

    <nav class="box-title-date">
      <i class="icon" :class="actions[0].btIcon ? actions[0].btIcon : 'bi bi-chevron-left'" v-if="actions[0]"
        @click="debounceGoTO(actions[0].goTo, true)"></i>

      <div class="center-date" @click="toggleCalendar">
        <h3 class="title">{{ title }}</h3>
        <p class="date mb-0">{{ formattedDate.toUpperCase() }}</p>
      </div>

      <i class="icon" :class="actions[1].btIcon ? actions[1].btIcon : 'bi bi-chevron-right'" v-if="actions[1]"
        @click="debounceGoTO(actions[1].goTo, false)"></i>
    </nav>
  </div>
</template>

<style scoped>
.calendar {
  margin: 0 auto;
  text-align: center;
  width: 95%;
  max-width: 550px;
  color: var(--bg-color-light);
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: var(--bg-color-dark);
  position: absolute;
  top: 275px;
  right: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 10;
}

.calendar.open {}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


.calendar-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.calendar-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
}

td {
  cursor: pointer;
}

th {
  color: var(--bg-color-light);
}

.today {
  color: var(--text-color-highlighted2);

  &.selected {
    color: var(--bg-color-light);
  }
}

.other-month {
  color: #777;
}

.selected {
  background-image: var(--linear-bg-color-light);
  border-radius: 15px;
}

.button {
  background-color: transparent;
  color: #cbc9c9;
  font-size: 1.8rem;
  border: none;

  .bi::before {
    font-weight: bold !important;
  }
}

.invalid-date {
  border: 2px solid rgb(234, 46, 46);
}

@media (max-width: 768px) {
  .calendar {}

  th,
  td {
    padding: 10px;
  }
}

.box-title-date {

  background-color: var(--bg-color-dark2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 15px 15px;

  .center-date {
    margin: 0 auto;
    position: relative;
    cursor: pointer;
  }

  .icon {
    cursor: pointer;
    padding: 10px;
    font-size: 20px;
    color: var(--text-color-light2);
  }

  .title {
    color: var(--text-color-light);
  }

  .date {
    color: var(--bg-color-grey2);
  }
}
</style>