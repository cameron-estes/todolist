document.addEventListener("DOMContentLoaded", function() {
    const del_buttons = document.querySelectorAll(".todo-delete-btn");

    del_buttons.forEach(button => {
        button.addEventListener("click", function () {
            const id_to_del = button.getAttribute("imbedded-id");

            fetch("/api/deleteitem", {
                method: "DELETE",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({id_to_delete: id_to_del}),
            })
            .then(response => {
                if (response.status === 204) {
                    const listItemContainer = button.closest(".listitem");
                    if (listItemContainer) {
                        listItemContainer.remove();
                    }
                } else if (response.status === 404) {
                    throw new Error("List Item was not found");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });
});