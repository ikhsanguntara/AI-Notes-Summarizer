console.log("DHIMAS");

var list = [];
list.push({ firstname: "ikhsan1", lastname: "farhan1" });
list.push({ firstname: "ikhsan2", lastname: "farhan2" });

list.forEach(function (value) {
    // console.log("value : " + JSON.stringify(value));
    // console.log("index : " + index);

    value.fullname = value.firstname + value.lastname;
    // console.log("array : " + JSON.stringify(array));
})

console.log(JSON.stringify(list));