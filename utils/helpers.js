module.exports = {

    format_date: (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return `${month}/${day}/${year}`
    }
};