import { Component } from 'react';
import { notification } from 'antd';

class Helpers extends Component {
    static showNotify = (type, title, desc) => {
        return notification[type]({
            message: title,
            description: desc,
            duration: 2.5,
            placement: 'topRight',
        });
    }
    static showNotifyBagging = (type, title, desc) => {

        return notification[type]({
            message: title,
            description: desc,
            duration: 0,
            placement: 'topRight',
        });
    }
    static addCommas(nStr) {
        if (isNaN(nStr)) {
            let str = 0;
            str = parseFloat(nStr).toFixed(3);
            let x = str.toString().split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? '.' + x[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        } else {
            return undefined;
        }
        
    }
}
export default Helpers;