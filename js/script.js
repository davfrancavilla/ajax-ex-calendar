$(document).ready(function(){
    
    var startingMonth = moment().set({ 'year': 2018, 'month': 0, 'date': 1 }); // creazione elemento settato al 01-01-2018

    createTitle(startingMonth);
    createDaysList(startingMonth);
    apiCall(startingMonth);

    // funzione per passare al mese successivo
    $(".next-month").click(function () {
        if (startingMonth.get('month') != '11') {
            startingMonth.add(1, "month")
            createTitle(startingMonth);
            createDaysList(startingMonth);
            apiCall(startingMonth);
        } else {
            alert('Fine calendario');
        }
    });

    // funzione per passare al mese precedente
    $(".previous-month").click(function () {
        if (startingMonth.get('month') != '0') {
            startingMonth.subtract(1, "month")
            createTitle(startingMonth);
            createDaysList(startingMonth);
            apiCall(startingMonth);
        } else {
            alert('Fine calendario');
        }
    });

    // funzione per creazione header con mese e anno tramite handlebars
    function createTitle(startingMonth){
        $("#title").html("");
        var source = $("#title-template").html();
        var template = Handlebars.compile(source);
        var context = {
            month: startingMonth.format('MMMM'),
            year: startingMonth.get('year')
        };
        var html = template(context);
        $("#title").append(html);
    }

    // funzione per creazione di tutti i giorni del mese tramite handlebars
    function createDaysList(startingMonth){
        $("#days").html("");
        source = $("#days-template").html();
        template = Handlebars.compile(source);
        var monthLength = startingMonth.daysInMonth();
        for (var i = 1; i <= monthLength; i++) {
            var element = {
                "number": i.toString().padStart(2, '0'),
                "month": startingMonth.format('MMMM'),
                "date": startingMonth.format('YYYY') + "-" + startingMonth.format('MM') + "-" + i.toString().padStart(2, '0')
            }
            var html = template(element);
            $("#days").append(html);
        }
    }

    // funzione per chiamata dell'api che restituisce le festività
    function apiCall(startingMonth){
        $.ajax({
            url: "https://flynn.boolean.careers/exercises/api/holidays",
            method: 'GET',
            data: {
                'year': startingMonth.format('YYYY'),
                'month': startingMonth.get('month')
            },
            success: function (element) {
                for (var i = 0; i < element.response.length; i++) {
                    var holidayDate = element.response[i].date;
                    var toEdit = $('[date=' + holidayDate + ']');
                    toEdit.append(" - " + element.response[i].name);
                    toEdit.addClass("red");
                }
            },
            error: function (err) {
                console.log('error:' + err)
            }
        })
    }
})