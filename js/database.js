//Add a new event to the EVENTS database
function add_event(event,gnd,flight,parent) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //First time condition
        tx.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (task unique, gnd, flight, parent)');
        //Insert data
        tx.executeSql('INSERT INTO EVENTS (task,gnd,flight,parent) VALUES ("' + event + '", "' + gnd + '", "' + flight + '", "' + parent + '")');
    });
}

//Delete a event from the EVENTS database
function delete_event(event) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //Delete data
        tx.executeSql('DELETE FROM EVENTS WHERE task = "' + event + '"');
    });
}

function select_events(){ 
   events("SELECT * FROM EVENTS;", function(get_events) {
     current_events = get_events;
     console.log(current_events);
     //Populate table from here
   });
}  

function events(query, callback){
   var current_events = [];
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    db.transaction(function (tx) {
      tx.executeSql(query, [], function(tx, results){
         for(var i=0; i<results.rows.length; i++) {
             current_events[i] = [results.rows.item(i).task,results.rows.item(i).gnd,results.rows.item(i).flight, results.rows.item(i).parent];
         }
         callback(current_events);
      });
   });
} 

function drop_table(){
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE EVENTS');
    });
}