/** Shared accessible modal behavior for portfolio viewers. */
(() => {
  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "iframe",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  let activeModal = null;
  let returnFocusTo = null;

  function getFocusable(modal) {
    return Array.from(modal.querySelectorAll(focusableSelector))
      .filter(element => !element.hidden && element.getClientRects().length > 0);
  }

  function open(modal, trigger = document.activeElement) {
    if (!modal) return;
    if (activeModal && activeModal !== modal) close(activeModal, false);

    activeModal = modal;
    returnFocusTo = trigger instanceof HTMLElement ? trigger : null;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.tabIndex = -1;
    document.body.classList.add("viewer-modal-open");

    window.requestAnimationFrame(() => {
      const preferredFocus = modal.querySelector("[data-modal-close], [id^='close-']");
      (preferredFocus || getFocusable(modal)[0] || modal).focus({ preventScroll: true });
    });
  }

  function close(modal = activeModal, restoreFocus = true) {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");

    if (modal === activeModal) {
      activeModal = null;
      document.body.classList.remove("viewer-modal-open");
      if (restoreFocus && returnFocusTo?.isConnected) {
        returnFocusTo.focus({ preventScroll: true });
      }
      returnFocusTo = null;
    }
  }

  function requestClose() {
    if (!activeModal) return;
    const closeButton = activeModal.querySelector("[data-modal-close], [id^='close-']");
    if (closeButton) closeButton.click();
    else close(activeModal);
  }

  document.addEventListener("keydown", event => {
    if (!activeModal) return;

    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = getFocusable(activeModal);
    if (focusable.length === 0) {
      event.preventDefault();
      activeModal.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("click", event => {
    if (activeModal && event.target === activeModal) requestClose();
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".portfolio-modal").forEach(modal => {
      modal.setAttribute("aria-hidden", modal.classList.contains("hidden") ? "true" : "false");
      const title = modal.querySelector("[id$='viewer-title']");
      if (title?.id) modal.setAttribute("aria-labelledby", title.id);
      modal.querySelectorAll("[id^='close-']").forEach(button => button.dataset.modalClose = "");
    });
  });

  window.portfolioModal = { open, close, requestClose, getActive: () => activeModal };
})();
