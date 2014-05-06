//Add a new event to the EVENTS database
function add_event(event, description, parent) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //First time condition
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (event unique, description, parent)');
        //Insert data
        tx.executeSql('INSERT INTO EVENTS (event, description, parent) VALUES ("' + event + '", "' + description + '", "' + parent + '")');
    });
}

//Delete a event from the EVENTS database
function delete_event(event) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //Delete data
        tx.executeSql('DELETE FROM EVENTS WHERE event = "' + event + '"');
    });
}

//Select all from Events
function select_events() {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    var output = [];
    //Write
    db.transaction(function(tx) {
        //Fetch Data
        tx.executeSql('SELECT * FROM EVENTS', [], function(tx, results) {
            for (i = 0; i < results.rows.length; i++) {
                output[i] = [results.rows.item(i).event,results.rows.item(i).description, results.rows.item(i).parent];
                //window.alert(output[i]);
            }
<<<<<<< HEAD
<<<<<<< HEAD:database.js
            return (output);
=======
            window.alert(output);
>>>>>>> 390c56fcdf659b3da0ca0cc262b769da14721c5a:js/database.js
=======
            window.alert(output);
>>>>>>> 390c56fcdf659b3da0ca0cc262b769da14721c5a
        }, null);
    });
}
