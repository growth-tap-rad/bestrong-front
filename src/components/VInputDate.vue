<script setup>
import { ref, computed, onMounted, watch, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const emit = defineEmits();

const JANUARY = 0;
const DECEMBER = 11;

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"]

const dateInput = ref(props.value);

const currentDate = new Date(1998, 0, 1);
const currentYear = ref(currentDate.getFullYear());
const currentMonthIndex = ref(currentDate.getMonth());
const selectedDay = ref(null);

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
  checkDate(dateInput.value)
});

const closeCalendar = () => {
  openCalendar.value = false;
};

const handleClickOutside = (event) => {
  const calendar = document.querySelector('.calendar');
  const iconCalendar = document.querySelector('.icon');

  if (calendar && iconCalendar && !calendar.contains(event.target) && !iconCalendar.contains(event.target)) {
    closeCalendar();
  }
};


const emitDateInputFormated = (date) => {
  emit('changeDate', date);
}

const updateDateModel = (day) => {
  if (!day) {
    dateInput.value = ""
    emitDateInputFormated("");
    return
  }

  const formattedDay = day.getDate().toString().padStart(2, '0');
  const formattedMonth = (day.getMonth() + 1).toString().padStart(2, '0');
  const formattedYear = day.getFullYear();
  dateInput.value = `${formattedDay}/${formattedMonth}/${formattedYear}`;
  emitDateInputFormated( dateInput.value);
};

const isInputDateInvalid = ref(false);

const checkDate = (value) => {
  if (isDateValid(value)) {
    emit("validDate", true);
    return true
  }

  emit("validDate", false);
  return false

}

watch(dateInput, (newValue) => {
  isInputDateInvalid.value = !isDateValid(newValue);
  checkDate(newValue)
});


const isDateValid = (inputDate) => {
  const [day, month, year] = inputDate.split('/').map(Number);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;

  if (year < new Date().getFullYear() - 100 || year > new Date().getFullYear()) {
    return false;
  }

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  return day >= 1 && day <= lastDayOfMonth && month >= 1 && month <= 12;
}

const toggleCalendar = () => {
  openCalendar.value = !openCalendar.value
}

const formatDataInputValue = (value) => {
  isInputDateInvalid.value = !isDateValid(value);
  if (checkDate(value)) {
    const dateValue = new Date(value)
    updateDateModel(dateValue)
  }
}
</script>

<template>
  <div class="inputs" id="datepicker">
    <label for="date" class="label" v-if="props.title">{{ props.title }}</label>
    <section class="input-icon">
      <i class="bi bi-calendar icon" @click="toggleCalendar"></i>
      <input type="text" class="input" id="date" placeholder="DD/MM/YYYY"
        @change="event => formatDataInputValue(event.target.value)" v-mask="'XX/XX/XXXX'" v-model="dateInput"
        :class="{ 'invalid-date': isInputDateInvalid }" />
    </section>
    <transition name="fade">
      <div class="calendar" v-if="openCalendar" :class="{ 'open': openCalendar }">
        <section class="calendar-actions">
          <div class="calendar-header">
            <button @click="previousMonth" class="button left"><i class="bi bi-chevron-left icon"></i></button>
            <h2>{{ currentMonth }}</h2>
            <button @click="nextMonth" class="button right"> <i class="bi bi-chevron-right icon"></i></button>
          </div>
          <div class="calendar-header">
            <button @click="previousYear" class="button left"><i class="bi bi-chevron-left icon"></i></button>
            <h2>{{ currentYear }}</h2>
            <button @click="nextYear" class="button right"> <i class="bi bi-chevron-right icon"></i></button>
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
  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  .label {
    color: var(--bg-color-light);
    padding: 15px 0;
  }


  .input-icon {
    position: relative;

    .input {
      padding: 10px;
      border-radius: 8px;
      background-color: var(--bg-color-grey);
      color: var(--bg-color-light);
      cursor: pointer;
      width: 100%;
    }

    .icon {
      padding: 0;
      font-size: 20px;
      top: calc(50% - 15px);
      right: 15px;
      color: var(--text-color-light2);
      position: absolute;
      cursor: pointer;
    }
  }

}

.calendar {
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: 550px;
  color: var(--bg-color-light);
  font-weight: bold;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: var(--bg-color-dark);
  position: absolute;
  top: 110px;
  right: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 10;
}

.calendar.open {}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8%);
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
  color: wheat;
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
</style>
