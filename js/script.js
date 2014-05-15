$(document).ready(function() {

    //Function calls to initialize data
    drop_table();
    //update_event_list();

    //Refreshes the Event List Frame
    function select_events() {
        events("SELECT * FROM EVENTS;", function(get_events) {
            current_events = get_events;

            //Resets the option dropdown
            $('#m_add_parent option').remove();
            $('#m_add_parent').append($('<option></option>')
                    .text('No Parent'));

            //Resets the table
            $('#m_entry_table tbody tr').remove();

            //Repopulates the table and dropbown
            for (var i = 0; i < current_events.length; i++) {

                if (current_events[i][3] === 'No Parent') {
                    $('#m_add_parent').append($('<option></option>')
                            .text(current_events[i][0]));
                }

                $('#m_entry_table tbody').append(
                        '<tr><td>' + current_events[i][4] + '</td>' +
                        '<td>' + current_events[i][0] + '</td>' +
                        '<td>' + current_events[i][1] + '</td>' +
                        '<td>' + current_events[i][2] + '</td>' +
                        '<td>' + current_events[i][3] + '</td>' +
                        '<td><input type="checkbox" id="m_delete_' + current_events[i][0] + '" value="0" onClick= "this.value ^= true" class="deletestuff"></td></tr>');
            }

            //FIXES DROP DOWN DON'T TOUCH
            $('#m_add_parent').val('No Parent');
            //$('#m_add_parent').val('No Parent');
            +$('#m_add_parent').val('No Parent').change();
        });
    }

    //When You Click Add Event
    $('#m-add').click(function() {
        //Grabs values for add table
        stage = $('#m_add_stage').val();
        task = $('#m_add_task').val();
        gnd = $('#m_add_gnd').val();
        flight = $('#m_add_flight').val();
        parent = $('#m_add_parent').val();

        add_event(task, gnd, flight, parent, stage);

        //Resets Values to 0 after added
        $('#m_add_stage').val('');
        $('#m_add_task').val('');
        $('#m_add_gnd').prop('checked', false);
        $('#m_add_gnd').val('0');
        $('#m_add_flight').prop('checked', false);
        $('#m_add_flight').val('0');
        select_events();

    });

    $(':checkbox').click(function() {
        if ($(this).val() === '1') {
            $(this).val('0');
        }
        else {
            $(this).val('1');
        }
    });

    //Event List Delete
    $('#m-delete').click(function() {
        $('<div>').simpledialog2({
            mode: 'button',
            headerText: 'Warning',
            headerClose: true,
            buttonPrompt: 'Delete Events?',
            buttons: {
                'OK': {
                    click: function() {
                        $('#buttonoutput').text('OK');

                        $('.deletestuff').each(function() {
                            if ($(this).val() === '1') {
                                sendthisin = $(this).attr("id").substring(9);

                                delete_event(sendthisin);
                            }
                        });

                        select_events();
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