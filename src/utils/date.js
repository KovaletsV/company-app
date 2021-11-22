export function getDate(timestamp) {
    const difference = Date.now() - Number(timestamp);
    const minutes = Math.floor(difference / 1000 / 60);
    if (minutes < 1) return " Now";
    if (minutes < 60) return ` ${getMinutes(minutes)} later`;
    const hours = Math.floor(difference / 1000 / 60 / 60);
    if (hours < 24) {
        return ` ${getHours(hours)} ${getMinutes(minutes % 60)} later`;
    }
    const date = new Date(+timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return ` ${day} ${month} ${year} year`;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dic",
];

const getMinutes = minutes => {
    const words = ["minute", "minutes"];
    const last = String(minutes)[String(minutes).length - 1];
    if (minutes > 10 && minutes < 20) return ` ${minutes} ${words[2]}`;
    if (last === "1") return ` ${minutes} ${words[0]}`;
    if (+last > 1) return ` ${minutes} ${words[1]}`;
};

const getHours = hours => {
    const words = ["hour", "hours"];
    const last = String(hours)[String(hours).length - 1];
    if (hours > 10 && hours < 20) return ` ${hours} ${words[2]}`;
    if (last === "1") return ` ${hours} ${words[0]}`;
    if (+last > 1) return ` ${hours} ${words[1]}`;
};
