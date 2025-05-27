class Calendar {
    constructor() {
        this.date = new Date();
        this.currentMonth = this.date.getMonth();
        this.currentYear = this.date.getFullYear();
        this.selectedDate = null;
        // Month added
        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.init();
    }

    init() {
        this.monthSelect = document.getElementById('monthSelect');
        this.yearSelect = document.getElementById('yearSelect');
        this.calendarGrid = document.getElementById('calendar');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.todayBtn = document.getElementById('todayBtn');
        this.selectedDateDisplay = document.getElementById('selectedDateDisplay');

        this.setupMonthSelect();
        this.setupYearSelect();
        this.setupEventListeners();
        this.renderCalendar();
    }

    setupMonthSelect() {
        this.monthNames.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            this.monthSelect.appendChild(option);
        });
        this.monthSelect.value = this.currentMonth;
    }

    setupYearSelect() {
        const currentYear = this.date.getFullYear();
        const yearRange = 100; // Show 100 years before and after current year
        
        for (let year = currentYear - yearRange; year <= currentYear + yearRange; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.yearSelect.appendChild(option);
        }
        this.yearSelect.value = this.currentYear;
    }

    setupEventListeners() {
        this.prevMonthBtn.addEventListener('click', () => this.previousMonth());
        this.nextMonthBtn.addEventListener('click', () => this.nextMonth());
        this.todayBtn.addEventListener('click', () => this.goToToday());
        
        this.monthSelect.addEventListener('change', () => {
            this.currentMonth = parseInt(this.monthSelect.value);
            this.renderCalendar();
        });
        
        this.yearSelect.addEventListener('change', () => {
            this.currentYear = parseInt(this.yearSelect.value);
            this.renderCalendar();
        });
    }

    renderCalendar() {
        // Update selectors
        this.monthSelect.value = this.currentMonth;
        this.yearSelect.value = this.currentYear;

        // Clear the calendar grid
        this.calendarGrid.innerHTML = '';

        // Get first day of the month and total days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();

        // Get previous month's days
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
        
        // Add previous month's days
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(prevMonthLastDay - i, 'other-month');
            this.calendarGrid.appendChild(dayElement);
        }

        // Add current month's days
        for (let i = 1; i <= totalDays; i++) {
            const dayElement = this.createDayElement(i, 'current-month');
            
            if (this.isToday(i)) {
                dayElement.classList.add('today');
            }
            
            if (this.isSelectedDate(i)) {
                dayElement.classList.add('selected');
            }

            this.calendarGrid.appendChild(dayElement);
        }

        // Add next month's days
        const remainingDays = 42 - (firstDayIndex + totalDays);
        for (let i = 1; i <= remainingDays; i++) {
            const dayElement = this.createDayElement(i, 'other-month');
            this.calendarGrid.appendChild(dayElement);
        }

        // Update selected date display
        this.updateSelectedDateDisplay();
    }

    createDayElement(day, monthType) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day', monthType);
        dayElement.textContent = day;

        if (monthType === 'current-month') {
            dayElement.addEventListener('click', () => this.selectDate(day));
        }

        return dayElement;
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    goToToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.selectedDate = today;
        this.renderCalendar();
    }

    isToday(day) {
        const today = new Date();
        return day === today.getDate() &&
               this.currentMonth === today.getMonth() &&
               this.currentYear === today.getFullYear();
    }

    isSelectedDate(day) {
        if (!this.selectedDate) return false;
        return day === this.selectedDate.getDate() &&
               this.currentMonth === this.selectedDate.getMonth() &&
               this.currentYear === this.selectedDate.getFullYear();
    }

    selectDate(day) {
        this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
        this.renderCalendar();
    }

    updateSelectedDateDisplay() {
        if (this.selectedDate) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            this.selectedDateDisplay.textContent = this.selectedDate.toLocaleDateString(undefined, options);
        } else {
            this.selectedDateDisplay.textContent = 'No date selected';
        }
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
}); 
