$(document).ready(function () {

    var chernoff = new ChernoffFaces();
    chernoff.drawMap();

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
            $("#generateFaces").on('click', function (event) {
                chernoff.drawFaces(JSON.parse(contents).wojewodztwa);
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

});