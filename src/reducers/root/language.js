import { CHANGE_LANGUAGE } from './../../constants/ActionTypes';
let initialState = 'en';
let lanStr = window.location.search;
if(lanStr.includes('?lang=')) {
    let lang = lanStr.substring(6, window.location.search.length);
    if (lang === 'en') {
        localStorage.setItem('language', lang);
        initialState = lang;
    } else if (lang === 'vi') {
        localStorage.setItem('language', lang);
        initialState = lang;
    }
} else {
    initialState = 'en';
}
const language = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            let { data } = action;
            localStorage.setItem('language', data);
            return data;
        default:
            if (!localStorage.getItem("language")) {
                state = initialState;
            } else {
                state = localStorage.getItem("language")
            }
            return state;
    }
};

export default language;