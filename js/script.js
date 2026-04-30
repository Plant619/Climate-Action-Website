// -------------------------------------------------------------------------------------------------------------
// Chooses a random quote for footer
// -------------------------------------------------------------------------------------------------------------

const quotesArr = [
    "\"The Earth is what we all have in common.\" — Wendell Berry",
    "\"There is no Planet B.\" — Emmanuel Macron",
    "\"Sustainability is no longer about doing less harm. It's about doing more good.\" — Jochen Zeitz", 
    "\"Be the change you wish to see in the world.\" — Mahatma Gandhi", 
    "\"To leave the world better than you found it, sometimes you have to pick up other people\'s trash.\" — Bill Nye", 
    "\"The greatest threat to our planet is the belief that someone else will save it.\" — Robert Swan"
];

function randQuote(quotesArr) {
    let index = Math.floor(Math.random() * quotesArr.length);
    return quotesArr[index];
}

document.getElementById("footer").textContent = randQuote(quotesArr); 

// -------------------------------------------------------------------------------------------------------------
// Game
// -------------------------------------------------------------------------------------------------------------
// https://www.w3schools.com/html/html5_draganddrop.asp
if (document.body.id == 'home') {
    // function called when item is dragged (current item)
    function dragStartHandler(e) {
        // Sets the data type and the value of the dragged data
        e.dataTransfer.setData("text", e.target.id);
    }

    // function called when item is dragged over the element (Recycle, Trash)
    function dragOverHandler(e) {
        // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element.
        e.preventDefault();
    }

    function dragDropHandler(e){
        // default is open as link on drop
        e.preventDefault();
        // Gets dragged item's id
        const id = e.dataTransfer.getData("text");
        // Gets text associated with id
        const currItem = document.getElementById(id).textContent;        
        const ans = e.target.id;
        checkAns(currItem, ans);
        newItem(currItem);
    }

    const optionsArr = ['Type 1: PET plastic', 'Type 2: HDPE plastic', 'Type 3: PVC plastic', 'Type 4: LDPE plastic', 'Type 5: PP plastic', 'Type 6: PS plastic', 'Type 7: Others'];
    const recycleArr = ['Type 1: PET plastic', 'Type 2: HDPE plastic', 'Type 4: LDPE plastic', 'Type 5: PP plastic'];
    // Ensure that the corresponding fact for each item is in the same index position in factsArr as in optionsArr
    const factsArr = ['PET (polyethylene terephthalate) is the most recycled plastic in the world! It is usually used for food and drink packaging like plastic bottles', 'HDPE (High-Density Polyethylene) is one of the easiest plastic polymers to recycle. It is used for grocery bags, milk jugs, recycling bins, agricultural pipe, playground equipment, lids, and shampoo bottles to name a few. ', 'PVC (Polyvinyl chloride) is hardly recycled and is used in building and construction to produce doors, window profiles and pipes. ', 'LDPE(Low-Density Polyethylene) is challenging to recycle but are Singapore\'s blue recycling bin\'s do accept it. It is used to make plastic bags, containers, dispensing bottles and plastic wraps. ', 'PP(Polypropylene) is hard and sturdy and is used to make tupperwares, car parts, food containers etc.', 'PS(Polysterene) is not recyclable and is one of the most dangerous plastics to human health. It used to make plastic utensils, cups, plates, Styrofoam, packaging materials', 'Others(Eg. PLA, PC) care categorised as any plastic that does not fit into the other 6 categories. Baby milk bottles, reusable bottles, CDs, biodegradable packaging are often made of this type of plastic. '];

    // Checks whether ans is right
    function checkAns(item, ans) {
        
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        
        // If item is recyclable and ans is correct
        if (recycleArr.includes(item) && ans == 'recycle'){
            document.getElementById("score").textContent = Number(document.getElementById("score").textContent) + 10;
            document.getElementById("modal_title").textContent = "Good job, that is correct!";
            document.getElementById("modal_header").style.backgroundColor = '#71BC78';
            document.getElementById("modal_text").textContent = "Fun fact: Did you know, " + factsArr[optionsArr.indexOf(item)];
            modal.show();
        // If item is recyclable and ans is wrong
        } else if (recycleArr.includes(item) && ans == 'trash') {
            document.getElementById("modal_title").textContent = "That is incorrect! ";
            document.getElementById("modal_header").style.backgroundColor = '#F08080';
            document.getElementById("modal_text").textContent = "Fun fact: Did you know, " + factsArr[optionsArr.indexOf(item)];
            modal.show();
        // If item is not recyclable and ans is correct
        } else if (ans == 'trash'){
            document.getElementById("score").textContent = Number(document.getElementById("score").textContent) + 10;
            document.getElementById("modal_title").textContent = "Good job, that is correct!";
            document.getElementById("modal_header").style.backgroundColor = '#71BC78';
            document.getElementById("modal_text").textContent = "Fun fact: Did you know, " + factsArr[optionsArr.indexOf(item)];
            modal.show();
        // If item is not recyclable and ans is wrong
        } else {
            document.getElementById("modal_title").textContent = "That is incorrect! ";
            document.getElementById("modal_header").style.backgroundColor = '#F08080';
            document.getElementById("modal_text").textContent = "Fun fact: Did you know, " + factsArr[optionsArr.indexOf(item)];
            modal.show();
        }
    }

    // Gets the next item in the array
    function newItem(currItem) {
        const nextItemID = optionsArr.indexOf(currItem) + 1; 
        if (nextItemID >= optionsArr.length) {
        document.getElementById("currentItem").textContent = 'Thank you for playing';
        } else {
            const nextItem = optionsArr[nextItemID];
            document.getElementById("currentItem").textContent = nextItem;
        }
    }

    // Reset button to try game again
    document.getElementById("reset").addEventListener("click", () => {
        document.getElementById("score").textContent = '0'; 
        document.getElementById("currentItem").textContent = optionsArr[0];
    });

    // Toggles whether all the fun facts is shown or hidden
    document.getElementById("funFacts").addEventListener("click", () => {
        let funFacts = document.getElementById("funFacts");
        if (funFacts.textContent == "Show fun facts"){
            funFacts.textContent = "Hide fun facts";
            document.getElementById("hidden").style.display = 'block';
        } else {
            funFacts.textContent = "Show fun facts";
            document.getElementById("hidden").style.display = 'none';
        }
    });


// -------------------------------------------------------------------------------------------------------------
// Calculate carbon footprint
// -------------------------------------------------------------------------------------------------------------
    document.getElementById("submit").addEventListener("click", carbonFootprintOutput);

    function carbonFootprintOutput(e) {
        e.preventDefault();

        // Getting user input
        const electricityUsed = Number(document.getElementById("electricity_bills").value);
        const gasUsed = Number(document.getElementById("gas_bills").value); 
        const caloriesConsumed = Number(document.getElementById("calories").value);
        const moneyOnShopping = Number(document.getElementById("shopping").value);
        const distTravelled = Number(document.getElementById("distance_travelled").value);

        const radios = document.querySelectorAll("input[name='transport']");
        let transportMode = '';
        for (let i = 0; i < radios.length; i++){
            if (radios[i].checked){
                transportMode = radios[i].value;
                break;
            }
        }

        const carbonFootprint = calculateCarbonFootprint(electricityUsed, gasUsed, caloriesConsumed, moneyOnShopping, distTravelled, transportMode).toFixed(2);
        // Output
        document.getElementById("carbonFootprint").innerHTML = '<h3>Your estimated carbon footprint is ' + carbonFootprint + 'kg. </h3>';
    }

    // Calculations
    function calculateCarbonFootprint(electricity, gas, calories, shoppingCost, distTravel, transportMode){
        let totalCO2Emissions = 0;
        // Electricity emissions: SG Grid emission factor(GEF): 0.412kg  of CO2 per kWh
        totalCO2Emissions += electricity * 0.412;
        // Gas emissions: 1.932kg of Co2 per 1m3 of natural gas 
        totalCO2Emissions += 10 ** (-6) * gas * 1.932;
        // Calories emissions: 1.5 g CO₂e / kcal for 30 days
        totalCO2Emissions += calories * 0.0015 * 30;
        // Shopping emissions: 0.8kg of CO2 per $1 spent
        totalCO2Emissions += shoppingCost * 0.8;
        // Transport emissions 
        // Bus: 0.097kg per km 
        if (transportMode == 'bus') {
            totalCO2Emissions += distTravel * 0.097;
        // Car: 0.17kg per km
        } else if (transportMode == 'car') {
            totalCO2Emissions += distTravel * 0.17;
        // Train: 0.028kg per km
        } else {
            totalCO2Emissions += distTravel * 0.028;
        }
        return totalCO2Emissions;
    }
}


