export const LocalStorage = (() => {

    function update(id, data) {
        if(data === null || data === undefined || data === '' || id === ''){return;}
        localStorage.setItem(`${id}`, JSON.stringify(data));
    }

    function get(id) {
        if(id === null || id === undefined || id === ''){return;}
        return(JSON.parse(localStorage.getItem(`${id}`)));
    }

    return {update, get};

})();