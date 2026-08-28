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

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
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

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
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

profileEditButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function () {
  closeModal(editModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

newCardCloseButton.addEventListener("click", function () {
  closeModal(newCardModal);
});

newCardForm.addEventListener("submit", handleCardFormSubmit);

imageModalCloseButton.addEventListener("click", function () {
  closeModal(imageModal);
});

initialCards.forEach((card) => {
  renderCard(card.name, card.link, insertCards);
});
