//Define Variables
var ORDER = 0;
var STAGE = 1;
var TASK = 2;
var GND = 3;
var FLIGHT = 4;
var PARENT = 5;
var MASTER_QUERY = "SELECT * FROM tasks ORDER BY my_order ASC;";

function screen(type) {
    switch (type) {
    case 'l':
        document.getElementById("l_footer").style.display = '';
        document.getElementById("m_footer").style.display = 'none';
        document.getElementById("m_main").style.display = 'none';
        document.getElementById("n_footer").style.display = 'none';
        document.getElementById("n_main").style.display = 'none';
        break;
    case 'm':
        document.getElementById("l_footer").style.display = 'none';
        document.getElementById("m_footer").style.display = '';
        document.getElementById("m_main").style.display = '';
        document.getElementById("n_footer").style.display = 'none';
        document.getElementById("n_main").style.display = 'none';
        break;
    case 'n':
        document.getElementById("l_footer").style.display = 'none';
        document.getElementById("m_footer").style.display = 'none';
        document.getElementById("m_main").style.display = 'none';
        document.getElementById("n_footer").style.display = '';
        document.getElementById("n_main").style.display = '';

        break;
    }
}

function reset(type) {
    switch (type) {
    case 'm':
        $('#m_add_order').val('');
        $('#m_add_stage').val('');
        $('#m_add_task').val('');
        $('#m_add_gnd').prop('checked', false);
        $('#m_add_gnd').val('0');
        $('#m_add_flight').prop('checked', false);
        $('#m_add_flight').val('0');
        $('#m_add_parent').val('None');
        $('#m_add_parent').val('None').change();
        $('.m_select').each(function () {
            $(this).prop('checked', false);
            $(this).val('0');
        });
        break;
    case 'n':
        $('#n_name').val('');
        $('#n_date').val('');
        $('.n_gnd').each(function () {
            $(this).prop('checked', false);
            $(this).val('0');
        });
        $('.n_flight').each(function () {
            $(this).prop('checked', false);
            $(this).val('0');
        });
        $('.n_gnd').each(function () {
            $(this).prop('checked', false);
            $(this).val('0');
        });
        $('.n_flight_date').each(function () {
            $(this).val('0');
        });
        $('.n_gnd_date').each(function () {
            $(this).val('0');
        });
        $('.n_remarks').each(function () {
            $(this).val('');
        });
        $('.n_select').each(function () {
            $(this).prop('checked', false);
            $(this).val('0');
        });
        break;
    }
}

function submit(type) {
    switch (type) {
    case 'm':
        order = $('#m_add_order').val();
        stage = $('#m_add_stage').val();
        task = $('#m_add_task').val();
        gnd = $('#m_add_gnd').val();
        flight = $('#m_add_flight').val();
        parent = $('#m_add_parent').val();

        //Check for actual input
        if (order != '' && stage != '') {
            add_task(order, stage, task, gnd, flight, parent);
        }

        reset('m');
        break;
    case 'n':
        $('.n_select').each(function () {
            if ($(this).val() === '1') {
                user = $('#n_name').val();
                order = $(this).attr("id").substring(9).replace(/(:|\.|\[|\])/g, "\\$1");
                complete_gnd = $('#n_gnd_' + order).val();
                date_gnd = $('#n_gnd_date_' + order).val();
                complete_flight = $('#n_flight_' + order).val();
                date_flight = $('#n_flight_date_' + order).val();
                remarks = $('#n_remarks_' + order).val();
                order = $(this).attr("id").substring(9);
                if ((date_gnd !== '' || date_flight !== '') && user !== '') {
                    add_entry(user, order, complete_gnd, date_gnd, complete_flight, date_flight, remarks);
                }
            }
        });
        reset('n');
        break;
    }
    select_tasks();
}

function select_tasks() {
    tasks(MASTER_QUERY, function (get_tasks) {
        current_tasks = get_tasks;

        //Resets the option dropdown
        $('#m_add_parent option').remove();
        $('#m_add_parent').append($('<option></option>')
            .text('None'));

        //Resets the table
        $('#m_entry_table tbody tr').remove();
        $('#n_form tbody tr').remove();

        //Repopulates the table and dropbown
        for (var i = 0; i < current_tasks.length; i++) {

            if (current_tasks[i][PARENT] === 'None') {
                $('#m_add_parent').append($('<option></option>')
                    .text(current_tasks[i][TASK]));
            }

            $('#m_entry_table tbody').append(
                '<tr><td>' + current_tasks[i][ORDER] + '</td>' +
                '<td>' + current_tasks[i][STAGE] + '</td>' +
                '<td>' + current_tasks[i][TASK] + '</td>' +
                '<td>' + current_tasks[i][GND] + '</td>' +
                '<td>' + current_tasks[i][FLIGHT] + '</td>' +
                '<td>' + current_tasks[i][PARENT] + '</td>' +
                '<td><input type="checkbox" id="m_select_' + current_tasks[i][ORDER] + '" value="0" onClick= "this.value ^= true" class = "m_select"></td></tr>');

            $('#n_form tbody').append(
                '<tr><td>' + current_tasks[i][STAGE] + '</td>' +
                '<td>' + current_tasks[i][TASK] + '</td>' +
                '<td>' + current_tasks[i][GND] + '</td>' +
                '<td><input type="checkbox" id="n_gnd_' + current_tasks[i][ORDER] + '" value="0" onClick= "this.value ^= true" class = "n_gnd"></td>' +
                '<td><div data-role="fieldcontain"><input type="date" name="name" class = "n_gnd_date" id="n_gnd_date_' +

                current_tasks[i][ORDER] + '"value=""/></div></td>' +
                '<td>' + current_tasks[i][FLIGHT] + '</td>' +
                '<td><input type="checkbox" id="n_flight_' + current_tasks[i][ORDER] + '" value="0" onClick= "this.value ^= true" class = "n_flight"></td>' +
                '<td><div data-role="fieldcontain"><input type="date" name="name" class = "n_flight_date" id="n_flight_date_'

                + current_tasks[i][ORDER] + '"value=""/></div></td>' +
                '<td><input type="text" class = "n_remarks" id="n_remarks_' + current_tasks[i][ORDER] + '"></td>' +
                '<td><input type="checkbox" id="n_select_' + current_tasks[i][ORDER] + '" value="0" onClick= "this.value ^= true" class = "n_select"></td></tr>');
        }
    });
}
$(document).ready(function () {
	select_tasks();
    $('#m_delete').click(function () {
       $('.m_select').each(function () {
                            if ($(this).val() === '1') {

                                delete_task($(this).attr("id").substring(9));
                            }
                        });

                        select_tasks();
    });
});