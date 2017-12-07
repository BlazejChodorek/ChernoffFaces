/**
 * @constructor
 */
function ChernoffFaces() {

    /**
     * Canvas id
     * @type {string}
     */
    var canvasId = "mapCanvas";

    /**
     * Funkcja rysująca mapę z pliku "map.png"
     */
    this.drawMap = function () {

        var map = new Image();
        map.src = "map.png";

        var dynamicCanvas = document.createElement("canvas");
        var dynamicContext = dynamicCanvas.getContext("2d");
        dynamicCanvas.height = "620";
        dynamicCanvas.width = "660";

        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext("2d");

        map.onload = function () {
            dynamicContext.drawImage(map, 0, 0);

            ctx = ctx.drawImage(dynamicCanvas, 0, 0);
            // window.open(canvas.toDataURL());
        };
    };

    /**
     * Funkcja rysująca wszystkie twarze na mapie.
     * @param data - JSON z danymi.
     */
    this.drawFaces = function (data) {

        var dataArrays = getDataArrays(data);
        var form = getFormValuesbyId("eyes", "mounth", "nose", "eyebrow", "head");

        if (form.validate) {

            var parameters = getParameters(dataArrays, form.values);

            var map = new Image();
            map.src = "map.png";

            var dynamicCanvas = document.createElement("canvas");
            var dynamicContext = dynamicCanvas.getContext("2d");
            dynamicCanvas.height = "620";
            dynamicCanvas.width = "660";

            var canvas = document.getElementById(canvasId);
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            map.onload = function () {
                dynamicContext.drawImage(map, 0, 0);

                var coordinates = facesCoordinates.facesCoordinates;
                for (var id in coordinates) {
                    drawFace(ctx,
                        /*x*/coordinates[id].x, /*y*/coordinates[id].y,
                        /*head*/getCompartment(parameters.head, /*id wojewodztwa*/parseInt(id)),
                        /*eyebrow*/getCompartment(parameters.eyebrow, parseInt(id)),
                        /*eyes*/getCompartment(parameters.eyes, parseInt(id)),
                        /*nose*/getCompartment(parameters.nose, parseInt(id)),
                        /*mounth*/getCompartment(parameters.mounth, parseInt(id)));
                }

                ctx = ctx.drawImage(dynamicCanvas, 0, 0);
                // window.open(canvas.toDataURL());
            };
        }
    };

    /**
     * Funkcja tworząca tablice z danymi.
     * @param data - JSON z danymi.
     * @return {{}} - Tablice z danymi.
     */
    function getDataArrays(data) {

        var dataArrays = {};
        var wojewodztwo = [];
        var powierzchnia = [];
        var ludnosc = [];
        var urbanizacja = [];
        var bezrobocie = [];
        var PKB = [];

        for (var item in data) {
            wojewodztwo[item] = data[item].wojewodztwo;
            powierzchnia[item] = data[item].powierzchnia;
            ludnosc[item] = data[item].ludnosc;
            urbanizacja[item] = data[item].urbanizacja;
            bezrobocie[item] = data[item].bezrobocie;
            PKB[item] = data[item].PKB;
        }

        dataArrays.wojewodztwo = wojewodztwo;
        dataArrays.powierzchnia = powierzchnia;
        dataArrays.ludnosc = ludnosc;
        dataArrays.urbanizacja = urbanizacja;
        dataArrays.bezrobocie = bezrobocie;
        dataArrays.PKB = PKB;

        return dataArrays;
    }

    /**
     * Funkcja pobierająca dane z formularza.
     * @param {string} eyesId - id z formularza.
     * @param {string} mounthId - id z formularza.
     * @param {string} noseId - id z formularza.
     * @param {string} eyebrowId - id z formularza.
     * @param {string} headId - id z formularza.
     * @return {{values: {}, validate: {}}} - Dane z formularza.
     */
    function getFormValuesbyId(eyesId, mounthId, noseId, eyebrowId, headId) {

        event.preventDefault();
        var values = {};
        values.eyesInput = $('#' + eyesId).val();
        values.mounthInput = $('#' + mounthId).val();
        values.noseInput = $('#' + noseId).val();
        values.eyebrowInput = $('#' + eyebrowId).val();
        values.headInput = $('#' + headId).val();
        $(".error").text("");

        var validate = {};
        if (values.eyesInput === "null") {
            validate.eyesInput = "Wybierz jakąś opcję";
            $("#error-eyes").text(validate.eyesInput);
        }

        if (values.mounthInput === "null") {
            validate.mounthInput = "Wybierz jakąś opcję";
            $("#error-mounth").text(validate.mounthInput);
        }

        if (values.noseInput === "null") {
            validate.noseInput = "Wybierz jakąś opcję";
            $("#error-nose").text(validate.noseInput);
        }

        if (values.eyebrowInput === "null") {
            validate.eyebrowInput = "Wybierz jakąś opcję";
            $("#error-eyebrow").text(validate.eyebrowInput);
        }

        if (values.headInput === "null") {
            validate.headInput = "Wybierz jakąś opcję";
            $("#error-head").text(validate.headInput);
        }

        jQuery.isEmptyObject(validate) ? validate = true : validate = false;

        return {"values": values, "validate": validate};
    }

    /**
     * Funkcja przydzielająca dane do przedziałów 1, 2 lub 3.
     * @param array - Tablica z danymi.
     * @param {number} voivodeshipId - ID województwa, dostępne w pliku wojewodztwa.json.
     * @return {number} - Numer przedzalu dla podanej kategorii (1, 2, 3).
     */
    function getCompartment(array, voivodeshipId) {

        var index1 = Math.round(array.length / 3);
        var index2 = Math.round(index1 * 2);

        if (array[voivodeshipId] < array[index1]) return 1;
        if (array[voivodeshipId] > array[index2]) return 3;
        if ((array[voivodeshipId] >= array[index1]) && (array[voivodeshipId] <= array[index2])) return 2;
    }

    /**
     * Funkcja rysująca jedną twarz.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X na mapie.
     * @param {number} y - Współrzędna Y na mapie.
     * @param {number} headType - Typ twarzy (1, 2, 3).
     * @param {number} eyebrowType - Typ brwi (1, 2, 3).
     * @param {number} eyesType - Typ oczu (1, 2, 3).
     * @param {number} noseType - Typ nosa (1, 2, 3).
     * @param {number} mounthType - Typ ust (1, 2, 3).
     */
    function drawFace(ctx, x, y, headType, eyebrowType, eyesType, noseType, mounthType) {

        drawHead(ctx, x, y, headType);
        drawEyebrow(ctx, x, y, eyebrowType);
        drawEyes(ctx, x, y, eyesType);
        drawNose(ctx, x, y, noseType);
        drawMouth(ctx, x, y, mounthType);
    }

    /**
     * Funkcja rysująca nos.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X w obrębie twarzy.
     * @param {number} y - Współrzędna Y w obrębie twarzy.
     * @param {number} type - 1, 2 lub 3
     */
    function drawNose(ctx, x, y, type) {

        ctx.beginPath();
        ctx.moveTo(x + 25, y + 20);
        switch (type) {
            case 1:
                ctx.lineTo(x + 23, y + 25);
                ctx.lineTo(x + 27, y + 25);
                break;
            case 2:
                ctx.lineTo(x + 20, y + 25);
                ctx.lineTo(x + 30, y + 25);
                break;
            case 3:
                ctx.lineTo(x + 20, y + 32);
                ctx.lineTo(x + 30, y + 32);
                break;
        }
        ctx.lineTo(x + 25, y + 20);
        ctx.stroke();
    }

    /**
     * Funkcja rysująca głowę.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X w obrębie twarzy.
     * @param {number} y - Współrzędna Y w obrębie twarzy.
     * @param {number} type - 1, 2 lub 3
     */
    function drawHead(ctx, x, y, type) {

        switch (type) {
            case 1:
                drawEllipse(ctx, (x - /*width*/30 / 2.0) + 25, (y - 50 / 2.0) + 25, /*width*/30, 50);
                break;
            case 2:
                drawEllipse(ctx, (x - /*width*/40 / 2.0) + 25, (y - 50 / 2.0) + 25, /*width*/40, 50);
                break;
            case 3:
                drawEllipse(ctx, (x - /*width*/50 / 2.0) + 25, (y - 50 / 2.0) + 25, /*width*/50, 50);
                break;
        }
    }

    /**
     * Funkcja rysująca oczy.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X w obrębie twarzy.
     * @param {number} y - Współrzędna Y w obrębie twarzy.
     * @param {number} type - 1, 2 lub 3
     */
    function drawEyes(ctx, x, y, type) {

        var size;
        switch (type) {
            case 1:
                size = 6;
                break;
            case 2:
                size = 10;
                break;
            case 3:
                size = 15;
                break;
        }

        drawEllipseByCenter(ctx, x + 15, y + 15, size, size);
        drawEllipseByCenter(ctx, x + 35, y + 15, size, size);
        drawEllipseByCenter(ctx, x + 15, y + 15, size - 5, size - 5);
        drawEllipseByCenter(ctx, x + 35, y + 15, size - 5, size - 5);
    }

    /**
     * Funkcja rysująca usta.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X w obrębie twarzy.
     * @param {number} y - Współrzędna Y w obrębie twarzy.
     * @param {number} type - 1, 2 lub 3
     */
    function drawMouth(ctx, x, y, type) {

        ctx.beginPath();
        switch (type) {
            case 3:
                ctx.arc(x + 25, y + 25, 20, 0.25 * Math.PI, 0.75 * Math.PI);
                break;
            case 2:
                ctx.moveTo(x + 15, y + 40);
                ctx.lineTo(x + 35, y + 40);
                break;
            case 1:
                ctx.arc(x + 25, y + 55, 20, 1.25 * Math.PI, 1.75 * Math.PI);
                break;
        }
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    /**
     * Funkcja rysująca brwi.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X w obrębie twarzy.
     * @param {number} y - Współrzędna Y w obrębie twarzy.
     * @param {number} type - 1, 2 lub 3
     */
    function drawEyebrow(ctx, x, y, type) {

        ctx.beginPath();
        switch (type) {
            case 1:
                //lewa1
                ctx.moveTo(x + 5, y + 15);
                ctx.lineTo(x + 20, y + 5);
                //prawa1
                ctx.moveTo(x + 30, y + 5);
                ctx.lineTo(x + 45, y + 15);
                break;
            case 2:
                //lewa2
                ctx.moveTo(x + 8, y + 8);
                ctx.lineTo(x + 20, y + 8);
                //prawa2
                ctx.moveTo(x + 30, y + 8);
                ctx.lineTo(x + 42, y + 8);
                break;
            case 3:
                //lewa3
                ctx.moveTo(x + 8, y + 5);
                ctx.lineTo(x + 20, y + 8);
                //prawa3
                ctx.moveTo(x + 30, y + 8);
                ctx.lineTo(x + 42, y + 5);
                break;
        }
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    /**
     * Funkcja rysująca elipsę.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X środka elipsy.
     * @param {number} y - Współrzędna Y środka elipsy.
     * @param {number} w - Szerokość elipsy.
     * @param {number} h - Wysokość elipsy.
     */
    function drawEllipseByCenter(ctx, x, y, w, h) {

        drawEllipse(ctx, x - w / 2.0, y - h / 2.0, w, h);
    }

    /**
     * Funkcja rysująca elipsę.
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} x - Współrzędna X elipsy.
     * @param {number} y - Współrzędna Y elipsy.
     * @param {number} w - Szerokość elipsy.
     * @param {number} h - Wysokość elipsy.
     */
    function drawEllipse(ctx, x, y, w, h) {

        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    /**
     * Funkcja przypisująca dane dotyczące województw do danych z formularza.
     * @param dataArrays - Tablica zawierająca dane z pliku wojewodztwa.json podzielone na tablice.
     * @param form - Tablica zawierająca dane z formularza.
     * @return {{eyes: *, mounth: *, nose: *, eyebrow: *, head: *}} - JSON z informacją do jakiej części twarzy jakie dane zostały przypisane.
     */
    function getParameters(dataArrays, form) {
        var eyes;
        var mounth;
        var nose;
        var eyebrow;
        var head;

        switch (form.eyesInput) {
            case "powierzchnia":
                eyes = dataArrays.powierzchnia;
                break;
            case "ludnosc":
                eyes = dataArrays.ludnosc;
                break;
            case "urbanizacja":
                eyes = dataArrays.urbanizacja;
                break;
            case "bezrobocie":
                eyes = dataArrays.bezrobocie;
                break;
            case "PKB":
                eyes = dataArrays.PKB;
                break;
        }

        switch (form.mounthInput) {
            case "powierzchnia":
                mounth = dataArrays.powierzchnia;
                break;
            case "ludnosc":
                mounth = dataArrays.ludnosc;
                break;
            case "urbanizacja":
                mounth = dataArrays.urbanizacja;
                break;
            case "bezrobocie":
                mounth = dataArrays.bezrobocie;
                break;
            case "PKB":
                mounth = dataArrays.PKB;
                break;
        }

        switch (form.noseInput) {
            case "powierzchnia":
                nose = dataArrays.powierzchnia;
                break;
            case "ludnosc":
                nose = dataArrays.ludnosc;
                break;
            case "urbanizacja":
                nose = dataArrays.urbanizacja;
                break;
            case "bezrobocie":
                nose = dataArrays.bezrobocie;
                break;
            case "PKB":
                nose = dataArrays.PKB;
                break;
        }

        switch (form.eyebrowInput) {
            case "powierzchnia":
                eyebrow = dataArrays.powierzchnia;
                break;
            case "ludnosc":
                eyebrow = dataArrays.ludnosc;
                break;
            case "urbanizacja":
                eyebrow = dataArrays.urbanizacja;
                break;
            case "bezrobocie":
                eyebrow = dataArrays.bezrobocie;
                break;
            case "PKB":
                eyebrow = dataArrays.PKB;
                break;
        }

        switch (form.headInput) {
            case "powierzchnia":
                head = dataArrays.powierzchnia;
                break;
            case "ludnosc":
                head = dataArrays.ludnosc;
                break;
            case "urbanizacja":
                head = dataArrays.urbanizacja;
                break;
            case "bezrobocie":
                head = dataArrays.bezrobocie;
                break;
            case "PKB":
                head = dataArrays.PKB;
                break;
        }

        return {"eyes": eyes, "mounth": mounth, "nose": nose, "eyebrow": eyebrow, "head": head};
    }
}