// =========================================================
// DUNDEE FIXED MATCHES
// MAIN JAVASCRIPT
// =========================================================


// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        navbar.classList.toggle("active");

    });

}


// Close mobile menu when a navigation link is clicked
if (navbar) {

    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("active");

        });

    });

}


// =========================================================
// STATIC FREE TIPS
// =========================================================

const tipsData = {

    "10 SEP": [
        {
            time: "19:45",
            league: "Champions League",
            home: "Fenerbahçe",
            away: "Roma",
            tip: "ROMA OR DRAW",
            odd: "1.40"
        },
        {
            time: "19:45",
            league: "Champions League",
            home: "PSV Eindhoven",
            away: "Shakhtar Donetsk",
            tip: "PSV WIN",
            odd: "1.55"
        },
        {
            time: "22:00",
            league: "Champions League",
            home: "Bayern Munich",
            away: "Bodø/Glimt",
            tip: "OVER 2.5",
            odd: "1.45"
        },
        {
            time: "22:00",
            league: "Champions League",
            home: "Manchester United",
            away: "Sabah",
            tip: "MAN UNITED WIN",
            odd: "1.25"
        },
        {
            time: "22:00",
            league: "Champions League",
            home: "Como",
            away: "RB Leipzig",
            tip: "OVER 1.5",
            odd: "1.35"
        }
    ],

    "11 SEP": [
        {
            time: "21:30",
            league: "Bundesliga",
            home: "Union Berlin",
            away: "Schalke",
            tip: "1X",
            odd: "1.32"
        },
        {
            time: "21:45",
            league: "Serie A",
            home: "Venezia",
            away: "Fiorentina",
            tip: "X2",
            odd: "1.38"
        },
        {
            time: "21:45",
            league: "Ligue 1",
            home: "Rennes",
            away: "Marseille",
            tip: "OVER 1.5",
            odd: "1.35"
        },
        {
            time: "22:00",
            league: "La Liga",
            home: "Sevilla",
            away: "Valencia",
            tip: "1X",
            odd: "1.30"
        },
        {
            time: "22:00",
            league: "Championship",
            home: "West Ham",
            away: "Wrexham",
            tip: "WEST HAM WIN",
            odd: "1.45"
        }
    ],

    "12 SEP": [
        {
            time: "17:00",
            league: "Premier League",
            home: "Bournemouth",
            away: "Brentford",
            tip: "OVER 1.5",
            odd: "1.30"
        },
        {
            time: "17:00",
            league: "Premier League",
            home: "Aston Villa",
            away: "Nottingham Forest",
            tip: "1X",
            odd: "1.35"
        },
        {
            time: "17:00",
            league: "Premier League",
            home: "Chelsea",
            away: "Hull City",
            tip: "CHELSEA WIN",
            odd: "1.30"
        },
        {
            time: "17:00",
            league: "Premier League",
            home: "Liverpool",
            away: "Fulham",
            tip: "LIVERPOOL WIN",
            odd: "1.35"
        },
        {
            time: "22:00",
            league: "Premier League",
            home: "Sunderland",
            away: "Arsenal",
            tip: "ARSENAL OR DRAW",
            odd: "1.25"
        }
    ],

    "13 SEP": [
        {
            time: "16:00",
            league: "Premier League",
            home: "Coventry City",
            away: "Brighton",
            tip: "OVER 1.5",
            odd: "1.32"
        },
        {
            time: "16:30",
            league: "Bundesliga",
            home: "RB Leipzig",
            away: "Hamburg",
            tip: "LEIPZIG WIN",
            odd: "1.40"
        },
        {
            time: "16:00",
            league: "Serie A",
            home: "Lecce",
            away: "Monza",
            tip: "UNDER 3.5",
            odd: "1.35"
        },
        {
            time: "18:30",
            league: "Premier League",
            home: "Manchester United",
            away: "Manchester City",
            tip: "OVER 1.5",
            odd: "1.30"
        },
        {
            time: "21:30",
            league: "La Liga",
            home: "Levante",
            away: "Barcelona",
            tip: "BARCELONA WIN",
            odd: "1.45"
        }
    ]

};


// =========================================================
// FREE TIPS RENDERING
// =========================================================

const tipsRows = document.querySelector("#tipsRows");
const dateButtons = document.querySelectorAll(".date-btn");


