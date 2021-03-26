class Timer {
    constructor(selector) {
        this.selector = selector
        this.$el = document.querySelector(selector)

        this._start()
    }

    _start() {
        if(!this.$el.hasAttribute('draggable')) {
            this._setup()
            this._render()
        }
    }

    _render() {
        this._startInterval()
        this.updateNumberHTML()
        this.updateTextHTML()
    }

    _setup() {
        this.$dataValues = this.$el.querySelectorAll('[data-value]')
        this.$dataTypes = this.$el.querySelectorAll('[data-type]')
        this.$button = document.querySelector(`${this.selector} + [data-option="button"]`)

        this.endTime = Date.now() + this.total()
        this.currentTime = new TimeRemaining(new Date(this.endTime)).getTime()
    }

    _update() {
        this.gapTime = this.endTime - Date.now()
        this.currentTime = new TimeRemaining(new Date(this.endTime)).getTime()

        this.updateNumberHTML()
        this.updateTextHTML()
    }

    _startInterval() {
        const t = setInterval(() => {
            this._update()

            if (this.gapTime <= 0) {
                clearInterval(t)
                this.$button.remove()
            }
        }, 1000)
    }

    total() {
        const days = +this.$dataValues[0].textContent * 24 * 3600 * 1000
        const hours = +this.$dataValues[1].textContent * 3600 * 1000
        const minutes = +this.$dataValues[2].textContent * 60000
        const seconds = +this.$dataValues[3].textContent * 1000
        const total = days + hours + minutes + seconds

        return +total
    }

    updateNumberHTML() {
        this.$dataValues.forEach(value => {
                if(this.currentTime[value.dataset.value] < 10) {
                    value.textContent = `0${this.currentTime[value.dataset.value]}`
                } else {
                    value.textContent = `${this.currentTime[value.dataset.value]}`
                }
        })
    }

    updateTextHTML() {
        this.$dataTypes.forEach(value => {
            if (value.dataset.type === 'days') {
                value.textContent = this.decOfNum(this.currentTime.days, ['день', 'дня', 'днів'])
            } else if (value.dataset.type === 'hours') {
                value.textContent = this.decOfNum(this.currentTime.hours, ['година', 'години', 'годин'])
            } else if (value.dataset.type === 'minutes') {
                value.textContent = this.decOfNum(this.currentTime.minutes, ['хвилина', 'хвилини', 'хвилин'])
            } else if (value.dataset.type === 'seconds') {
                value.textContent = this.decOfNum(this.currentTime.seconds, ['секунда', 'секунди', 'секунд'])           
            }
        })
    }

    decOfNum(number, titles) {
        let decCache = [],
            decCases = [2, 0, 1, 1, 1, 2]

        if(!decCache[number]) {
            decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)]
        }
        return titles[decCache[number]]
    }
}


class TimeRemaining {
    constructor(endtime) {
        this.endtime = endtime

        this.getTime()
    }

    getTime() {
        const t = Date.parse(this.endtime) - Date.parse(new Date())
        
        const seconds = Math.floor((t / 1000) % 60)
        const minutes = Math.floor((t / 1000 / 60) % 60)
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
        const days = Math.floor(t / (1000 * 60 * 60 * 24))

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
}