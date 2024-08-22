class storage {

    static setDefault(key, item) {
        localStorage.setItem(key, item)
    }

    static set(key, cartItems) {
        localStorage.setItem(key, JSON.stringify(cartItems))
    }

    static get(key) {
        let json;
        try {
            json = JSON.parse(localStorage.getItem(key))
        } catch (err) {
            json = false;
        }
        return json;
    }

    static isset(key) {
        return localStorage.getItem(key) !== null;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }
}

export default storage;