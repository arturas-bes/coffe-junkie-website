
//all images scripts links have finished loading

eventListeners();
//window event list 
function eventListeners() {
    const ui = new UI()

window.addEventListener('load', function(){
   ui.hidePreloader();
})
//nav btn
document.querySelector('.navBtn').addEventListener('click', function () {  
ui.showNav();
})
//control video
document.querySelector('.video-switch').addEventListener('click', function(){
    ui.videoControls();
})
// submit the form
document.querySelector('.drink-form').addEventListener('submit', function(event){
    event.preventDefault();
    const name = document.querySelector('.input-name').value;
    const lastName = document.querySelector('.input-last-name').value;
    const email = document.querySelector('.input-email').value;

    let value = ui.checkEmpty(name, lastName, email);


    if (value) {
        let customer = new Customer(name, lastName, email);
        //console.log(customer);
        ui.addCustomer(customer);
ui.showFeedback('customer added to the list', 'success');
ui.clearFields();
    }
    else {
        ui.showFeedback('there is an error in the form', 'error');
    }
})


//dispaly modal
const links = document.querySelectorAll('.work-item-icon');
links.forEach(function(item){
item.addEventListener('click', function(event){
    event.preventDefault();
    ui.showModal(event);
         })
    })

// close modal
document.querySelector('.work-modal-close').addEventListener('click', function(){
    ui.closeModal();
})
}









//contructor function
function UI() {}
//hide preloader
UI.prototype.hidePreloader = function() {
    document.querySelector('.preloader').style.display = "none";
  
}
//show nav
UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav-show'); 

}
// play/pause the video
UI.prototype.videoControls = function () {
   let btn = document.querySelector('.video-switch-btn');
   if(!btn.classList.contains('btn-slide')) {
    btn.classList.add('btn-slide');
    document.querySelector('.video-item').pause();
   }
   else {
       btn.classList.remove('btn-slide');
       document.querySelector('.video-item').play();


   }
}
// check for empty values
UI.prototype.checkEmpty = function(name, lastName, email){
let result;
if(name === '' || lastName === '' || email === '') {
    result = false;
}
else {
    result = true;
}
return result;
}
// show value feedback
UI.prototype.showFeedback = function(text, type) {
    const feedback = document.querySelector('.drink-form-feedback');
if(type === 'success') {
    feedback.classList.add('success');
    feedback.innerText = text;
    this.removeAlert('success');
}
else if(type === 'error') {
feedback.classList.add('error');
feedback.innerText = text;
this.removeAlert('error');
    }
}
//remove  alert
UI.prototype.removeAlert = function(type) {
    setTimeout(function(){
        document.querySelector('.drink-form-feedback').classList.remove(type);
    },3000)
}

// add customer 
UI.prototype.addCustomer = function(customer) {
const images = [1,2,3,4,5];
let random = Math.floor(Math.random()*images.length);
const div = document.createElement('div');
div.classList.add('person');
    div.innerHTML = `  <img src="images/person-${random}.jpg" alt="person" class="person-thumbnail">
                        <h4 class="person-name">${customer.name}</h4>
                        <h4 class="person-last-name">${customer.lastName}</h4>`;
 document.querySelector('.drink-card-list').appendChild(div);
                        
}
// clear form fields
UI.prototype.clearFields = function () {
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-last-name').value = '';
    document.querySelector('.input-email').value = '';
}
// show modal
UI.prototype.showModal = function (event) {
if(event.target.parentElement.classList.contains('work-item-icon')){
    let id = event.target.parentElement.dataset.id;
    //console.log(id);
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal-item');
    modal.classList.add('work-modal-show');
    let result = modalItem.style.backgroundImage = `url(images/coffe-img${id}.jpg)`;
   // console.log(result);
    }
}
// close modal
UI.prototype.closeModal = function() {
    document.querySelector('.work-modal').classList.remove('work-modal-show');
}








// add customer constructor
function Customer(name, lastName, email) {  
    this.name = name;
    this.lastName = lastName;
    this.email = email;
}
