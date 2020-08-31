$(document).ready(function(){
    





    var startingMonth = moment().set({ 'year': 2018, 'month': 0, 'date': 1 }); // creazione elemento settato al 01-01-2018

    var year = startingMonth.format('YYYY');
    var month = startingMonth.format('MM');
    var day = startingMonth.format('DD');

    // creazione header con mese e anno tramite handlebars
    var source = $("#title-template").html();
    var template = Handlebars.compile(source);
    var context = { month: startingMonth.format('MMMM'), year: startingMonth.get('year') };
    var html = template(context);
    $("#title").append(html);


    
    // creazione di tutti i giorni del mese tramite handlebars
    source = $("#days-template").html();
    template = Handlebars.compile(source);
    var monthLength = startingMonth.daysInMonth();
    for (var i = 1; i<=monthLength; i++){
        var element = {
            "number": i.toString().padStart(2, '0'),
            "month": startingMonth.format('MMMM'),
            "date": year + "-" + month + "-" + i.toString().padStart(2, '0')
        }
        var html = template(element);
        $("#days").append(html)
    }




    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/holidays",
        method: 'GET',
        data: {
            'year': year,
            'month' : startingMonth.get('month')
        },
        success: function (element) {
            console.log(element);
            for (var i=0; i < element.response.length; i++){
                console.log('prova');
                var holidayDate = element.response[i].date;
                var toEdit = $('[date=' + holidayDate + ']');
                console.log(toEdit);
                toEdit.append(" - " + element.response[i].name);
                toEdit.addClass("red");
            }


        },
        error: function (err) {
            console.log('error:' + err)
        }
    })














})