/**
 * Created by graham on 7/1/17.
 */
var CONSTS = require('../mfd_constants.js');

module.exports = {
    renderPage: renderPage
};

var textConfig = {
    fontSize: 10,
    fontFamily: 'RobotoMono',
    textAlign: 'center',
    fill: "limegreen",
    left: 5,
    top: 15
};

var titleConfig = {
    fontSize: 14,
    fontFamily: 'RobotoMono',
    fill: "limegreen",
    left: 15,
    top: 15
};

var BTN_COL_ROW = [];

function addButtonCoord(buttonId, x, y) {
    var buttonCoordObject = {
        buttonId: buttonId,
        x: x,
        y: y
    };

    BTN_COL_ROW.push(buttonCoordObject);
}

function generateButtonCoords() {

    addButtonCoord(CONSTS.BTNS.OSB01, 1, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB02, 2, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB03, 3, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB04, 4, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.OSB05, 5, CONSTS.COORDS.TOP);

    addButtonCoord(CONSTS.BTNS.OSB11, 5, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB12, 4, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB13, 3, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB14, 2, CONSTS.COORDS.BOTTOM);
    addButtonCoord(CONSTS.BTNS.OSB15, 1, CONSTS.COORDS.BOTTOM);

    addButtonCoord(CONSTS.BTNS.GAIN_UP, CONSTS.COORDS.LEFT, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.GAIN_DOWN, CONSTS.COORDS.LEFT, 1);

    addButtonCoord(CONSTS.BTNS.OSB20, CONSTS.COORDS.LEFT, 2);
    addButtonCoord(CONSTS.BTNS.OSB19, CONSTS.COORDS.LEFT, 3);
    addButtonCoord(CONSTS.BTNS.OSB18, CONSTS.COORDS.LEFT, 4);
    addButtonCoord(CONSTS.BTNS.OSB17, CONSTS.COORDS.LEFT, 5);
    addButtonCoord(CONSTS.BTNS.OSB16, CONSTS.COORDS.LEFT, 6);

    addButtonCoord(CONSTS.BTNS.BRT_UP, CONSTS.COORDS.LEFT, 7);
    addButtonCoord(CONSTS.BTNS.BRT_DOWN, CONSTS.COORDS.LEFT, CONSTS.COORDS.BOTTOM);

    addButtonCoord(CONSTS.BTNS.SYM_UP, CONSTS.COORDS.RIGHT, CONSTS.COORDS.TOP);
    addButtonCoord(CONSTS.BTNS.SYM_DOWN, CONSTS.COORDS.RIGHT, 1);

    addButtonCoord(CONSTS.BTNS.OSB06, CONSTS.COORDS.RIGHT, 2);
    addButtonCoord(CONSTS.BTNS.OSB07, CONSTS.COORDS.RIGHT, 3);
    addButtonCoord(CONSTS.BTNS.OSB08, CONSTS.COORDS.RIGHT, 4);
    addButtonCoord(CONSTS.BTNS.OSB09, CONSTS.COORDS.RIGHT, 5);
    addButtonCoord(CONSTS.BTNS.OSB10, CONSTS.COORDS.RIGHT, 6);

    addButtonCoord(CONSTS.BTNS.CON_UP, CONSTS.COORDS.RIGHT, 7);
    addButtonCoord(CONSTS.BTNS.CON_DOWN, CONSTS.COORDS.RIGHT, CONSTS.COORDS.BOTTOM);
}

function renderPage(page, canvas) {
    if (BTN_COL_ROW.length == 0) {
        generateButtonCoords();
    }

    positionTitle(page.title, canvas);
    positionElements(page.elements, canvas);
    positionButtonLabels(page.buttons, canvas);

    canvas.renderAll();
}

function positionButtonLabels(buttons, canvas) {

    _.each(buttons, function(button) {
        positionButtonLabel(button, canvas);
    });
}

function positionButtonLabel(button, canvas) {
    var btnText = new fabric.Text(button.displayText,
        textConfig);

    canvas.add(btnText);
    var canvasCoords = getButtonRenderCoordinates(button.buttonId, btnText, canvas);

    btnText.set(
        {
            left: canvasCoords.left,
            top: canvasCoords.top
        });
}

function getButtonRenderCoordinates(buttonId, fabricTextObject, canvas) {
    var left = 0.0;
    var top = 0.0;

    var edgeMargin = 5.0;

    var btnColRow = _.find(BTN_COL_ROW, function (btn) {

        return btn.buttonId == buttonId;
    });

    if (btnColRow.x == CONSTS.COORDS.LEFT) {
        left = edgeMargin;
    } else if (btnColRow.x == CONSTS.COORDS.RIGHT) {
        left = canvas.getWidth() - (fabricTextObject.width + edgeMargin);
    } else {
        left = getXCenterForColumn(btnColRow.x, canvas) - (fabricTextObject.width / 2.0);
    }

    if (btnColRow.y == CONSTS.COORDS.TOP) {
        top = edgeMargin;
    } else if (btnColRow.y == CONSTS.COORDS.BOTTOM) {
        top = canvas.getHeight() - (fabricTextObject.height + edgeMargin);
    } else {
        top = getYCenterForRow(btnColRow.y, canvas);
    }

    return {
        left: left,
        top: top
    };
}

function getRenderCoordinates(col, row, textObject, canvas) {
    var left = getXCenterForColumn(col, canvas) - (textObject.width / 2.0);
    var top = getYCenterForRow(row, canvas) - (textObject.width / 2.0);

    return {
        left: left,
        top: top
    }
}

function positionElements(elements, canvas) {
    _.each(elements, function (element) {
        var elementText = new fabric.Text(element.displayText, textConfig);
        canvas.add(elementText);

        var canvasCoords = getRenderCoordinates(element.position.x, element.position.y, elementText, canvas);

        elementText.set({
            left: canvasCoords.left,
            top: canvasCoords.top
        });
    })
}

function positionTitle(titleObj, canvas) {
    if (titleObj == undefined) {
        return;
    }


    var titleText = new fabric.Text(titleObj.displayText, titleConfig);
    canvas.add(titleText);

    var canvasCoords = getRenderCoordinates(titleObj.position.x, titleObj.position.y, titleText, canvas);

    titleText.set(
        {
            left: canvasCoords.left,
            top: canvasCoords.top
        });

}

function getXCenterForColumn(col, canvas) {
    var widthStep = canvas.getWidth() / 7.0;

    var x_center = (widthStep * col) + (widthStep / 2.0);

    return x_center;
}

function getYCenterForRow(row, canvas) {
    var heightStep = canvas.getHeight() / 7.50;

    var y_center = (heightStep * (row - 1)) + (heightStep / 2.0);

    return y_center;
}