$(document).ready(function(){
    
    //Function calls to initialize data
    update_event_list();
    
    //Refreshes the Event List Frame
    function update_event_list() {
        $event = select_events();
        //alert($event);
    }
    
    //When You Click Add
    $('#m-add').click(function() {
        $event = $('#m_add_name').val().toString();
        $description = $('#m_add_description').val().toString();
        
        add_event($event,$description,'test');
        
        update_event_list();
        
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