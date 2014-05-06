$(document).ready(function(){
    
    $("#m-add").click(function() {
        $("#m-table tbody").append("<tr><th>TEST</th></tr>");
    });
    
    $("#m_toggle_delete").click(function() {
        //Add to list of what to delete
        
        //If already clicked, turn off toggle
        
        //Changes color and indication
       
    });
    
    //Event List Delete
    $("#m-delete").click(function() {
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