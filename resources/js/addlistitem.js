document.addEventListener('DOMContentLoaded', function () {
    const submit_button = document.getElementById('add_button');
    submit_button.addEventListener("click", (event) => {
        // I was running into an issue where despite checking in the server
        // if the name and desc values were empty, it would direct me
        // to a whitepage with the response from the server
        // preventDefault serves to prevent the click action from being
        // taken if the parameters aren't handled below:
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

        // The reason I employed this here is because in the case where I submit one
        // param, and then the ohter after a failed submit attempt, it will
        // treat the attempt as a empty case and try to submit a item
        // without a name and desc even though I specifed one.
        event.preventDefault();

        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        console.log(name);
        console.log(description);

        const new_item = {
            name: name,
            description: description
        };

        // console.log(new_item);

        fetch("/api/createitem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(new_item)
        })
        .then(resp => {
            if (resp.status === 201) {
                window.location.reload();
                return resp.json();
            } else if (resp.status === 400) {
                document.getElementById("name").style.borderColor = "red";
                document.getElementById("description").style.borderColor = "red";
                return resp.json();
            }
        })
    });
});