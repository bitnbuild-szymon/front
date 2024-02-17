export default class Time {
  time: Date;

  constructor(now: Date) {
    this.time = now;
  }

  getDate(time = this.time) {
    return {
      dayOfWeek: time
        .toLocaleString("global", { weekday: "long" })
        .split(",")[0],
      day: time.toLocaleString("global", { day: "numeric" }),
      month: time.toLocaleString("global", { month: "long" }),
      year: time.getFullYear(),
    };
  }

  getDateName() {
    const date = this.getDate();
    return `${date.dayOfWeek}, ${date.day} ${date.month} ${date.year}`;
  }
}
