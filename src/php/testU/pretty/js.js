console.log("toto");

window.addEventListener("load", function(){
    
    console.log("toto");
    
    var divs = document.querySelectorAll("#content>div");
    
    var table = document.createElement("table");
    
    var tr = document.createElement("tr");
        var td = document.createElement("th");
        td.innerHTML = "Catégorie";
        
        var td1 = document.createElement("th");
        td1.innerHTML = "OK";
        var td2 = document.createElement("th");
        td2.innerHTML = "Warning";
        var td3 = document.createElement("th");
        td3.innerHTML = "Error";
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    
    
    for(var i=1; i<divs.length; i++){
        var div = divs[i];
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var tt = div.querySelectorAll("h2");
        td.innerHTML = tt[0].innerHTML;
        
        var td1 = document.createElement("td");
        td1.innerHTML = div.querySelectorAll(".o").length;
        var td2 = document.createElement("td");
        td2.innerHTML = div.querySelectorAll(".w").length;
        var td3 = document.createElement("td");
        td3.innerHTML = div.querySelectorAll(".e").length;
        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
    
    var recap = document.getElementById("recap");
    recap.appendChild(table);
    
}, false);