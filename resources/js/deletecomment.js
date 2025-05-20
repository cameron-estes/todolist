document.addEventListener("DOMContentLoaded", function() {
    const del_buttons = document.querySelectorAll(".delete_comment_btn");

    del_buttons.forEach(button => {
        button.addEventListener("click", function () {
            const comment_to_delete = button.getAttribute("imbedded_id");

            fetch("/api/deletecomment", {
                method: "DELETE",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({id_to_delete: comment_to_delete}),
            })
            .then(resp => {
                if (resp.status === 204) {
                    const commentContainer = button.closest(".commentbox");
                    if (commentContainer) {
                        commentContainer.remove();
                    }
                } else if (resp.status === 404) {
                    throw new Error("Comment was not found");
                }
            })
            .catch(error => console.error("Error:", error));
        });
    });
});