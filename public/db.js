let db;
//new request for budget db
const request = indexedDB.open("budget",1);

request.onsuccess=function(event){
    db = event.target.result;

    //test to see if app is online
    if(navigator.onLine){
        checkDatabase();
    }
};
request.onerror=function(event){
    console.log(event.target.errorCode)
};
request.onupgradeneeded=function(event){
    const db = event.target.result;
    db.createObjectStore("pending",{ autoIncrement: true});
};

function saveRecord(record){
    //access pending transaction
    const transaction = db.transaction(["pending"],"readwrite");
    //access pending object store 
    const store = transaction.objectStore("pending");
    
    store.add(record)
}

function checkDatabase(){
    //access pending transaction
    const transaction = db.transaction(["pending"],"readwrite");
    //access pending object store 
    const store = transaction.objectStore("pending");
    //get access to all records from store
    const getAll = store.getAll();

    getAll.onsuccess=function(){
        if(getAll.result.length>0){
            fetch("/api/transaction/bulk",
            {
                method: "POST",
                body: JSON.stringify(getAll.result),
                heders:
                {
                    Accept: "application/json, text/plain, */*", "Content-Type":"application/json"
                }
            })
                .then(response => response.json())
                .then(()=>
                {
                    const transaction = db.transaction(["pending"],"readwrite");
                    const store = transaction.objectStore("pending");
                    store.clear();
                })
        }
    }
}
window.addEventListener("online",checkDatabase)