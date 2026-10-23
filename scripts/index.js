import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f07f983a-0d46-4759-8a14-d69539571335",
    "Content-Type": "application/json",
  },
});

const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

const profileEditButton = document.querySelector(".profile__edit-button");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const profileForm = document.querySelector("#edit-profile-form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const descriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);

const addCardButton = document.querySelector(".profile__add-button");
const newCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-form");

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-popup");

deletePopup.setEventListeners();

const profileFormValidator = new FormValidator(validationConfig, profileForm);
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

profileFormValidator.setEventListeners();
newCardFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

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

function handleOpenAvatarModal() {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
}

function handleImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleDeleteClick(card) {
  deletePopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  deletePopup.open();
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .dislikeCard(card.getId())
      .then((cardData) => {
        card.setIsLiked(cardData.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(card.getId())
      .then((cardData) => {
        card.setIsLiked(cardData.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let currentUserId;

const cardSection = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleImageClick,
        handleDeleteClick,
        handleLikeClick,
        currentUserId,
      );
      const cardElement = card.generateCard();

      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

const avatarPopup = new PopupWithForm("#avatar-popup", (inputValues) => {
  avatarPopup.renderLoading(true);

  api
    .editAvatar(inputValues.avatar)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });

      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
});

avatarPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  editProfilePopup.renderLoading(true);

  api
    .editProfile(inputValues.name, inputValues.description)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });

      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
});

editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  newCardPopup.renderLoading(true);

  api
    .addCard(inputValues["place-name"], inputValues.link)
    .then((cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleImageClick,
        handleDeleteClick,
        handleLikeClick,
        currentUserId,
      );

      const cardElement = card.generateCard();

      cardSection.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});

newCardPopup.setEventListeners();

api
  .getAppInfo()
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

profileEditButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenNewCardModal);
avatarEditButton.addEventListener("click", handleOpenAvatarModal);
