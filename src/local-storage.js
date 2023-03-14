export const LocalStorage = (() => {

    function update(id, data) {
        if(data === null || data === undefined || data === ''){return;}
        localStorage.setItem(`${id}`, JSON.stringify(data));
    }

    function get(id) {
        return(JSON.parse(localStorage.getItem(`${id}`, JSON.stringify(data))));
    }

    return {update, get};

})();