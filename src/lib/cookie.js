const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2){
        return parts.pop().split(';').shift();
    }
    return null;
}

const setCookie = (name, value, days) => {
    let expires = "";
    if (days){
        const date = new Date();
        date.setTime(Date.now + (1000*60*60*24*days));
        expires = "; expires =" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}

const deleteCookie = (name) => {
    document.cookie = name + "=; Max-Age=-999999999";
}

export {getCookie, setCookie, deleteCookie};