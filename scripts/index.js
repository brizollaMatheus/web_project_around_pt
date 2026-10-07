import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profileEditButton = document.querySelector(".profile__edit-button");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const profileForm = document.querySelector("#edit-profile-form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);

profileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();

function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  descriptionInput.value = userData.job;
}

function handleOpenEditModal() {
  fillProfileForm();
  profileFormValidator.resetValidation();
  editProfilePopup.open();
}

function handleOpenNewCardModal() {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.generateCard();

      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.description,
  });

  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const card = new Card(
    {
      name: inputValues["place-name"],
      link: inputValues.link,
    },
    "#card-template",
    handleImageClick,
  );

  const cardElement = card.generateCard();

  cardSection.addItem(cardElement);
  newCardPopup.close();
});

newCardPopup.setEventListeners();

profileEditButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenNewCardModal);
