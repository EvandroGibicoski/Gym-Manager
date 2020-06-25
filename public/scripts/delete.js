const formDelete = document.querySelector("#form-delete");

    formDelete.addEventListener("submit", function(event) {
        const confirmation = confirm("Deseja Deleter?")
            if(!confirmation) {
                event.preventDefault()
            };
    });       
