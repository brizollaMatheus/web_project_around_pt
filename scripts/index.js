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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
const nameInput = editModal.querySelector(".popup__input_type_name");
const descriptionInput = editModal.querySelector(
  ".popup__input_type_description",
);
const profileForm = editModal.querySelector("#edit-profile-form");
const saveButton = editModal.querySelector(".popup__button");
const profileInputs = profileForm.querySelectorAll(".popup__input");

const insertCards = document.querySelector(".cards__list");
const templateCard = document.querySelector("#card-template");

const addCardButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const cardNameInput = newCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardModal.querySelector(".popup__input_type_url");
const newCardForm = newCardModal.querySelector("#new-card-form");
const newCardSaveButton = newCardModal.querySelector(".popup__button");
const newCardInputs = newCardForm.querySelectorAll(".popup__input");

const imageModal = document.querySelector("#image-popup");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function showInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

function resetValidation(formElement, inputList) {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(profileForm, profileInputs);
  saveButton.disabled = true;
  openModal(editModal);
}

function handleOpenNewCardModal() {
  newCardForm.reset();
  resetValidation(newCardForm, newCardInputs);
  newCardSaveButton.disabled = true;
  openModal(newCardModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editModal);
}
function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButton(evt) {
  evt.target.closest(".card").remove();
}

function handleImageClick(evt) {
  imageModalCaption.textContent = evt.target.alt;
  imageModalImage.src = evt.target.src;
  imageModalImage.alt = evt.target.alt;

  openModal(imageModal);
}

function getCardElement(name, link) {
  const cardElement = templateCard.content.cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteButton);
  cardImage.addEventListener("click", handleImageClick);

  return cardElement;
}

function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);

  container.prepend(newCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, insertCards);

  newCardForm.reset();
  closeModal(newCardModal);
}

profileInputs.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    isValid(profileForm, inputElement);
    toggleButtonState(profileInputs, saveButton);
  });
});

newCardInputs.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    isValid(newCardForm, inputElement);
    toggleButtonState(newCardInputs, newCardSaveButton);
  });
});

profileEditButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", handleOpenNewCardModal);

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

editModal.addEventListener("click", handleOverlayClick);
newCardModal.addEventListener("click", handleOverlayClick);
imageModal.addEventListener("click", handleOverlayClick);

document.addEventListener("keydown", handleEscClose);

initialCards.forEach((card) => {
  renderCard(card.name, card.link, insertCards);
});