// -------------------------------------------------------------------------------------------------------------
// Form validalition
// -------------------------------------------------------------------------------------------------------------
if (document.body.id === 'myForm'){


    let form = document.getElementById("form");
    document.getElementById("submit").addEventListener("click", formValidation);

    function formValidation(e) {
        e.preventDefault();

        // Getting the user's form input 
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const age = document.getElementById("age").value;
        const country = document.getElementById("country").value;
        const slider = document.getElementById("slider").value;

        // Getting checked checkboxes
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        let checkedCheckboxes = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCheckboxes.push(checkbox.value); 
            }
        });

        // Getting selected radio
        const radios = document.querySelectorAll("input[name='commitmentLevel']");
        let selectedRadio = [];
        radios.forEach(radio => {
            if (radio.checked) {
                selectedRadio.push(radio.value);
            }
        });

        const pledge = document.getElementById("pledge").value;
        const commitment = document.getElementById("committments").value;
        
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        // Verification (name, email, country and radio cannot be empty and pledge and commitment must be more than 10 words long)
        if (name != '' && email.includes("@") && age != '' && country != '' && selectedRadio.length != 0 && document.getElementById("word_count_1").textContent > 10 && document.getElementById("word_count_2").textContent > 10) {
            document.getElementById("modal_title").textContent = "Form was submitted";
            document.getElementById("modal_text").textContent = "Thank you " + name + " for your submission";
            modal.show();

            // Formatting actions for output
            let actions = '';
            let checkedCheckboxesLen = checkedCheckboxes.length;
            if (checkedCheckboxesLen == 0) {
                actions = 'am not doing any of these actions'; 
            } else if (checkedCheckboxesLen == 1) {
                actions = checkedCheckboxes[0];
            } else if (checkedCheckboxesLen == 2){
                actions = checkedCheckboxes[0] + ' and ' + checkedCheckboxes[1];
            } else {
                actions = checkedCheckboxes[0];
                for (let i = 1; i < checkedCheckboxes.length - 1; i++) {
                    actions += ', ' + checkedCheckboxes[i];
                } 
                actions += ' and ' + checkedCheckboxes[checkedCheckboxesLen - 1]; 
            }


            // Output
            document.getElementById("output").innerHTML = '<h1>' + name + '\'s Submission</h1><p>Age: ' + age + '<br> From: ' + country + ' </p><p> I am ' + slider + '% environmentally conscious. I currently ' + actions + ' to be more sustainable. I am '+ selectedRadio[0] + ' to reducing my carbon footprint. </p><p> I pledge to ' + pledge + ' and I am committed to ' + commitment + " for the environment. </p>";

            form.reset();
        } else {
            document.getElementById("modal_title").textContent = "Form was not submitted";
            if (name == '' || email == '' || country == '' || selectedRadio.length == 0){
                        document.getElementById("modal_text").textContent = "Please fill in every field";
            } else {
                document.getElementById("modal_text").textContent = "Your pledge and commitment must be more than 10 words long";
            }
            modal.show();
        }
    }

