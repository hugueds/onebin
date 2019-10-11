
function get(item) {
    const val = window.localStorage.getItem(item);
    if (val) return JSON.parse(val);
    return null;
}

function save(item, value) {
    window.localStorage.setItem(item, JSON.stringify(value));
}


export { get, save }