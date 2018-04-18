var database = firebase.database().ref();

database.on("value", function (snapshot) {
    let list = document.getElementById('listPerso');
    list.innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var perso = childSnapshot.val();
        let listPerso = document.createElement("li");
        listPerso.textContent = perso.name;
        list.appendChild(listPerso);
    });
});

document.getElementById('addPersonnage').onclick = function addPerso(name) {
    let input = document.getElementById("getPersonnage");
    if (!input.value || input.value == "") {
        return;
    }
    let list = firebase.database().ref();
    let newItem = list.push();
    newItem.set({
        name: input.value
    });
}