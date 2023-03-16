export const LocalStorage = (() => {

    function update(id, data) {
        localStorage.setItem(`${id}`, JSON.stringify(data));
    }

    function retrieve(id) {
        if(localStorage.getItem(`${id}`) == 'undefined'){return undefined;}
        return(JSON.parse(localStorage.getItem(`${id}`)));
    }

    return {update, retrieve};

})();