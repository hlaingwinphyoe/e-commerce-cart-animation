
export function showLoader(){
    const loader = document.createElement('div');
    loader.classList.add("loader","animate__animated","animate__fadeIn");
    loader.innerHTML = `<div class="bg-white fixed-top min-vh-100 d-flex justify-content-center align-items-center">
    <div class="spinner-border text-danger" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`;
  document.body.append(loader)
  }
  
  export function removeloader(){
    const selectCurrentLoader = document.querySelector('.loader');
    selectCurrentLoader.classList.replace("animate__fadeIn","animate__fadeOut");
    selectCurrentLoader.addEventListener("animationend",_=> selectCurrentLoader.remove())
  }