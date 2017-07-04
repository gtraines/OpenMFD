/**
 * Created by graham on 7/1/17.
 */

    module.exports = {
        COORDS: getPositionConstants(),
        BTNS: getButtonConstants(),
        BTN_TYPES: getButtonTypeConstants()
    };

    function getButtonTypeConstants() {
        return {
            DISPLAY_ONLY: "DISPLAY_ONLY",
            NAVIGATION: "NAVIGATION",
            SELECT: "SELECT",
            SCROLL_NEXT: "SCROLL_NEXT",
            SCROLL_PREV: "SCROLL_PREV"
        }
    }

    function getElementTypeConstants() {
        return {

        }
    }

    function getPositionConstants() {
        return {
            TOP: "TOP",
            BOTTOM: "BOTTOM",
            LEFT: "LEFT",
            RIGHT: "RIGHT"
        };
    }

    function getButtonConstants() {
        return {
            GAIN_UP: 'GAIN_UP',
            GAIN_DOWN: 'GAIN_DOWN',
            BRT_UP: 'BRT_UP',
            BRT_DOWN: 'BRT_DOWN',
            SYM_UP: 'SYM_UP',
            SYM_DOWN: 'SYM_DOWN',
            CON_UP: 'CON_UP',
            CON_DOWN: 'CON_DOWN',
            OSB01: 'OSB01',
            OSB02: 'OSB02',
            OSB03: 'OSB03',
            OSB04: 'OSB04',
            OSB05: 'OSB05',
            OSB06: 'OSB06',
            OSB07: 'OSB07',
            OSB08: 'OSB08',
            OSB09: 'OSB09',
            OSB10: 'OSB10',
            OSB11: 'OSB11',
            OSB12: 'OSB12',
            OSB13: 'OSB13',
            OSB14: 'OSB14',
            OSB15: 'OSB15',
            OSB16: 'OSB16',
            OSB17: 'OSB17',
            OSB18: 'OSB18',
            OSB19: 'OSB19',
            OSB20: 'OSB20'
        };
    }
