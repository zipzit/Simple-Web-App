
$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });


    $('#addNewMemberBtn').on('click', function(){
        formPostRequest('addNewMemberFormId', '/users/addUserPost/')
    })

    async function formPostRequest(formIdString, apiAddressString) {
        const formData = await new FormData(document.getElementById(formIdString));
        // console.log("simple formData: ",formData)
        console.log("...formData: ", ...formData)
        await fetch(apiAddressString, {
                method: 'POST',
                body: formData
            })
            .then(validateResponse)
            // .then(readResponseAsText)
            .catch(logError);
    }

    function validateResponse(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    function readResponseAsText(response) {
        return response.text();
    }

    function logError(error) {
        console.log('Looks like there was a problem:', error);
    }    
    
});
