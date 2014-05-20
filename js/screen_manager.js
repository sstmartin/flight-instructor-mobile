var ORDER = 0;
var STAGE = 1;
var TASK = 2;
var GND = 3;
var FLIGHT = 4;
var PARENT = 5;

/*
 * init_screen(type)
 * Purpose:
 * Display the appropriate HTML divs for the given screen type.
 */
function init_screen(type){
    switch (type){
        case 'n':
            document.getElementById("n_footer").style.visibility="visible";
            document.getElementById("m_footer").style.visibility="hidden";
            document.getElementById("l_footer").style.visibility="hidden";
            
            document.getElementById("m_main").style.visibility="hidden";
            
            break;
        case 'm':
            document.getElementById("n_footer").style.visibility="hidden";
            document.getElementById("m_footer").style.visibility="visible";
            document.getElementById("l_footer").style.visibility="hidden";
            
            document.getElementById("m_main").style.visibility="visible";
            
            break;
        case 'l':
            document.getElementById("n_footer").style.visibility="hidden";
            document.getElementById("m_footer").style.visibility="hidden";
            document.getElementById("l_footer").style.visibility="visible";
            
            document.getElementById("m_main").style.visibility="hidden";
            
            break;
    }
}

$(document).ready(function() {
    
    drop_table();

    //Refreshes the task List Frame
    function select_tasks() {
        tasks("SELECT * FROM tasks ORDER BY my_order ASC;", function(get_tasks) {
            current_tasks = get_tasks;

            //Resets the option dropdown
            $('#m_add_parent option').remove();
            $('#m_add_parent').append($('<option></option>')
                   .text('None'));

            //Resets the table
            $('#m_entry_table tbody tr').remove();

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
                        '<td><input type="checkbox" id="m_delete_' + current_tasks[i][ORDER] + '" value="0" onClick= "this.value ^= true" class = "delete_tasks"></td></tr>');
            }

            //Updates dropdown window
            $('#m_add_parent').val('None');
            $('#m_add_parent').val('None').change();
        });
    }

    //When You Click Add task
    $('#m_add').click(function() {
        //Grabs values for add table
	order = $('#m_add_order').val();
        stage = $('#m_add_stage').val();
        task = $('#m_add_task').val();
        gnd = $('#m_add_gnd').val();
        flight = $('#m_add_flight').val();
        parent = $('#m_add_parent').val();

	//Check for actual input
	if (order != '' && stage != ''){
        	add_task(order,stage,task,gnd, flight, parent);
	}

        //Resets Values to 0 after added
	$('#m_add_order').val('');
        $('#m_add_stage').val('');
        $('#m_add_task').val('');
        $('#m_add_gnd').prop('checked', false);
        $('#m_add_gnd').val('0');
        $('#m_add_flight').prop('checked', false);
        $('#m_add_flight').val('0');
        select_tasks();

    });

    //task List Delete
    $('#m_delete').click(function() {
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: 'Warning',
            headerClose: true,
            buttonPrompt: 'Delete task(s)?',
            buttons: {
                'OK': {
                    click: function() {
                        $('#buttonoutput').text('OK');

                        $('.delete_tasks').each(function() {
                            if ($(this).val() === '1') {

                                delete_task($(this).attr("id").substring(9));
                            }
                        });

                        select_tasks();
                    }
                },
                'Cancel': {
                    click: function() {
                        $('#buttonoutput').text('Cancel');
                    },
                    icon: "delete",
                    theme: "c"
                }
            }
        });
    });
});