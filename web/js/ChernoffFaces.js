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
            "<label class=\"fileContainer\">\n" +
            "<button type=\"button\" class=\"btn btn-primary btn-block btn-sm\">" +
            "<span class=\"glyphicon glyphicon-open-file\"></span>" +
            "Wczytaj nowy plik .json" +
            "</button>\n" +
            "<input type=\"file\" id=\"file-input\" accept=\".json\"/>\n" +
            "</label>\n" +
            "<div class=\"alert alert-success alert-dismissable fade in hidden\" id=\"alertFile-success\">\n" +
            "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
            "<strong>Plik wczytano poprawnie</strong> <span class=\"glyphicon glyphicon-ok\"></span>\n" +
            "</div>\n" +
            "<div class=\"alert alert-danger alert-dismissable fade in hidden\" id=\"alertFile-danger\">\n" +
            "<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a>\n" +
            "<strong>Zapomniałeś o wczytaniu pliku.</strong>\n" +
            "</div>\n"
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
            "                            <div class=\"col-sm-7 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"eyes\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-2 panel-list-item\">\n" +
            "                                  <button type=\"button\" class=\"info btn btn-default btn-xs disabled\" id=\"eyes-info\">\n" +
            "                                       <span class=\"glyphicon glyphicon-info-sign\"></span>\n" +
            "                                   </button>" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "\n" +
            "                    <li class=\"list-group-item\">\n" +
            "                        <span class=\"error\" id=\"error-mouth\"></span>\n" +
            "                        <div class=\"row\">\n" +
            "                            <div class=\"col-sm-1\" style=\"padding: 5px; padding-right: 40px\">\n" +
            "                                <h4>usta:</h4>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-7 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"mouth\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-2 panel-list-item\">\n" +
            "                                  <button type=\"button\" class=\"info btn btn-default btn-xs disabled\" id=\"mouth-info\">\n" +
            "                                       <span class=\"glyphicon glyphicon-info-sign\"></span>\n" +
            "                                   </button>" +
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
            "                            <div class=\"col-sm-7 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"nose\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-2 panel-list-item\">\n" +
            "                                  <button type=\"button\" class=\"info btn btn-default btn-xs disabled\" id=\"nose-info\">\n" +
            "                                       <span class=\"glyphicon glyphicon-info-sign\"></span>\n" +
            "                                   </button>" +
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
            "                            <div class=\"col-sm-7 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"eyebrow\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-2 panel-list-item\">\n" +
            "                                  <button type=\"button\" class=\"info btn btn-default btn-xs disabled\" id=\"eyebrow-info\">\n" +
            "                                       <span class=\"glyphicon glyphicon-info-sign\"></span>\n" +
            "                                   </button>" +
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
            "                            <div class=\"col-sm-7 panel-list-item\">\n" +
            "                                <form class=\"chernoff-form\">\n" +
            "                                    <select class=\"form-control\" id=\"head\"></select>\n" +
            "                                </form>\n" +
            "                            </div>\n" +
            "                            <div class=\"col-sm-2 panel-list-item\">\n" +
            "                                  <button type=\"button\" class=\"info btn btn-default btn-xs disabled\" id=\"head-info\">\n" +
            "                                       <span class=\"glyphicon glyphicon-info-sign\"></span>\n" +
            "                                   </button>" +
            "                            </div>\n" +
            "                        </div>\n" +
            "                    </li>\n" +
            "</ul>" +
            "                        <button type=\"button\" id=\"generateFaces\" class=\"btn btn-primary btn-block\">\n" +
            "                            <span class=\"glyphicon glyphicon-refresh\"></span> \n" +
            "                            Generuj twarze na mapie\n" +
            "                        </button>\n"
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

        $("#generateFaces").on('click', function (event) {

            if ($('#eyes-info').hasClass('btn-primary')) {
                $('#eyes-info').removeClass('btn-primary');
                $('#eyes-info').addClass('btn-default');
            }
            if ($('#mouth-info').hasClass('btn-primary')) {
                $('#mouth-info').removeClass('btn-primary');
                $('#mouth-info').addClass('btn-default');
            }
            if ($('#nose-info').hasClass('btn-primary')) {
                $('#nose-info').removeClass('btn-primary');
                $('#nose-info').addClass('btn-default');
            }
            if ($('#eyebrow-info').hasClass('btn-primary')) {
                $('#eyebrow-info').removeClass('btn-primary');
                $('#eyebrow-info').addClass('btn-default');
            }
            if ($('#head-info').hasClass('btn-primary')) {
                $('#head-info').removeClass('btn-primary');
                $('#head-info').addClass('btn-default');
            }

            $('.info').removeClass('disabled');
            $('#map-legend-eyes').addClass('hidden');
            $('#map-legend-mouth').addClass('hidden');
            $('#map-legend-nose').addClass('hidden');
            $('#map-legend-eyebrow').addClass('hidden');
            $('#map-legend-head').addClass('hidden');
        });

        $("#eyes-info").on('click', function (event) {

            if ($('#eyes-info').hasClass('clicked')) {

                $('#eyes-info').removeClass('clicked');
                $('#map-legend-eyes').addClass('hidden');
                $('#eyes-info').addClass('btn-default');
                $('#eyes-info').removeClass('btn-primary');
            } else if ($('#eyes-info').hasClass('disabled')) {
            } else {
                $('#eyes-info').addClass('clicked');
                $('#map-legend-eyes').removeClass('hidden');
                $('#eyes-info').removeClass('btn-default');
                $('#eyes-info').addClass('btn-primary');
            }
        });

        $("#mouth-info").on('click', function (event) {

            if ($('#mouth-info').hasClass('clicked')) {

                $('#mouth-info').removeClass('clicked');
                $('#map-legend-mouth').addClass('hidden');
                $('#mouth-info').addClass('btn-default');
                $('#mouth-info').removeClass('btn-primary');
            } else if ($('#mouth-info').hasClass('disabled')) {
            } else {
                $('#mouth-info').addClass('clicked');
                $('#map-legend-mouth').removeClass('hidden');
                $('#mouth-info').removeClass('btn-default');
                $('#mouth-info').addClass('btn-primary');
            }
        });

        $("#nose-info").on('click', function (event) {

            if ($('#nose-info').hasClass('clicked')) {

                $('#nose-info').removeClass('clicked');
                $('#map-legend-nose').addClass('hidden');
                $('#nose-info').addClass('btn-default');
                $('#nose-info').removeClass('btn-primary');
            } else if ($('#nose-info').hasClass('disabled')) {
            } else {
                $('#nose-info').addClass('clicked');
                $('#map-legend-nose').removeClass('hidden');
                $('#nose-info').removeClass('btn-default');
                $('#nose-info').addClass('btn-primary');
            }
        });

        $("#eyebrow-info").on('click', function (event) {

            if ($('#eyebrow-info').hasClass('clicked')) {

                $('#eyebrow-info').removeClass('clicked');
                $('#map-legend-eyebrow').addClass('hidden');
                $('#eyebrow-info').addClass('btn-default');
                $('#eyebrow-info').removeClass('btn-primary');
            } else if ($('#eyebrow-info').hasClass('disabled')) {
            } else {
                $('#eyebrow-info').addClass('clicked');
                $('#map-legend-eyebrow').removeClass('hidden');
                $('#eyebrow-info').removeClass('btn-default');
                $('#eyebrow-info').addClass('btn-primary');
            }
        });

        $("#head-info").on('click', function (event) {

            if ($('#head-info').hasClass('clicked')) {

                $('#head-info').removeClass('clicked');
                $('#map-legend-head').addClass('hidden');
                $('#head-info').addClass('btn-default');
                $('#head-info').removeClass('btn-primary');
            } else if ($('#head-info').hasClass('disabled')) {
            } else {
                $('#head-info').addClass('clicked');
                $('#map-legend-head').removeClass('hidden');
                $('#head-info').removeClass('btn-default');
                $('#head-info').addClass('btn-primary');
            }
        });
    }

    /**
     * Funkcja rysująca wszystkie twarze na mapie.
     * @param data - JSON z danymi.
     */
    function drawFaces(data) {

        var form = getFormValuesbyId("eyes", "mouth", "nose", "eyebrow", "head");

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
                        /*mouth*/getCompartment(parameters.mouth, parseInt(id)));
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
     * @param {string} mouthId - id z formularza.
     * @param {string} noseId - id z formularza.
     * @param {string} eyebrowId - id z formularza.
     * @param {string} headId - id z formularza.
     * @return {{values: {}, validate: {}}} - Dane z formularza.
     */
    function getFormValuesbyId(eyesId, mouthId, noseId, eyebrowId, headId) {

        event.preventDefault();
        var values = {};
        values.eyesInput = $('#' + eyesId).val();
        values.mouthInput = $('#' + mouthId).val();
        values.noseInput = $('#' + noseId).val();
        values.eyebrowInput = $('#' + eyebrowId).val();
        values.headInput = $('#' + headId).val();
        $(".error").text("");

        var validate = {};
        if (values.eyesInput === "null") {
            validate.eyesInput = "Wybierz jakąś opcję";
            $("#error-eyes").text(validate.eyesInput);
        }

        if (values.mouthInput === "null") {
            validate.mouthInput = "Wybierz jakąś opcję";
            $("#error-mouth").text(validate.mouthInput);
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
     * @param {number} mouthType - Typ ust (1, 2, 3).
     */
    function drawFace(ctx, x, y, headType, eyebrowType, eyesType, noseType, mouthType) {

        drawHead(ctx, x, y, headType);
        drawEyebrow(ctx, x, y, eyebrowType);
        drawEyes(ctx, x, y, eyesType);
        drawNose(ctx, x, y, noseType);
        drawMouth(ctx, x, y, mouthType);
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
     * @return {{eyes: *, mouth: *, nose: *, eyebrow: *, head: *}} - JSON z informacją do jakiej części twarzy jakie dane zostały przypisane.
     */
    function getParameters(data, dataArrays, form) {
        var eyes;
        var mouth;
        var nose;
        var eyebrow;
        var head;
        var eyesUnit;
        var mouthUnit;
        var noseUnit;
        var eyebrowUnit;
        var headUnit;
        var eyesOption;
        var mouthOption;
        var noseOption;
        var eyebrowOption;
        var headOption;
        var options = getOptions(data, false);

        for (var i = 0; i < options.length; i++) {
            if (form.eyesInput == options[i]) {
                eyes = dataArrays[options[i]];
                eyesUnit = getDataUnit(options[i]);
                eyesOption = options[i];
            }

            if (form.mouthInput == options[i]) {
                mouth = dataArrays[options[i]];
                mouthUnit = getDataUnit(options[i]);
                mouthOption = options[i];
            }

            if (form.noseInput == options[i]) {
                nose = dataArrays[options[i]];
                noseUnit = getDataUnit(options[i]);
                noseOption = options[i];
            }

            if (form.eyebrowInput == options[i]) {
                eyebrow = dataArrays[options[i]];
                eyebrowUnit = getDataUnit(options[i]);
                eyebrowOption = options[i];
            }

            if (form.headInput == options[i]) {
                head = dataArrays[options[i]];
                headUnit = getDataUnit(options[i]);
                headOption = options[i];
            }

        }

        var parameters = {
            "eyes": eyes,
            "mouth": mouth,
            "nose": nose,
            "eyebrow": eyebrow,
            "head": head
        };

        var dataUnits = {
            "eyes": eyesUnit,
            "mouth": mouthUnit,
            "nose": noseUnit,
            "eyebrow": eyebrowUnit,
            "head": headUnit
        };

        var dataOptions = {
            "eyes": eyesOption,
            "mouth": mouthOption,
            "nose": noseOption,
            "eyebrow": eyebrowOption,
            "head": headOption
        };

        generateMapLegend(parameters, dataUnits, dataOptions);

        return parameters;
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

    /**
     * @param str - Nazwa danej.
     * @return {string} - Jednostka danej.
     */
    function getDataUnit(str) {
        String.toString();
        return str.substring(str.lastIndexOf("[") + 1, str.lastIndexOf("]"));
    }

    /**
     * Funkcja generująca legendę mapy.
     * @param param - Tablica z informacją do jakiej częsci twarzy jakie dane zostały przypisane.
     */
    function generateMapLegend(param, units, options) {


        $(".chernoff-map-legend-container").html(
            "            <ul class=\"list-group\">\n" +
            "\n" +
            "                <li class=\"list-group-item hidden\" id=\"map-legend-eyes\">\n" +
            "                    <div class=\"row\">\n" +
            "                        <h4 class=\"map-legend-title\" id=\"eyes-map-legend-title\"></h4>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyes1.png\" alt=\"eyes1\">\n" +
            "                            <span id=\"eyes-map-legend-1\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyes2.png\" alt=\"eyes2\">\n" +
            "                            <span id=\"eyes-map-legend-2\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyes3.png\" alt=\"eyes3\">\n" +
            "                            <span id=\"eyes-map-legend-3\"></span>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </li>\n" +
            "\n" +
            "                <li class=\"list-group-item hidden\" id=\"map-legend-mouth\">\n" +
            "                    <div class=\"row\">\n" +
            "                        <h4 class=\"map-legend-title\" id=\"mouth-map-legend-title\"></h4>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/mouth1.png\" alt=\"mouth1\">\n" +
            "                            <span id=\"mouth-map-legend-1\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/mouth2.png\" alt=\"mouth2\">\n" +
            "                            <span id=\"mouth-map-legend-2\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/mouth3.png\" alt=\"mouth3\">\n" +
            "                            <span id=\"mouth-map-legend-3\"></span>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </li>\n" +
            "\n" +
            "                <li class=\"list-group-item hidden\" id=\"map-legend-nose\">\n" +
            "                    <div class=\"row\">\n" +
            "                        <h4 class=\"map-legend-title\" id=\"nose-map-legend-title\"></h4>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/nose1.png\" alt=\"nose1\">\n" +
            "                            <span id=\"nose-map-legend-1\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/nose2.png\" alt=\"nose2\">\n" +
            "                            <span id=\"nose-map-legend-2\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/nose3.png\" alt=\"nose3\">\n" +
            "                            <span id=\"nose-map-legend-3\"></span>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </li>\n" +
            "\n" +
            "                <li class=\"list-group-item hidden\" id=\"map-legend-eyebrow\">\n" +
            "                    <div class=\"row\">\n" +
            "                        <h4 class=\"map-legend-title\" id=\"eyebrow-map-legend-title\"></h4>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyebrows1.png\" alt=\"eyebrows1\">\n" +
            "                            <span id=\"eyebrow-map-legend-1\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyebrows2.png\" alt=\"eyebrows2\">\n" +
            "                            <span id=\"eyebrow-map-legend-2\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/eyebrows3.png\" alt=\"eyebrows3\">\n" +
            "                            <span id=\"eyebrow-map-legend-3\"></span>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </li>\n" +
            "\n" +
            "                <li class=\"list-group-item hidden\" id=\"map-legend-head\">\n" +
            "                    <div class=\"row\">\n" +
            "                        <h4 class=\"map-legend-title\" id=\"head-map-legend-title\"></h4>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/head1.png\" alt=\"head1\">\n" +
            "                            <span id=\"head-map-legend-1\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/head2.png\" alt=\"head2\">\n" +
            "                            <span id=\"head-map-legend-2\"></span>\n" +
            "                        </div>\n" +
            "                        <div>\n" +
            "                            <img src=\"img/head3.png\" alt=\"head3\">\n" +
            "                            <span id=\"head-map-legend-3\"></span>\n" +
            "                        </div>\n" +
            "                    </div>\n" +
            "                </li>\n" +
            "\n" +
            "            </ul>"
        );

        var eyes = param.eyes;
        var mouth = param.mouth;
        var nose = param.nose;
        var eyebrow = param.eyebrow;
        var head = param.head;

        var eyesIndexes = getIndexes(eyes);
        var mouthIndexes = getIndexes(mouth);
        var noseIndexes = getIndexes(nose);
        var eyebrowIndexes = getIndexes(eyebrow);
        var headIndexes = getIndexes(head);

        var eyesUnit = units.eyes;
        var mouthUnit = units.mouth;
        var noseUnit = units.nose;
        var eyebrowUnit = units.eyebrow;
        var headUnit = units.head;

        var eyesOption = options.eyes;
        var mouthOption = options.mouth;
        var noseOption = options.nose;
        var eyebrowOption = options.eyebrow;
        var headOption = options.head;

        $("#eyes-map-legend-title").html(eyesOption);
        $("#mouth-map-legend-title").html(mouthOption);
        $("#nose-map-legend-title").html(noseOption);
        $("#eyebrow-map-legend-title").html(eyebrowOption);
        $("#head-map-legend-title").html(headOption);

        $("#eyes-map-legend-1").html(eyesIndexes.index0 + " " + eyesUnit + " - " + eyesIndexes.index1 + " " + eyesUnit);
        $("#eyes-map-legend-2").html(eyesIndexes.index1 + " " + eyesUnit + " - " + eyesIndexes.index2 + " " + eyesUnit);
        $("#eyes-map-legend-3").html(eyesIndexes.index2 + " " + eyesUnit + " - " + eyesIndexes.index3 + " " + eyesUnit);

        $("#mouth-map-legend-1").html(mouthIndexes.index0 + " " + mouthUnit + " - " + mouthIndexes.index1 + " " + mouthUnit);
        $("#mouth-map-legend-2").html(mouthIndexes.index1 + " " + mouthUnit + " - " + mouthIndexes.index2 + " " + mouthUnit);
        $("#mouth-map-legend-3").html(mouthIndexes.index2 + " " + mouthUnit + " - " + mouthIndexes.index3 + " " + mouthUnit);

        $("#nose-map-legend-1").html(noseIndexes.index0 + " " + noseUnit + " - " + noseIndexes.index1 + " " + noseUnit);
        $("#nose-map-legend-2").html(noseIndexes.index1 + " " + noseUnit + " - " + noseIndexes.index2 + " " + noseUnit);
        $("#nose-map-legend-3").html(noseIndexes.index2 + " " + noseUnit + " - " + noseIndexes.index3 + " " + noseUnit);

        $("#eyebrow-map-legend-1").html(eyebrowIndexes.index0 + " " + eyebrowUnit + " - " + eyebrowIndexes.index1 + " " + eyebrowUnit);
        $("#eyebrow-map-legend-2").html(eyebrowIndexes.index1 + " " + eyebrowUnit + " - " + eyebrowIndexes.index2 + " " + eyebrowUnit);
        $("#eyebrow-map-legend-3").html(eyebrowIndexes.index2 + " " + eyebrowUnit + " - " + eyebrowIndexes.index3 + " " + eyebrowUnit);

        $("#head-map-legend-1").html(headIndexes.index0 + " " + headUnit + " - " + headIndexes.index1 + " " + headUnit);
        $("#head-map-legend-2").html(headIndexes.index1 + " " + headUnit + " - " + headIndexes.index2 + " " + headUnit);
        $("#head-map-legend-3").html(headIndexes.index2 + " " + headUnit + " - " + headIndexes.index3 + " " + headUnit);
    }

    /**
     * @param array
     * @return {{index0: *, index1: *, index2: *, index3: *}}
     */
    function getIndexes(array) {

        var arr = new Array();

        for (var i = 0; i < array.length; i++) {
            arr.push(array[i]);
        }

        arr.sort(function (a, b) {
            return a - b
        });

        var index0 = arr[0];
        var index1 = arr[Math.round(arr.length / 3)];
        var index2 = arr[(Math.round(arr.length / 3)) * 2];
        var index3 = arr[arr.length - 1];

        return {"index0": index0, "index1": index1, "index2": index2, "index3": index3};
    }

}