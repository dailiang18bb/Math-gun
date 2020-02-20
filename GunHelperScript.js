window.onload = function () {
    startTab();
};

window.addEventListener('load', () => {
    initServiceWorker();
});

// register service worker
async function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.getRegistrations()
                .then(registrations => {
                    // unregister the old SW
                    if(registrations.length > 1){
                        registrations.forEach(registration => {
                            registration.unregister();
                        });
                    }
                });
            await navigator.serviceWorker.register('./sw.js');
        } catch (e) {
            console.log('SW failed');
        }
    }
}





// set default tab click
function startTab() {
    document.getElementById("equation-plot").click();
}


// the tab click function
function openInputFunction(evt, functionName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(functionName).style.display = "block";
    evt.currentTarget.className += " active";

    var current = document.getElementsByClassName("active");
    console.log(current[0].id == 'equation-plot');
}