// -------------------------------------------------------------------------------------------------------------
// Word count for pledge and committment and slider value
// -------------------------------------------------------------------------------------------------------------

    document.getElementById("pledge").addEventListener("input", updateWordCount);
    document.getElementById("committments").addEventListener("input", updateWordCount);


    function updateWordCount() {
        let pledge = document.getElementById("pledge").value;
        let commitments =  document.getElementById("committments").value;
        if (pledge == ''){
            document.getElementById("word_count_1").textContent = 0;
        } else {
            pledge = pledge.trim();
            let pledgeArr = pledge.split(/\s+/);
            document.getElementById("word_count_1").textContent = pledgeArr.length;
        }
        if (commitments == ''){
            document.getElementById("word_count_2").textContent = 0;
        } else {
            commitments = commitments.trim();
            let committmentsArr = commitments.split(/\s+/);
            document.getElementById("word_count_2").textContent = committmentsArr.length;
        }
    }

    setInterval(sliderValue, 1000);

    function sliderValue() {
        const slider = document.getElementById("slider").value;
        document.getElementById("slider_value").textContent = slider;
    }

    


    // Progress bar 
    // setInterval(progress, 1000)
    // function progress() {
    //     for (let i = 0; i < form.getElementsByTagName("input"); i++){
            
    //     }
    // }

    // console.log(form.getElementByTagName("input"))
}

