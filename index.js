
//function used to handle form submission
const submitHandler = (event) => {
  event.preventDefault();
  console.log("The form was submitted");
  //Get the name input - option 1
  // const parkName = document.querySelector("#name-input").value;
  // console.log(parkName)

  //Get the form input - option 2
  const form = event.target;
  const formData = new FormData(form);
  const errors = validateForm(formData);

  //clear all previous errors
  const errorElements = document.querySelector(".error");
  for(let element of errorElements) {
      element.style.display = "none";
  }

  //display any new errors
  Object.keys(errors).forEach((key) => {
      //find the specific error element
      const errorElement = document.querySelector(`#${key}-form .error`);
      errorElement.innerHTML = errors[key];
      errorElement.style.display = "block";
  });
  
  //if there are no errors
  if (!Object.keys(errors).length) {
      //create a new element
      const parkSection = document.createElement("section");

      //add the park class
      parkSection.classList.add("park-display");

      //construct the HTML for this element
  const content = `
    <h2>${formData.get("name")}</h2>
    <div class="location-display">${formData.get("location")}</div>
    <div class="description-display">${formData.get("description")}</div>
    <button class="rate-button" title="Add to Favourites">&#9734;</button>
    <div class="stats">
      <div class="established-display stat">
        <h3>Established</h3>
        <div class="value">${moment(formData.get("established")).format(
          "MMMM D, YYYY"
        )}</div>
      </div>
      <div class="area-display stat">
        <h3>Area</h3>
        <div class="value">${formData.get("area")}</div>
      </div>
      <div class="rating-display stat">
        <h3>Rating</h3>
        <div class="value">${formData.get("rating")}</div>
      </div>
    </div>
    `;

    //set the innerHTML
    parkSection.innerHTML = content;

    //append to the main element
    document.querySelector("main").appendChild(parkSection);
  }
};

const main = () => {
    //Get the form element
    const form = document.querySelector("#park-form");
    //Attach the submit handler
    form.addEventListener("submit", submitHandler);
}

//Add event listener for COMContentLoaded that invokes the main function
window.addEventListener("DOMContentLoaded", main);

//this function accepts a string value and returns true if the value is not null and the string contains at least one non-space character
function validateExists(value) {
    return value && value.trim();
}

//this function will take each input field, perform required validation on it and generate a collection of error messages for the user
function validateForm(formData) {
    const errors = {};

    //check if name was entered
    if (!validateExists(formData.get("name"))) {
        errors.name = "Please enter a name";
    }

    //check if rating was entered
    if (!validateExists(formData.get("rating"))) {
        errors.rating = "Please enter a rating";
    }

    //check if description was entered
    if(!validateExists(formData.get("description"))) {
        errors.description = "Please enter a short description";
    }

    //check if established date was entered
    if (!validateExists(formData.get("established"))) {
        errors.established = "Please enter date";
    }

    //check if area was entered
    if (!validateExists(formData.get("area"))) {
        errors.area = "Please enter area of the park";
    }

    //check if location data was entered
    if(!validateExists(formData.get("location"))) {
        errors.location = "Please enter the location of the park";
    }

    //check if rating was entered
    if (!validateExists(formData.get("rating"))) {
        errors.rating = "Please enter a rating";
    } else {
        //check if the rating is a number
        if(!validateNumber(formData.get("rating"))) {
            errors.rating = "Rating must be a number";
        } else {
            //since it is a number, convert it
            const rating = Number.parseFloat(formData.get("rating"));
            //check that the rating is between 1 and 5 inclusive
            if (!validateRange(rating, 1, 5)) {
                errors.rating = "Rating must be betwen 1 and 5 inclusive";
            }
        }
    }
    return errors;
}

//validation that rating is a number in the range 1 to 5 inclusive
function validateNumber(value) {
    return !isNaN(value);
}

function validateNumber(value, min, max) {
    return value >= min && value <= max
}