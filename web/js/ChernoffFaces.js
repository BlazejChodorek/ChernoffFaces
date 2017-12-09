/**
 * @constructor
 */
function ChernoffFaces() {

    /**
     * Uruchomienie aplikacji.
     */
    this.run = function () {
        drawMap();
        generateFileInput();
    };

    /**
     * Funkcja rysująca mapę z pliku "map.png"
     */
    function drawMap() {

        $(".chernoff-map-container").html(
            "<canvas id=\"mapCanvas\" width=\"660\" height=\"615\"></canvas>"
        );

        var map = new Image();
        map.src = "map.png";

        var dynamicCanvas = document.createElement("canvas");
        var dynamicContext = dynamicCanvas.getContext("2d");
        dynamicCanvas.height = "620";
        dynamicCanvas.width = "660";

        var canvas = document.getElementById("mapCanvas");
        var ctx = canvas.getContext("2d");

        map.onload = function () {
            dynamicContext.drawImage(map, 0, 0);

            ctx = ctx.drawImage(dynamicCanvas, 0, 0);
            // window.open(canvas.toDataURL());
        };
    }

    /**
     * Funkcja generująca input do wczytywania pliku .json oraz go wczytująca.
     */
    function generateFileInput() {

        /**
         * Input do wczytania pliku, akceptowane są tylko pliki z rozszerzeniem .json.
         */
        $(".chernoff-input-file-container").html(
            "<ul class=\"list-group\">\n" +
            "<li class=\"list-group-item\">\n" +
            "<label class=\"fileContainer\">\n" +
            "<button type=\"button\" class=\"btn btn-primary btn-block\">Wczytaj nowy plik</button>\n" +
            "<input type=\"file\" id=\"file-input\" accept=\".json\"/>\n" +
            "</label>\n" +
            "<div class=\"alert alert-success alert-dismissable fade in hidden\" id=\"alertFile-success\">\n" +
            "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
            "<strong>Plik wczytano poprawnie.</strong>\n" +
            "</div>\n" +
            "<div class=\"alert alert-danger alert-dismissable fade in hidden\" id=\"alertFile-danger\">\n" +
            "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
            "<strong>Zapomniałeś o wczytaniu pliku.</strong>\n" +
            "</div>\n" +
            "</li>" +
            "</ul>"
        );

        /**
         * Funkcja do wczytania pliku .json.
         * Po wczytaniu pliku zostaje generowany formularz.
         * @param e
         */
        function readSingleFile(e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#alertFile-success').removeClass('hidden');

                if ($('#alertFile-success').hasClass('file-loaded')) {
                    $('#alertFile-success').addClass('hidden');
                }
                $('#alertFile-danger').addClass('hidden');
                $('#alertFile-success').addClass('file-loaded');

                contents = e.target.result;
                generateForm(JSON.parse(contents).wojewodztwa);
                $("#generateFaces").on('click', function (event) {
                    drawFaces(JSON.parse(contents).wojewodztwa);
                });
            };
            reader.readAsText(file);
        }

        document.getElementById('file-input').addEventListener('change', readSingleFile, false);

        $("#generateFaces").on('click', function (event) {

            if ($('#alertFile-success').hasClass('hidden')) {
                $('#alertFile-danger').removeClass('hidden');
            }
        });
    }

    /**
     * Funkcja dynamicznie generująca formularz na podstawie pliku .json.
     */
    function generateForm(data) {

        /**
         * Formularz.
         */
        $(".chernoff-form-container").html(
            "<ul class=\"list-group\">\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-eyes\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>oczy:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-9 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"eyes\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-mounth\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>usta:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-9 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"mounth\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-nose\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>nos:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-9 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"nose\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-eyebrow\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>brwi:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-9 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"eyebrow\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-head\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>głowa:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-9 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"head\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <button type=\"button\" id=\"generateFaces\" class=\"btn btn-primary btn-block\">\n" +
            "                            Generuj twarze na mapie\n" +
            "                        </button>\n" +
            "                    </li>" +
            "</ul>"
        );

        /**
         * Generowanie opcji w selectach.
         */
        var options = getOptions(data, true);

        var content = document.getElementsByClassName("chernoff-form").innerHTML;
        content += "<option value=\"null\">\n";

        for (var i = 0; i < options.length; i++)
            content += "<option value=" + options[i] + ">" + options[i] + "\n";

        $(".form-control").html(content);
    }

    /**
     * Funkcja rysująca wszystkie twarze na mapie.
     * @param data - JSON z danymi.
     */
    function drawFaces(data) {

        var form = getFormValuesbyId("eyes", "mounth", "nose", "eyebrow", "head");

        if (form.validate) {

            var dataArrays = getDataArrays(data);
            var parameters = getParameters(data, dataArrays, form.values);

            var map = new Image();
            map.src = "map.png";

            var dynamicCanvas = document.createElement("canvas");
            var dynamicContext = dynamicCanvas.getContext("2d");
            dynamicCanvas.height = "620";
            dynamicCanvas.width = "660";

            var canvas = document.getElementById("mapCanvas");
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
    }

    /**
     * Funkcja dynamicznie tworząca tablice z danymi.
     * @param data - JSON z danymi.
     * @return {{}} - Tablice z danymi.
     */
    function getDataArrays(data) {

        var dataArrays = {};
        var options = getOptions(data, false);

        for (var i = 0; i < options.length; i++)
            dataArrays[options[i]] = [];

        for (var i = 0; i < options.length; i++) {
            for (var j = 0; j < data.length; j++) {
                dataArrays[options[i]][j] = data[j][options[i]];
            }
        }

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
    function getParameters(data, dataArrays, form) {
        var eyes;
        var mounth;
        var nose;
        var eyebrow;
        var head;
        var options = getOptions(data, false);

        for (var i = 0; i < options.length; i++) {
            if (form.eyesInput == options[i])
                eyes = dataArrays[options[i]];

            if (form.mounthInput == options[i])
                mounth = dataArrays[options[i]];

            if (form.noseInput == options[i])
                nose = dataArrays[options[i]];

            if (form.eyebrowInput == options[i])
                eyebrow = dataArrays[options[i]];

            if (form.headInput == options[i])
                head = dataArrays[options[i]];
        }

        return {"eyes": eyes, "mounth": mounth, "nose": nose, "eyebrow": eyebrow, "head": head};
    }

    /**
     * Funkcja pobierająca klucze z obiektu .json, które będą potrzebne do wygenerowania opcji w selectach.
     */
    function getOptions(data, toDisplay) {

        if (typeof Object.keys !== "function") {
            (function () {
                var hasOwn = Object.prototype.hasOwnProperty;
                Object.keys = Object_keys;

                function Object_keys(obj) {
                    var keys = [], name;
                    for (name in obj) {
                        if (hasOwn.call(obj, name)) {
                            keys.push(name.toString());
                        }
                    }
                    return keys;
                }
            })();
        }

        var originalOptions = Object.keys(data[0]);
        originalOptions.splice(0, 2);

        var optionsForArrays = [];
        for (var i = 0; i < originalOptions.length; i++) {
            optionsForArrays.push(originalOptions[i].toString().replace(/\s/g, ''));
        }

        if (toDisplay) return originalOptions;
        return optionsForArrays;
    }

}