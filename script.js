// // zip form handler


// const baseUrl = "https://dxri8dth5lmsz.cloudfront.net/";
// let queryString = window.location.search;
// let queryParams = new URLSearchParams(queryString);
// let zipForms = document.querySelectorAll('[data-zip-form]');

// zipForms.forEach(form => {
//   form.addEventListener("submit", function(event) {
//     event.preventDefault();
//     const zipCode = this.querySelector("#zipcode").value;
//     queryParams.set("zip", zipCode);
//     window.location.href = `${baseUrl}?${queryParams}`;
//   });
// });

// const handleForm = function(formId) {

//   document
//     .getElementById(formId)
//     .addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const form = e.target;
//       const container = form.closest(".w-form");
//       const action = form.action;
//       const data = Object.fromEntries(new FormData(form));
//       try {
//         const response = await fetch(action, {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         if (response.ok) {
//           form.style.display = "none";
//           container.querySelector(".w-form-done").style.display = "block";
//         } else {
//           throw new Error("Network response was not ok");
//         }
//       } catch (error) {
//         console.error("There was a problem with the fetch operation:", error);
//         container.querySelector(".w-form-fail").style.display = "block";
//       }
//     });

// }


// zip code form

const baseUrl = "https://dxri8dth5lmsz.cloudfront.net/";
let queryString = window.location.search;
let queryParams = new URLSearchParams(queryString);
let zipForms = document.querySelectorAll('[data-zip-form]');

zipForms.forEach(form => {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('input[type="submit"]');
    submitButton.value = "Please wait...";
    submitButton.disabled = true;

    const zipCode = this.querySelector("#zipcode").value;
    queryParams.set("zip_code", zipCode)
    window.location.href = `${baseUrl}?${queryParams}`



  });
});



// sweepstakes form

const handleForm = function(formId) {
  const form = document.getElementById(formId);
  const submitButton = form.querySelector('input[type="submit"]');
  const originalButtonText = submitButton.value;
  const successMessage = form.closest('.w-form').querySelector('.w-form-done');
  const errorMessage = form.closest('.w-form').querySelector('.w-form-fail');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitButton.value = "Submitting...";
    submitButton.disabled = true;

    const action = form.action;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.style.display = "none";
        successMessage.style.display = "block";
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      errorMessage.style.display = "block";
    } finally {
      submitButton.value = originalButtonText;
      submitButton.disabled = false;
    }
  });
}

handleForm("email-form");
