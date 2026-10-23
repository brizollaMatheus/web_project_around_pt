import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._handleConfirm();
    });
  }

  setSubmitAction(handleConfirm) {
    this._handleConfirm = handleConfirm;
  }
}
