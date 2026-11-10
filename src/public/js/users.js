console.log("Users frontend javascript file");

$(function() {
    $(".member-status").on("change", (e) => {
        const id = e.target.id;

        const memberStatus = $(`#${id}.member-status`).val();

        axios.post("/admin/user/edit", { _id: id, memberStatus: memberStatus }).then(response => {
            const result = response.data;

            if(result.data) {
               console.log("User has been updated!");
               $(".member-status").blur();
            } else alert("Failed to update user!");
        }).catch(err => {
            console.error(err);
            alert("Failed to update user!");
        })
    })
})
