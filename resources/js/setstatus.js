document.addEventListener("DOMContentLoaded", () => {
    const todoContainer = document.querySelector(".todo_item_container");
    const listItems = document.querySelectorAll(".listitem");

    // this was something I didn't know I needed to add.  If I change an item, I need to make sure that each time the page loads
    // that all items will render the proper colors relevant to their status.  I need to loop through them all and check the imbedded
    // status property to re add the done vs. not done
    listItems.forEach((item) => {
        done_or_not = parseInt(item.getAttribute("imbedded-status"));
        if (done_or_not) {
            item.classList.add("done");
        } else {
            item.classList.remove("done");
        }
    });

    todoContainer.addEventListener("click", async (event) => {
        const statusButton = event.target;
        if (statusButton.classList.contains("todo-status-btn")) {
            const id_to_update = statusButton.getAttribute("imbedded-id");
            let status = parseInt(statusButton.getAttribute("imbedded-status"));
            status = (status === 0) ? 1 : 0;
            // console.log(status);
            fetch("/api/updatestatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: id_to_update, status: status})
            })
            .then(response => {
                if (response.status === 204) {
                    const itemContainer = statusButton.closest(".listitem");
                    if (itemContainer) {
                        if (status == 1) {
                            // statusButton.style.backgroundColor = "green";
                            itemContainer.classList.add("done");
                        } else if (status == 0) {
                            // statusButton.style.backgroundColor = "red";
                            itemContainer.classList.remove("done");
                        }
                        // Here we want to change the color to something resembling done
                        // And not done if we change to notdone status
                    }
                } else if (response.status === 404) {
                    throw new Error("List item could not be updated");
                }
            })
            .catch(error => console.error("Error:", error));
        }
    });
});