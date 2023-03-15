export const LocalStorage = (() => {

    function update(id, data) {
        localStorage.setItem(`${id}`, JSON.stringify(data));
    }

    function retrieve(id) {
        return(JSON.parse(localStorage.getItem(`${id}`)));
    }

    return {update, retrieve};

})();