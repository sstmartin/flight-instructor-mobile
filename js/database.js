//Add a new task to the TASKS database
function add_task(order,stage,task,gnd,flight,parent) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //First time condition
	tx.executeSql('CREATE TABLE IF NOT EXISTS TASKS (my_order unique, stage, task unique, gnd, flight, parent)');
 
        tx.executeSql('INSERT INTO TASKS (my_order, stage, task, gnd, flight, parent) VALUES ("'+ order + '", "' + stage + '", "' + task + '", "' + gnd + '", "' + flight + '", "' + parent + '")');
    });
}

//Delete a task from the TASKS database
function delete_task(my_order) {
    //Open
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    //Write
    db.transaction(function(tx) {
        //Delete data
        tx.executeSql('DELETE FROM TASKS WHERE my_order = "' + my_order + '"');
    });
}

function tasks(query, callback){
   var current_tasks = [];
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    db.transaction(function (tx) {
      tx.executeSql(query, [], function(tx, results){
         for(var i=0; i<results.rows.length; i++) {
             current_tasks[i] = [results.rows.item(i).my_order,results.rows.item(i).stage,results.rows.item(i).task,results.rows.item(i).gnd,results.rows.item(i).flight, results.rows.item(i).parent];
         }
         callback(current_tasks);
      });
   });
} 

function drop_table(){
    var db = openDatabase('flight_instructor_mobile', '1.0', 'Data Storage', 2 * 1024 * 1024);
    db.transaction(function(tx) {
        tx.executeSql('DROP TABLE TASKS');
    });
}