function renderTips(date) {

    if (!tipsRows) {
        return;
    }

    tipsRows.innerHTML = "";

    const selectedTips = tipsData[date];

    if (!selectedTips) {
        return;
    }

    selectedTips.forEach(function (tip) {

        const row = document.createElement("div");

        row.className = "free-row";

        row.innerHTML = `
            <div>
                ${tip.time}
            </div>

            <div>
                ${tip.league}
            </div>

            <div class="free-match">
                ${tip.home}
                <strong>vs</strong>
                ${tip.away}
            </div>

            <div class="free-tip">
                ${tip.tip}
            </div>

            <div class="free-odd">
                ${tip.odd}
            </div>
        `;

        tipsRows.appendChild(row);

    });

}


// =========================================================
// DATE BUTTONS
// =========================================================

dateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        dateButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const selectedDate =
            button.getAttribute("data-date");

        renderTips(selectedDate);

    });

});


// =========================================================
// DEFAULT DATE
// =========================================================

renderTips("10 SEP");


// =========================================================
// ADMIN FREE TIPS
// =========================================================

function displayAdminFreeTips() {

    const storedTips =
        JSON.parse(
            localStorage.getItem("dundeeTips")
        ) || [];


    const freeTips =
        storedTips.filter(function (tip) {

            return tip.type === "free";

        });


    freeTips.forEach(function (tip) {

        if (!tip.date) {
            return;
        }


        const dateParts =
            tip.date.split("-");


        if (dateParts.length !== 3) {
            return;
        }


        const day = dateParts[2];


        const monthNames = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ];


        const month =
            monthNames[
                parseInt(dateParts[1], 10) - 1
            ];


        const dateId =
            day + month;


        const selectedDay =
            document.getElementById(dateId);


        if (!selectedDay) {
            return;
        }


        const table =
            selectedDay.querySelector(
                ".free-tips-table"
            );


        if (!table) {
            return;
        }


        const row =
            document.createElement("div");


        row.className =
            "free-row admin-generated-tip";


        row.innerHTML = `
            <div class="tip-time">
                ${tip.time || "--:--"}
            </div>

            <div class="tip-league">
                ${tip.league || ""}
            </div>

            <div class="free-match">

                <span class="team-badge">
                    ${(tip.home || "HOME")
                        .substring(0, 3)
                        .toUpperCase()}
                </span>

                <span class="team-name">
                    ${tip.home || "Home Team"}
                </span>

                <strong>VS</strong>

                <span class="team-name">
                    ${tip.away || "Away Team"}
                </span>

                <span class="team-badge">
                    ${(tip.away || "AWAY")
                        .substring(0, 3)
                        .toUpperCase()}
                </span>

            </div>

            <div class="free-tip">
                ${tip.prediction || ""}
            </div>

            <div class="free-odd">
                ${tip.odds || ""}
            </div>
        `;


        const header =
            table.querySelector(".free-header");


        if (header) {

            header.insertAdjacentElement(
                "afterend",
                row
            );

        } else {

            table.appendChild(row);

        }

    });

}


// =========================================================
// RUN ADMIN FREE TIPS
// =========================================================

displayAdminFreeTips();
// =========================================================
// GOOGLE ANALYTICS - WHATSAPP CLICK TRACKING
// =========================================================

document.addEventListener("click", function (event) {

    const whatsappLink =
        event.target.closest('a[href*="wa.me"]');

    if (!whatsappLink) {
        return;
    }

    if (typeof gtag === "function") {

        gtag("event", "whatsapp_click", {
            link_url: whatsappLink.href,
            page_location: window.location.href
        });

    }

});
// =========================================================
// GOOGLE ANALYTICS - VIP WHATSAPP CLICK TRACKING
// =========================================================

document.addEventListener("click", function (event) {

    const vipWhatsAppLink =
        event.target.closest('a[href*="wa.me"]');

    if (!vipWhatsAppLink) {
        return;
    }

    const currentPage =
        window.location.pathname;

    if (currentPage.includes("vip.html")) {

        if (typeof gtag === "function") {

            gtag("event", "vip_whatsapp_click", {
                link_url: vipWhatsAppLink.href,
                page_location: window.location.href
            });

        }

    }

});