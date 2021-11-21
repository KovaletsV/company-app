const currentDate = currentTime => {
    const result = {};
    const time = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };
    Object.keys(time).forEach(function (key) {
        result[key] = Math.floor(currentTime / time[key]);
        currentTime -= result[key] * time[key];
    });
    return result;
};
export const showDate = time => {
    const currentTime = (new Date().getTime() - time) / 1000;
    if (currentTime <= 60) {
        return "1 минуту назад";
    } else if (currentTime <= 300 && currentTime > 60) {
        return "5 минут назад";
    } else if (currentTime <= 600 && currentTime > 300) {
        return "10 минут назад";
    } else if (currentTime <= 1800 && currentTime > 600) {
        return "30 минут назад";
    } else if (currentTime <= 86400 && currentTime > 1800) {
        if (currentTime >= 1800 && currentTime < 3600) {
            return "1 час назад";
        } else {
            const time = currentDate(currentTime);
            return ` ${time.hour} часов, ${time.minute} минут назад`;
        }
    } else if (currentTime <= 31536000 && currentTime > 86400) {
        const time = currentDate(currentTime);
        return ` ${time.month} месяц  ${time.day} дней назад `;
    } else {
        const time = currentDate(currentTime);
        return ` ${time.year} лет ${time.month} месяцев ${time.day} дней назад  `;
    }
};
