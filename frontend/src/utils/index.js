export const getRandomBG = () => {

    const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#1a535c",
        "#ffe66d",
        "#f7fff7",
        "#6a4c93",
        "#ffb400",
        "#00a8e8",
        "#9b5de5",
        "#f15bb2",
        "#fee440",
        "#00bbf9",
        "#00f5d4",
        "#ff9770",
        "#ef476f",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export const getAvatarName = (name) => {
    if (!name) return "";

    return name.split(" ").map(word => word[0]).join("").toUpperCase();
}

export const formateDataAndTime = (date) => {
    const dateAndTime = new Date(date).toLocaleString("en-US" , {
        month : "long",
        day : "2-digit",
        year : "numeric",
        hour : "2-digit",
        minute : "2-digit",
        second : "2-digit",
        hour12 : true ,
        timeZone : "Asia/Kolkata"
    })

    return dateAndTime
}