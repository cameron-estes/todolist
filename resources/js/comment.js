document.addEventListener('DOMContentLoaded', function () {
    const submit_button = document.getElementById("add_button");
    submit_button.addEventListener("click", (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        const comment = document.getElementById("comment").value;
        const id = document.getElementById("id").value;

        const data = {
            comment: comment,
            id: id
        };
        // console.log(data);

        // Make the fetch call
        fetch("/api/createcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(resp => {
            if (resp.status === 201) {
                return resp.json();
            } else if (resp.status === 400) {
                document.getElementById("comment").style.borderColor = "red";
                return resp.json();
            }
        })
        .then(item => {
            if (item) {
                window.location.reload();
            }
        });
    });
});